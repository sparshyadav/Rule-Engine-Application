const Rule = require("../models/Rule.js");

const createRule = () => {
    return { type: root, ruleString }
}

const evaluateRule = (ast, userData) => {
    const conditions = ast.ruleString.split('AND').map(condition => condition.trim());

    return conditions.every(condition => {
        const [attr, operator, value] = condition.split(/(>=|<=|!=|=|>|<)/).map(s => s.trim());
        const userValue = userData[attr];

        switch (operator) {
            case '>': return userValue > value;
            case '<': return userValue < value;
            case '>=': return userValue >= value;
            case '<=': return userValue <= value;
            case '!=': return userValue != value;
            case '=': return userValue == value;
            default: return false;
        }
    });
}

exports.createRule = async (req, res) => {
    const { ruleString } = req.body;
    const ast = createRule(ruleString);

    try {
        const rule = new Rule({ ruleString });
        await rule.save();
        res.json({ ast });
    }
    catch (error) {
        res.status(500).json({ error: "Error Saving Rule" });
    }
}

exports.evaluateRule = (req, res) => {
    const { ast, userData } = req.body;
    const result = evaluateRule(ast, userData);
    res.json({ result });
}