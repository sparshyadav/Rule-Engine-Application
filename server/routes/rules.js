const express = require("express");
const { createRule, evaluateRule, combineRules } = require("../controllers/rulesController.js");
const router = express.Router();

router.post("/create", createRule);
router.post("/evaluate", evaluateRule);
router.post("/combine", combineRules);

module.exports = router;