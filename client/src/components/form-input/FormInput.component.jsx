import React from "react";
import { useState } from "react";
import './form-input.styles.css';

const FormInput = (props) => {
    const [valueState, setValueState] = useState(props.value);
    
    const handleInputChange = (event) => {
        setValueState(event.target.value);
    };

    return (
        <div className="input-container">
            <label className="input-label" htmlFor="form-input">{props.label}</label>
            <input className="form-input" id={props.id} onInput={props.handleInput} type={props.type} value={valueState} onChange={handleInputChange} required/>
            {!props.isVisible &&
            <div className="error-message">{props.message}</div>}
        </div>
    );
};

export default FormInput;