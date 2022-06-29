import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from '../../contexts/AdminAuth.context';
import { LOADER_TIMEOUT } from "../../constants/constants";
import Loader from "../../components/shared/loader/Loader.component";
import AdminSignupForm from "./admin-signup-form/AdminSignupForm.component";
import './admin-signup-page.styles.css';

const AdminSignupPage = () => {
    const navigate = useNavigate();
    const {adminToken} = useContext(AdminAuthContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!adminToken) {
            navigate("/*");
        }

        setTimeout(() => {
            setIsLoading(false);
        }, LOADER_TIMEOUT);
    }, []);

    return isLoading ? (
        <Loader/>
    ) : (
        <main className='admin-signup-page'>
            <AdminSignupForm/>
        </main>
    );
};

export default AdminSignupPage;