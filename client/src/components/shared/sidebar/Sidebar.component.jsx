import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../contexts/Auth.context';
import './sidebar.styles.css';

const Sidebar = (props) => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);
    const token = authContextValue.userToken;

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/logout', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                },
            });

            if(!response.status) {
                throw new Error();
            }

            localStorage.removeItem('user-token');
            authContextValue.setUserToken(null);

            props.hideSidebar();
            alert('Logout successfully!');
            navigate("/");

        } catch (error) {
            alert('Something went wrong!');
        }
    };

    return (
        <div className={`sidebar-background ${props.className}`}>
            <div className="sidebar">
                <button className="close-btn" onClick={props.hideSidebar}>X</button>

                <div className="sidebar-links">
                    <Link to="/" className="sidebar-link" onClick={props.hideSidebar}>Home</Link>
                    {token && <Link to="/cart" className="sidebar-link" onClick={props.hideSidebar}>Cart</Link>}
                    {!token && <Link to="/login" className="sidebar-link" onClick={props.hideSidebar}>Login</Link>}
                    {token && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;