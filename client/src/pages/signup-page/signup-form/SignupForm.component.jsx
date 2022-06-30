import React from "react";
import { useReducer, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../../components/form-input/FormInput.component";
import signupReducer, { SIGNUP_STATE_INIT } from "../../../reducers/signup.reducer";
import { AuthContext } from '../../../contexts/Auth.context.js';
import { updateAction } from "../../../actions/signup.action";
import './signup-form.styles.css';
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import { AdminAuthContext } from "../../../contexts/AdminAuth.context";
import { signup } from "../../../services/user.service";
import { adminLogout } from "../../../services/admin.service";

const SignupForm = () => {
    const navigate = useNavigate();
    const {setUserToken} = useContext(AuthContext);
    const {adminToken, setAdminToken} = useContext(AdminAuthContext);

    const [signupState, dispatchSignupState] = useReducer(signupReducer, SIGNUP_STATE_INIT);

    const handleFirstnameInput = (event) => {
        const firstname = event.target.value.trim();

        if(firstname === '') {
            dispatchSignupState(updateAction(firstname, false, "First Name must have at least 1 char", 'firstname'));
            return;
        }
        
        dispatchSignupState(updateAction(firstname, true, "", 'firstname'));
    };

    const handleLastnameInput = (event) => {
        const lastname = event.target.value.trim();

        if(lastname === '') {
            dispatchSignupState(updateAction(lastname, false, "Last Name must have at least 1 char", 'lastname'));
            return;
        }
        
        dispatchSignupState(updateAction(lastname, true, "", 'lastname'));
    };

    const handleEmailInput = (event) => {
        const email = event.target.value.trim();

        if(!isEmail(email)) {
            dispatchSignupState(updateAction(email, false, "Email is invalid", 'email'));
            return;
        }
        
        dispatchSignupState(updateAction(email, true, "", 'email'));
    };

    const handlePasswordInput = (event) => {
        const password = event.target.value.trim();

        if(!isStrongPassword(password, {minSymbols: 0})) {
            dispatchSignupState(updateAction(password, false, "Password must be at least 8 charachters, and must contain at least 1 Uppercase charachter, 1 Lowercase charachter and 1 Number", 'password'));
            return;
        }
        
        dispatchSignupState(updateAction(password, true, "", 'password'));
    };

    const handleRepeatPasswordInput = (event) => {
        const repeatPassword = event.target.value.trim();

        if(repeatPassword !== signupState.values.password) {
            dispatchSignupState(updateAction(repeatPassword, false, "Please enter your password again", 'repeatPassword'));
            return;
        }
        
        dispatchSignupState(updateAction(repeatPassword, true, "", 'repeatPassword'));
    };

    const handleAdminLogout = async (token) => {
        try {
            adminLogout(token);

            localStorage.removeItem('admin-token');
            setAdminToken(null);

        } catch (error) {
            alert('Something went wrong!');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {values: signupValues, validities: signupValidities} = signupState;

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
                const response = await signup(data);
                const {token} = response.data;

                localStorage.setItem('user-token',token);
                setUserToken(token);

                if(adminToken) {
                    handleAdminLogout(adminToken);
                }

                navigate('/');

            } catch (error) {
                alert('Somthing went worng!')
            }
        }
    };

    return (
        <form className='signup-form'>
            <h1 className='signup-title'>Hello new user!</h1>

            <FormInput label={'First Name:'} handleInput={handleFirstnameInput} isVisible={signupState.validities.firstname} message={signupState.messages.firstname} type={'text'} id={'signupFirstnameInput'} value=''/>
            <FormInput label={'Last Name:'} handleInput={handleLastnameInput} isVisible={signupState.validities.lastname} message={signupState.messages.lastname} type={'text'} id={'signupLastnameInput'} value=''/>
            <FormInput label={'Email:'} handleInput={handleEmailInput} isVisible={signupState.validities.email} message={signupState.messages.email} type={'text'} id={'signupEmailInput'} value=''/>
            <FormInput label={'Password:'} handleInput={handlePasswordInput} isVisible={signupState.validities.password} message={signupState.messages.password} type={'password'} id={'signupPasswordInput'} value=''/>
            <FormInput label={'Repeat Password:'} handleInput={handleRepeatPasswordInput} isVisible={signupState.validities.repeatPassword} message={signupState.messages.repeatPassword} type={'password'} id={'signupRepeatPasswordInput'} value=''/>

            <Link to='/login' className='form-link'>Already have an account? Login...</Link>

            <button className='btn-design' type='submit' onClick={handleSubmit}>Signup</button>
        </form>
    );
};

export default SignupForm;