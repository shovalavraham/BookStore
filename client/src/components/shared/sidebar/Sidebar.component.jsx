import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../contexts/Auth.context';
import { AdminAuthContext } from "../../../contexts/AdminAuth.context";
import './sidebar.styles.css';
import { logout } from "../../../services/user.service";
import { adminLogout } from "../../../services/admin.service";

const Sidebar = ({className, hideSidebar}) => {
    const navigate = useNavigate();
    const {userToken, setUserToken} = useContext(AuthContext);
    const {adminToken, setAdminToken} = useContext(AdminAuthContext);

    const handleAdminLogout = async (token) => {
        try {
            await adminLogout(token);

            localStorage.removeItem('admin-token');
            setAdminToken(null);

        } catch (error) {
            alert('Something went wrong!');
        }
    };

    const handleUserLogout = async (token) => {
        try {
            logout(token);

            localStorage.removeItem('user-token');
            setUserToken(null);

        } catch (error) {
            alert('Something went wrong!');
        }
    };

    const handleLogout = async () => {
        if(userToken) {
            handleUserLogout(userToken);
        }

        if(adminToken) {
            handleAdminLogout(adminToken);
        }
        
        hideSidebar();
        alert('Logout successfully!');
        navigate("/");
    };

    return (
        <div className={`sidebar-background ${className}`}>
            <div className="sidebar">
                <button className="close-btn" onClick={hideSidebar}>X</button>

                <div className="sidebar-links">
                    <Link to="/" className="sidebar-link" onClick={hideSidebar}>Home</Link>
                    {userToken && <Link to="cart" className="sidebar-link" onClick={hideSidebar}>Cart</Link>}
                    {adminToken && <Link to="admin/dashboard" className="sidebar-link" onClick={hideSidebar}>Dashboard</Link>}
                    {!userToken && <Link to="login" className="sidebar-link" onClick={hideSidebar}>Login</Link>}
                    {(userToken || adminToken) && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;