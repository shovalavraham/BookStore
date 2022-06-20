import React from "react";
import './form-input.styles.css';

const FormInput = (props) => {
    return (
        <div className="input-container">
            <label className="input-label" htmlFor="form-input">{props.label}</label>
            <input className="form-input" id={props.id} onInput={props.handleInput} type={props.type} required/>
            {!props.isVisible &&
            <div className="error-message">{props.message}</div>}
        </div>
    );
};

export default FormInput;