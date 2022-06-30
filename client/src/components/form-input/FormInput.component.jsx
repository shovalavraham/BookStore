import React from "react";
import { useState } from "react";
import './form-input.styles.css';

const FormInput = ({label, id, type, handleInput, message, isVisible, value}) => {
    const [valueState, setValueState] = useState(value);
    
    const handleInputChange = (event) => {
        setValueState(event.target.value);
    };

    return (
        <div className="input-container">
            <label className="input-label" htmlFor="form-input">{label}</label>
            <input className="form-input" id={id} onInput={handleInput} type={type} value={valueState} onChange={handleInputChange} required/>
            {!isVisible &&
            <div className="error-message">{message}</div>}
        </div>
    );
};

export default FormInput;