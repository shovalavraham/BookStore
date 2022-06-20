import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar.component';
import './header.styles.css';

const Header = () => {
    const [className, setClassName] = useState('not-visible');

    const showSidebar = () => {
        setClassName('visible');
    };

    const hideSidebar = () => {
        setClassName('not-visible');
    };

    return (
        <header>
            <Link className='header-title' to="">Book Store</Link>

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