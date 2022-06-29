import React from "react";
import { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import signupActionTypes, { updateAction } from "../../../actions/signup.action";
import FormInput from "../../../components/form-input/FormInput.component";
import { AdminAuthContext } from '../../../contexts/AdminAuth.context';
import environments from "../../../environments/environments.js";
import signupReducer, { SIGNUP_STATE_INIT } from "../../../reducers/signup.reducer";
import { adminSignup } from "../../../services/admin.service";
import './admin-signup-form.styles.css';

const AdminSignupForm = () => {
    const navigate = useNavigate();
    const {adminToken} = useContext(AdminAuthContext);

    const [signupState, dispatchSignupState] = useReducer(signupReducer, SIGNUP_STATE_INIT);

    const handleFirstnameInput = (event) => {
        const firstname = event.target.value.trim();

        if(firstname === '') {
            dispatchSignupState(updateAction(signupActionTypes.UPDATE_FIRSTNAME, firstname, false, "First Name must have at least 1 char"));
            return;
        }
        
        dispatchSignupState(updateAction(signupActionTypes.UPDATE_FIRSTNAME, firstname, true, ""));
    };

    const handleLastnameInput = (event) => {
        const lastname = event.target.value.trim();

        if(lastname === '') {
            dispatchSignupState(updateAction(signupActionTypes.UPDATE_LASTNAME, lastname, false, "Last Name must have at least 1 char"));
            return;
        }
        
        dispatchSignupState(updateAction(signupActionTypes.UPDATE_LASTNAME, lastname, true, ""));
    };

    const handleEmailInput = (event) => {
        const email = event.target.value.trim();

        if(!isEmail(email)) {
            dispatchSignupState(updateAction(signupActionTypes.UPDATE_EMAIL, email, false, "Email is invalid"));
            return;
        }
        
        dispatchSignupState(updateAction(signupActionTypes.UPDATE_EMAIL, email, true, ""));
    };

    const handlePasswordInput = (event) => {
        const password = event.target.value.trim();

        if(!isStrongPassword(password, {minSymbols: 0})) {
            dispatchSignupState(updateAction(signupActionTypes.UPDATE_PASSWORD, password, false, "Password must be at least 8 charachters, and must contain at least 1 Uppercase charachter, 1 Lowercase charachter and 1 Number"));
            return;
        }
        
        dispatchSignupState(updateAction(signupActionTypes.UPDATE_PASSWORD, password, true, ""));
    };

    const handleRepeatPasswordInput = (event) => {
        const repeatPassword = event.target.value.trim();

        if(repeatPassword !== signupState.values.password) {
            dispatchSignupState(updateAction(signupActionTypes.UPDATE_REPEAT_PASSWORD, repeatPassword, false, "Please enter your password again"));
            return;
        }
        
        dispatchSignupState(updateAction(signupActionTypes.UPDATE_REPEAT_PASSWORD, repeatPassword, true, ""));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const signupValidities = signupState.validities;
        const signupValues = signupState.values;

        if(signupValidities.firstname &&
            signupValidities.lastname &&
            signupValidities.email &&
            signupValidities.password &&
            signupValidities.repeatPassword) {

            const data = {
                firstName: signupValues.firstname,
                lastName: signupValues.lastname,
                email: signupValues.email,
                password: signupValues.password,
            }
            
            try {
                await adminSignup(adminToken, data);

                alert("New admin created successfully");

                navigate("/admin/dashboard");
                
            } catch (error) {
                alert("Somthing went wrong!");
            }
        }
    };

    return (
        <form className='admin-signup-form'>
            <h1 className='admin-signup-title'>Create New Admin</h1>

            <FormInput label={'First Name:'} handleInput={handleFirstnameInput} isVisible={signupState.validities.firstname} message={signupState.messages.firstname} type={'text'} id={'signupFirstnameInput'} value=''/>
            <FormInput label={'Last Name:'} handleInput={handleLastnameInput} isVisible={signupState.validities.lastname} message={signupState.messages.lastname} type={'text'} id={'signupLastnameInput'} value=''/>
            <FormInput label={'Email:'} handleInput={handleEmailInput} isVisible={signupState.validities.email} message={signupState.messages.email} type={'text'} id={'signupEmailInput'} value=''/>
            <FormInput label={'Password:'} handleInput={handlePasswordInput} isVisible={signupState.validities.password} message={signupState.messages.password} type={'password'} id={'signupPasswordInput'} value=''/>
            <FormInput label={'Repeat Password:'} handleInput={handleRepeatPasswordInput} isVisible={signupState.validities.repeatPassword} message={signupState.messages.repeatPassword} type={'password'} id={'signupRepeatPasswordInput'} value=''/>

            <button className='btn-design' type='submit' onClick={handleSubmit}>Creat new admin</button>
        </form>
    );
};

export default AdminSignupForm;