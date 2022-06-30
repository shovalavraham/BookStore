import React from "react";
import { BsGraphUp } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import './admin-dashboard-header.styles.css';

const AdminDashboardHeader = () => {
    const navigate = useNavigate();
    
    const createNewAdmin = () => {
        navigate("/admin/new");
    }

    return (
        <div className="dashboard-header">
            <div className="dashboard-title-icon">
                <BsGraphUp className="dashboard-icon"/>
                <h1 className="dashboard-title">Admin Dashboard</h1>
            </div>

            <button className="btn-design" onClick={createNewAdmin}>Create New Admin</button>
        </div>
    );
};

export default AdminDashboardHeader;