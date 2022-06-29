import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/shared/loader/Loader.component';
import { AuthContext } from '../../contexts/Auth.context.js';
import './signup-page.styles.css';
import SignupForm from './signup-form/SignupForm.component';
import { LOADER_TIMEOUT } from '../../constants/constants.js';

const SignupPage = () => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(authContextValue.userToken) {
            navigate("/");
        }

        setTimeout(() => {
            setIsLoading(false);
        }, LOADER_TIMEOUT);
    }, []);

    return isLoading ? (
        <Loader/>
    ) : (
        <main className='signup-page'>
            <SignupForm/>
        </main>
    );
};

export default SignupPage;