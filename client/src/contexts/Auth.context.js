import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const token = localStorage.getItem('user-token');

    const [userToken, setUserToken] = useState(token);

    const value = {
        userToken: userToken,
        setUserToken: setUserToken,
    };

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;