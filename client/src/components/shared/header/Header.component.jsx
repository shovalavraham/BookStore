import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar.component';
import './header.styles.css';
import { GiWhiteBook } from 'react-icons/gi';

const Header = () => {
    const navigate = useNavigate();
    const [className, setClassName] = useState('not-visible');

    const showSidebar = () => {
        setClassName('visible');
    };

    const hideSidebar = () => {
        setClassName('not-visible');
    };

    const goHome = () => {navigate("")};

    return (
        <header>
            <div className='header-link' onClick={goHome}>
                <GiWhiteBook className='book-icon'/>
                <h1 className='header-title'>Book Store</h1>
            </div>

            <button className='hamburger-btn' onClick={showSidebar}>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
            </button>

            <Sidebar className={className} hideSidebar={hideSidebar}/>
        </header>
    );
};

export default Header;