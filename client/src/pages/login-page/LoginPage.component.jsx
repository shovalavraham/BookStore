import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/shared/loader/Loader.component';
import './login-page.styles.css';
import LoginForm from './login-form/LoginForm.component';

const LoginPage = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if(localStorage.getItem('user-token')) {
            navigate("/");
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return isLoading ? (
        <Loader/>
    ) : (
        <main className='login-page'>
            <LoginForm/>
        </main>
    );
};

export default LoginPage;