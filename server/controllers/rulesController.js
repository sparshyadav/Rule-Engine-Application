const Rule = require("../models/Rule.js");

const createRule = () => {
    return { type: root, ruleString }
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