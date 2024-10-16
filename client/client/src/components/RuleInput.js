import React, { useState } from 'react'
import axios from "axios";

const RuleInput = () => {
    const [ruleString, setRuleString] = useState('');
    const [userData, setUserData] = useState({ age: '', department: '' });
    const [result, setResult] = useState(null);

    const handleRuleSubmit = async () => {
        const response = await axios.post('http://localhost:5000/api/rules/create', { ruleString });
        console.log(response.data);
    }

    const handleEvaluate = async () => {
        const response = await axios.post('http://localhost:5000/api/rules/evaluate', { ast: { type: "root", ruleString }, userData });
        setResult(response.data.result);
    }

    return (
        <div>
            <input type="text" value={ruleString} onChange={e => setRuleString(e.target.value)} placeholder='Enter Rule'></input>
            <input type='text' onChange={e => setUserData({ ...userData, age: e.target.value })} name='age' placeholder='Age'></input>
            <input type='text' onChange={e => setUserData({ ...userData, department: e.target.value })} name='department' placeholder='Department'></input>

            <button onClick={handleRuleSubmit}>Create Rule</button>
            <button onClick={handleEvaluate}>Evaluate</button>
            {result != null && <p>Eligibility: {result ? "Yes" : "No"}</p>}
        </div>
    )
}

export default RuleInput;
