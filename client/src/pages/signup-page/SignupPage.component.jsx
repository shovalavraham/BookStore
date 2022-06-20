import React, { useEffect, useState, useContext } from 'react';
import { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';
import * as signupActions from '../../actions/signup.action';
import FormInput from '../../components/form-input/FormInput.component';
import Loader from '../../components/shared/loader/Loader.component';
import signupReducer, { SIGNUP_STATE_INIT } from '../../reducers/signup.reducer';
import { AuthContext } from '../../contexts/Auth.context.js';
import './signup-page.styles.css';

const SignupPage = () => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [signupState, dispatchSignupState] = useReducer(signupReducer, SIGNUP_STATE_INIT);

    useEffect(() => {
        if(authContextValue.userToken) {
            navigate("/");
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const handleFirstnameInput = (event) => {
        const firstname = event.target.value.trim();

        if(firstname === '') {
            dispatchSignupState(signupActions.updateFirstname(firstname, false, "First Name must have at least 1 char"));
            return;
        }
        
        dispatchSignupState(signupActions.updateFirstname(firstname, true, ""));
    };

    const handleLastnameInput = (event) => {
        const lastname = event.target.value.trim();

        if(lastname === '') {
            dispatchSignupState(signupActions.updateLastname(lastname, false, "Last Name must have at least 1 char"));
            return;
        }
        
        dispatchSignupState(signupActions.updateLastname(lastname, true, ""));
    };

    const handleEmailInput = (event) => {
        const email = event.target.value.trim();

        if(!isEmail(email)) {
            dispatchSignupState(signupActions.updateEmail(email, false, "Email is invalid"));
            return;
        }
        
        dispatchSignupState(signupActions.updateEmail(email, true, ""));
    };

    const handlePasswordInput = (event) => {
        const password = event.target.value.trim();

        if(!isStrongPassword(password, {minSymbols: 0})) {
            dispatchSignupState(signupActions.updatePassword(password, false, "Password must be at least 8 charachters, and must contain at least 1 Uppercase charachter, 1 Lowercase charachter and 1 Number"));
            return;
        }
        
        dispatchSignupState(signupActions.updatePassword(password, true, ""));
    };

    const handleRepeatPasswordInput = (event) => {
        const repeatPassword = event.target.value.trim();

        if(repeatPassword !== signupState.values.password) {
            dispatchSignupState(signupActions.updateRepeatPassword(repeatPassword, false, "Please enter your password again"));
            return;
        }
        
        dispatchSignupState(signupActions.updateRepeatPassword(repeatPassword, true, ""));
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
                const response = await fetch('http://localhost:3000/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                });
                
                if(response.status !== 201) {
                    throw new Error();
                }

                const responseObj = await response.json();
                const token = responseObj.data.token;

                localStorage.setItem('user-token',token);
                authContextValue.setUserToken(token);

                navigate('/');

            } catch (error) {
                alert('Somthing went worng!')
            }
        }
    };

    return isLoading ? (
        <Loader/>
    ) : (
        <main className='signup-page'>
            <form className='signup-form'>
                <h1 className='signup-title'>Hello new user!</h1>

                <FormInput label={'First Name:'} handleInput={handleFirstnameInput} isVisible={signupState.validities.firstname} message={signupState.messages.firstname} type={'text'} id={'signupFirstnameInput'}/>
                <FormInput label={'Last Name:'} handleInput={handleLastnameInput} isVisible={signupState.validities.lastname} message={signupState.messages.lastname} type={'text'} id={'signupLastnameInput'}/>
                <FormInput label={'Email:'} handleInput={handleEmailInput} isVisible={signupState.validities.email} message={signupState.messages.email} type={'text'} id={'signupEmailInput'}/>
                <FormInput label={'Password:'} handleInput={handlePasswordInput} isVisible={signupState.validities.password} message={signupState.messages.password} type={'password'} id={'signupPasswordInput'}/>
                <FormInput label={'Repeat Password:'} handleInput={handleRepeatPasswordInput} isVisible={signupState.validities.repeatPassword} message={signupState.messages.repeatPassword} type={'password'} id={'signupRepeatPasswordInput'}/>

                <Link to='/login' className='form-link'>Already have an account? Login...</Link>

                <button className='btn-design' type='submit' onClick={handleSubmit}>Singup</button>
            </form>
        </main>
    );
};

export default SignupPage;