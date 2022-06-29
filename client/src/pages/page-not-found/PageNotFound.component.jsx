import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/shared/loader/Loader.component';
import { LOADER_TIMEOUT } from '../../constants/constants.js';
import './page-not-found.styles.css';

const PageNotFound = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const goBackHome = () => {
        navigate("");
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, LOADER_TIMEOUT);
    }, []);


    return isLoading ? (
        <Loader/>
    ) : (
        <main className='page-not-found'>
            <div className='page-not-found-text'>
                <div>404</div>
                <div>Page Not Found</div>
            </div>
            
            <button className='btn-design' onClick={goBackHome}>Go Back Home</button>
        </main>
    );
};

export default PageNotFound;