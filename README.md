# Rule Engine with AST

## Overview
This project is a simple 3-tier rule engine application that determines user eligibility based on attributes such as age, department, income, and experience. The system employs an Abstract Syntax Tree (AST) to represent conditional rules and allows for dynamic creation, modification, and combination of these rules.

## Live Demo
You can access the live version of the application at: [Rule Engine Application](https://rule-engine-application.vercel.app/)

## Features
- Create and evaluate conditional rules.
- Combine multiple rules into a single AST.
- Validate user attributes against the defined rules.
- Modify existing rules and handle errors gracefully.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine (for local development).
- Access to a modern web browser.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rule-engine.git
   cd rule-engine
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

### Usage

1. **Creating Rules**:
   - Use the UI to input a rule string. For example:
     ```
     ((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)
     ```

2. **Evaluating Rules**:
   - Input JSON data representing user attributes. For example:
     ```json
     {
       "age": 35,
       "department": "Sales",
       "salary": 60000,
       "experience": 3
     }
     ```

3. **Combining Rules**:
   - Add multiple rules using the UI. The application will combine them into a single AST and evaluate accordingly.

4. **Testing**:
   - Verify that the AST representation of individual rules is accurate.
   - Check that the combined AST reflects the logic of the combined rules.
   - Test with various JSON data to see if the evaluation returns the expected results.

### Testing the Project
- Navigate to the [live URL](https://rule-engine-application.vercel.app/).
- Create rules using the input fields provided.
- Combine rules and check the resulting AST on the UI.
- Input sample JSON data to evaluate against the defined rules.

## API Functions

### 1. `create_rule(rule_string)`
- Takes a string representing a rule and returns a Node object representing the corresponding AST.

### 2. `combine_rules(rules)`
- Takes a list of rule strings and combines them into a single AST, optimizing for efficiency.

### 3. `evaluate_rule(data)`
- Takes a JSON object representing user attributes and evaluates the combined rule's AST against the provided data.

## Test Cases
- **Creating Individual Rules**: Verify the AST representation using the provided examples.
- **Combining Rules**: Ensure the combined AST reflects the combined logic correctly.
- **Evaluating Different Scenarios**: Implement various JSON data scenarios and test the evaluation logic.

## Bonus Features
- Error handling for invalid rule strings or data formats.
- Validation for attributes to be part of a catalog.
- Modifications of existing rules.
- Potential support for user-defined functions in future iterations.

## Conclusion
This rule engine application provides a flexible way to define and evaluate rules based on user attributes. By leveraging an AST, it allows for dynamic rule management, making it suitable for various eligibility checks in real-world applications.

Feel free to reach out if you have any questions or need further assistance!
