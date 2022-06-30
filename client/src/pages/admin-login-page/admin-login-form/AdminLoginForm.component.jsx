import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/form-input/FormInput.component";
import { AdminAuthContext } from '../../../contexts/AdminAuth.context.js';
import { AuthContext } from '../../../contexts/Auth.context.js';
import { adminLogin } from "../../../services/admin.service";
import { logout } from "../../../services/user.service";
import './admin-login-form.styles.css';

const AdminLoginForm = () => {
    const navigate = useNavigate();
    const adminAuthContextValue = useContext(AdminAuthContext);
    const authContextValue = useContext(AuthContext);

    const [emailState, setEmailStte] = useState('');
    const [passwordState, setPasswordStte] = useState('');

    const handleEmailInput = (event) => {
        const email = event.target.value.trim();
        setEmailStte(email);
    }

    const handlePasswordInput = (event) => {
        const password = event.target.value.trim();
        setPasswordStte(password);
    }

    const userLogout = async (token) => {
        try {
            logout(token);

            localStorage.removeItem('user-token');
            authContextValue.setUserToken(null);

        } catch (error) {
            alert('Something went wrong!');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email: emailState,
            password: passwordState,
        };

        try {
            const response = await adminLogin(data);
            const {token} = response.data;

            localStorage.setItem('admin-token', token);
            adminAuthContextValue.setAdminToken(token);

            const userToken = authContextValue.userToken;
            if(userToken) {
                userLogout(userToken);
            }

            navigate("dashboard");

        } catch (error) {
            alert('Something went wrong!');
        }
    };

    return (
        <form className='admin-login-form'>
            <h1 className='admin-login-title'>Hello Admin!</h1>

            <FormInput label={'Email:'}  type={'text'} id={'loginEmailInput'} handleInput={handleEmailInput} value=""/>
            <FormInput label={'Password:'} type={'password'} id={'loginPasswordInput'} handleInput={handlePasswordInput} value=""/>

            <button className='btn-design' type='submit' onClick={handleSubmit}>Login</button>
        </form>
    )
};

export default AdminLoginForm;