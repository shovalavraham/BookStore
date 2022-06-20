import React, { useEffect, useState, useReducer, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';
import { updateEmail, updatePassword } from '../../actions/login.action';
import FormInput from '../../components/form-input/FormInput.component';
import Loader from '../../components/shared/loader/Loader.component';
import loginReducer, { LOGIN_STATE_INIT } from '../../reducers/login.reducer';
import { AuthContext } from '../../contexts/Auth.context';
import './login-page.styles.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [loginState, dispatchLoginState] = useReducer(loginReducer, LOGIN_STATE_INIT);

    useEffect(() => {
        if(localStorage.getItem('user-token')) {
            navigate("/");
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const handleEmailInput = (event) => {
        const email = event.target.value.trim();

        if(!isEmail(email)) {
            dispatchLoginState(updateEmail(email, false, "Email is invalid"));
            return;
        }

        dispatchLoginState(updateEmail(email, true, ""));
    };

    const handlePasswordInput = (event) => {
        const password = event.target.value.trim();

        if(!isStrongPassword(password, {minSymbols: 0})) {
            dispatchLoginState(updatePassword(password, false, "Password must be at least 8 charachters, and must contain at least 1 Uppercase charachter, 1 Lowercase charachter and 1 Number"));
            return;
        }

        dispatchLoginState(updatePassword(password, true, ""));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(loginState.validities.email && loginState.validities.password) {
            const data = {
                email: loginState.values.email,
                password: loginState.values.password,
            };
    
            try {
                const response = await fetch('http://localhost:3000/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                });

                if(!response.status) {
                    throw new Error();
                }

                const responseObj = await response.json();
                const token = responseObj.data.token;

                localStorage.setItem('user-token', token);
                authContextValue.setUserToken(token);

                navigate("/");
    
            } catch (error) {
                alert('Something went wrong!');
            }
        }
    };

    return isLoading ? (
        <Loader/>
    ) : (
        <main className='login-page'>
            <form className='login-form'>
                <h1 className='login-title'>Welcome back!</h1>

                <FormInput label={'Email:'} handleInput={handleEmailInput} isVisible={loginState.validities.email} message={loginState.messages.email} type={'text'} id={'loginEmailInput'}/>
                <FormInput label={'Password:'} handleInput={handlePasswordInput} isVisible={loginState.validities.password} message={loginState.messages.password} type={'password'} id={'loginPasswordInput'}/>

                <Link to='/signup' className='form-link'>Don't have an account? Signup...</Link>

                <button className='btn-design' type='submit' onClick={handleSubmit}>Login</button>
            </form>
        </main>
    );
};

export default LoginPage;