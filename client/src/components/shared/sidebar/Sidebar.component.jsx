import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../contexts/Auth.context';
import { AdminAuthContext } from "../../../contexts/AdminAuth.context";
import environments from '../../../environments/environments.js'
import './sidebar.styles.css';

const Sidebar = (props) => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);
    const adminAuthContextValue = useContext(AdminAuthContext);
    
    const userToken = authContextValue.userToken;
    const adminToken = adminAuthContextValue.adminToken;

    const adminLogout = async (token) => {
        try {
            const response = await fetch(`${environments.API_URL}/admins/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if(response.status !== 200) {
                throw new Error();
            }

            localStorage.removeItem('admin-token');
            adminAuthContextValue.setAdminToken(null);

        } catch (error) {
            alert('Something went wrong!');
        }
    };

    const userLogout = async (token) => {
        try {
            const response = await fetch(`${environments.API_URL}/users/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if(response.status !== 200) {
                throw new Error();
            }

            localStorage.removeItem('user-token');
            authContextValue.setUserToken(null);

        } catch (error) {
            alert('Something went wrong!');
        }
    };

    const handleLogout = async () => {
        if(userToken) {
            userLogout(userToken);
        }

        if(adminToken) {
            adminLogout(adminToken);
        }
        
        props.hideSidebar();
        alert('Logout successfully!');
        navigate("/");
    };

    return (
        <div className={`sidebar-background ${props.className}`}>
            <div className="sidebar">
                <button className="close-btn" onClick={props.hideSidebar}>X</button>

                <div className="sidebar-links">
                    <Link to="/" className="sidebar-link" onClick={props.hideSidebar}>Home</Link>
                    {userToken && <Link to="cart" className="sidebar-link" onClick={props.hideSidebar}>Cart</Link>}
                    {adminToken && <Link to="admin/dashboard" className="sidebar-link" onClick={props.hideSidebar}>Dashboard</Link>}
                    {!userToken && <Link to="login" className="sidebar-link" onClick={props.hideSidebar}>Login</Link>}
                    {(userToken || adminToken) && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;