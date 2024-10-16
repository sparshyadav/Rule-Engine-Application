const Rule = require("../models/Rule.js");

const createRule = (ruleString) => {
    const parseCondition = (condition) => {
        const [attr, operator, value] = condition.split(/(>=|<=|!=|=|>|<)/).map(s => s.trim());
        return new Node("operand", { attribute: attr, operator, value });
    };

    const tokens = ruleString.split(/\s+(AND|OR)\s+/).map(token => token.trim());
    const stack = [];

    tokens.forEach(token => {
        if (token === "AND" || token === "OR") {
            const right = stack.pop();
            const left = stack.pop();
            const operatorNode = new Node("operator", token, left, right);
            stack.push(operatorNode);
        } else {
            stack.push(parseCondition(token));
        }
    });

    return stack[0]; // Return the root of the AST
};


const evaluateRule = (ast, userData) => {
    if (ast.type === "expression") {
        const results = ast.conditions.map(condition => evaluateCondition(condition, userData));
        return ast.operator === "AND" ? results.every(result => result) : results.some(result => result);
    }
    return false;
}

const evaluateCondition = (condition, userData) => {
    const { attribute, operator, value } = condition;
    const userValue = userData[attribute];

    switch (operator) {
        case '>': return userValue > value;
        case '>=': return userValue >= value;
        case '<': return userValue < value;
        case '<=': return userValue <= value;
        case '=': return userValue == value;
        case '!=': return userValue != value;
        default: return false;
    }
}

exports.createRule = async (req, res) => {
    const { ruleString } = req.body;
    const ast = createRule(ruleString);

    try {
        const rule = new Rule({ ruleString });
        await rule.save();
        res.json({ ast });
    } catch (error) {
        res.status(500).json({ error: "Error Saving Rule" });
    }
}

exports.evaluateRule = (req, res) => {
    const { ast, userData } = req.body;
    const result = evaluateRule(ast, userData);
    res.json({ result });
}

exports.combineRules = (req, res) => {
    const { rules } = req.body;
    const combinedAST = {
        type: "expression",
        operator: "AND",
        conditions: []
    }

    rules.forEach(rule => {
        const ast = createRule(rule);
        combinedAST.conditions.push(...ast.conditions);
    });

    res.json({ combinedAST });
}
