import React, { useState } from 'react'

const RuleInput = () => {
    const [ruleString, setRuleString] = useState('');
    const [userData, setUserData] = useState({ age: '', department: '' });
    const [result, setResult] = useState(null);


    return (
        <div>
            <input type="text" value={ruleString} onChange={e => setRuleString(e.target.value)}></input>
            <input type='text' onChange={e => setUserData({ ...userData, age: e.target.value })} name='age' placeholder='Age'></input>
            <input type='text' onChange={e => setUserData({ ...userData, department: e.target.value })} name='department' placeholder='Department'></input>

            <button onClick={handleRuleSubmit}></button>
            <button onClick={handleEvaluate}></button>
            {result != null && <p>Eligibility: {result ? "Yes" : "No"}</p>}
        </div>
    )
}

export default RuleInput
