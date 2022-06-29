import React from "react";
import { useContext, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import loginActionTypes, { updateAction } from "../../../actions/login.action";
import FormInput from "../../../components/form-input/FormInput.component";
import loginReducer, { LOGIN_STATE_INIT } from "../../../reducers/login.reducer";
import { AuthContext } from '../../../contexts/Auth.context';
import { AdminAuthContext } from "../../../contexts/AdminAuth.context";
import environments from '../../../environments/environments.js'
import './login-form.styles.css';
import { login } from "../../../services/user.service";
import { adminLogout } from "../../../services/admin.service";

const LoginForm = () => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);
    const adminAuthContextValue = useContext(AdminAuthContext);

    const [loginState, dispatchLoginState] = useReducer(loginReducer, LOGIN_STATE_INIT);

    const handleEmailInput = (event) => {
        const email = event.target.value.trim();

        if(!isEmail(email)) {
            dispatchLoginState(updateAction(loginActionTypes.UPDATE_EMAIL, email, false, "Email is invalid"));
            return;
        }

        dispatchLoginState(updateAction(loginActionTypes.UPDATE_EMAIL, email, true, ""));
    };

    const handlePasswordInput = (event) => {
        const password = event.target.value.trim();

        if(!isStrongPassword(password, {minSymbols: 0})) {
            dispatchLoginState(updateAction(loginActionTypes.UPDATE_PASSWORD, password, false, "Password must be at least 8 charachters, and must contain at least 1 Uppercase charachter, 1 Lowercase charachter and 1 Number"));
            return;
        }

        dispatchLoginState(updateAction(loginActionTypes.UPDATE_PASSWORD, password, true, ""));
    };

    const handleAdminLogout = async (token) => {
        try {
            await adminLogout(token);

            localStorage.removeItem('admin-token');
            adminAuthContextValue.setAdminToken(null);

        } catch (error) {
            alert('Something went wrong!');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(loginState.validities.email && loginState.validities.password) {
            const data = {
                email: loginState.values.email,
                password: loginState.values.password,
            };
    
            try {
                const response = await login(data);
                const {token} = response.data;

                localStorage.setItem('user-token', token);
                authContextValue.setUserToken(token);

                const adminToken = adminAuthContextValue.adminToken;
                if(adminToken) {
                    handleAdminLogout(adminToken);
                }

                navigate("/");
    
            } catch (error) {
                alert('Something went wrong!');
            }
        }
    };

    return (
        <form className='login-form'>
            <h1 className='login-title'>Welcome back!</h1>

            <FormInput label={'Email:'} handleInput={handleEmailInput} isVisible={loginState.validities.email} message={loginState.messages.email} type={'text'} id={'loginEmailInput'} value=''/>
            <FormInput label={'Password:'} handleInput={handlePasswordInput} isVisible={loginState.validities.password} message={loginState.messages.password} type={'password'} id={'loginPasswordInput'} value=''/>

            <Link to='/signup' className='form-link'>Don't have an account? Signup...</Link>

            <button className='btn-design' type='submit' onClick={handleSubmit}>Login</button>
        </form>
    );
};

export default LoginForm;