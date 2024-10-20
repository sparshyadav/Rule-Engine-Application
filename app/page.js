"use client"

import React, { useState } from 'react';

const BASE_URL = "http://localhost:2000"

const RuleEngine = () => {
  const [createRuleResult, setCreateRuleResult] = useState('');
  const [combineRulesResult, setCombineRulesResult] = useState('');
  const [evaluateRuleResult, setEvaluateRuleResult] = useState('');
  const [rules, setRules] = useState([{ id: 1, value: '' }]);

  const handleCreateRule = async (event) => {
    event.preventDefault();
    const ruleName = event.target.ruleName.value;
    const ruleString = event.target.ruleString.value;
    console.log(ruleName, ruleString)
    const response = await fetch(BASE_URL +'/api/rules/create_rule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ruleName, ruleString }),
    });
    const result = await response.json();
    setCreateRuleResult(generateTreeHTML(result.ruleAST) + `\nRule Name: ${result.ruleName}`);
  };

  const handleCombineRules = async (event) => {
    event.preventDefault();
    const op = event.target.operator1.value;
    const rulesToCombine = rules.map(rule => rule.value);
    const response = await fetch(BASE_URL +'/api/rules/combine_rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rules: rulesToCombine, op }),
    });
    const result = await response.json();
    setCombineRulesResult(generateTreeHTML(result.ruleAST) + `\nRule Name: ${result.ruleName}`);
  };

  const handleEvaluateRule = async (event) => {
    event.preventDefault();
    const ast = event.target.ast.value;
    const data = event.target.data.value;
    const response = await fetch(BASE_URL +'/api/rules/evaluate_rule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ast, data: JSON.parse(data) }),
    });
    const result = await response.json();
    setEvaluateRuleResult(JSON.stringify(result, null, 2));
  };

  const addRule = () => {
    setRules([...rules, { id: rules.length + 1, value: '' }]);
  };

  const updateRule = (id, value) => {
    setRules(rules.map(rule => rule.id === id ? { ...rule, value } : rule));
  };

  const generateTreeHTML = (node, prefix = '', isLeft = true) => {
    if (!node) return '';
    let treeHTML = prefix + (isLeft ? "├── " : "└── ") + (node.type === 'operator' ? node.operator : `${node.key} ${node.operator} ${node.value}`) + '\n';
    if (node.left) treeHTML += generateTreeHTML(node.left, prefix + (isLeft ? "│   " : "    "), true);
    if (node.right) treeHTML += generateTreeHTML(node.right, prefix + (isLeft ? "│   " : "    "), false);
    return treeHTML;
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Rule Engine Application</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">Create Rule</h2>
        <form onSubmit={handleCreateRule} className="space-y-4">
          <div>
            <label htmlFor="ruleName" className="block mb-1">Rule Name:</label>
            <input type="text" id="ruleName" name="ruleName" required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="ruleString" className="block mb-1">Rule:</label>
            <input type="text" id="ruleString" name="ruleString" required className="w-full p-2 border rounded" />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Create Rule</button>
        </form>
        <pre className="mt-4 p-2 bg-gray-100 rounded whitespace-pre-wrap">{createRuleResult}</pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">Combine Rules</h2>
        <form onSubmit={handleCombineRules} className="space-y-4">
          <h3 className="text-xl font-medium mb-2">Enter Rules to Combine:</h3>
          {rules.map((rule, index) => (
            <div key={rule.id} className="flex items-center space-x-2">
              <label htmlFor={`combine-rule${rule.id}`} className="whitespace-nowrap">Rule {rule.id}:</label>
              <input
                type="text"
                id={`combine-rule${rule.id}`}
                value={rule.value}
                onChange={(e) => updateRule(rule.id, e.target.value)}
                required
                className="flex-grow p-2 border rounded"
              />
              {index === 0 && (
                <>
                  <label htmlFor="operator1" className="whitespace-nowrap">Operator:</label>
                  <select id="operator1" name="operator1" className="p-2 border rounded">
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                </>
              )}
            </div>
          ))}
          <button type="button" onClick={addRule} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Another Rule</button>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Combine Rules</button>
        </form>
        <pre className="mt-4 p-2 bg-gray-100 rounded whitespace-pre-wrap">{combineRulesResult}</pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">Evaluate Rule</h2>
        <form onSubmit={handleEvaluateRule} className="space-y-4">
          <div>
            <label htmlFor="evaluate-ast" className="block mb-1">Rule Name:</label>
            <input type="text" id="evaluate-ast" name="ast" required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="evaluate-data" className="block mb-1">Data JSON:</label>
            <textarea id="evaluate-data" name="data" required className="w-full p-2 border rounded h-24"></textarea>
          </div>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Evaluate Rule</button>
        </form>
        <pre className="mt-4 p-2 bg-gray-100 rounded whitespace-pre-wrap">{evaluateRuleResult}</pre>
      </section>
    </div>
  );
};

export default RuleEngine;