import React from "react";
import Loader from '../../components/shared/loader/Loader.component';
import './admin-login-page.styles.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginForm from "./admin-login-form/AdminLoginForm.component";

const AdminLoginPage = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if(localStorage.getItem('admin-token')) {
            navigate("dashboard");
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return isLoading ? (
        <Loader/>
    ) : (
        <main className='admin-login-page'>
            <AdminLoginForm/>
        </main>
    );
};

export default AdminLoginPage;