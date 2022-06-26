import { createContext, useState } from "react";

export const AdminAuthContext = createContext();

const AdminAuthContextProvider = (props) => {
    const token = localStorage.getItem('admin-token');

    const [adminToken, setAdminToken] = useState(token);

    const value = {
        adminToken: adminToken,
        setAdminToken: setAdminToken,
    };

    return <AdminAuthContext.Provider value={value}>{props.children}</AdminAuthContext.Provider>;
};

export default AdminAuthContextProvider;