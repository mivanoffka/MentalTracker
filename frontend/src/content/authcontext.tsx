import React, { createContext } from "react";
import Workspace from "./workspace";
import { Button } from "antd";
import Auth from "./auth";

interface User {
    name: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


function AuthProvider() {
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        const userName = localStorage.getItem('user.name')
        const userToken = localStorage.getItem('user.token')
        if (userToken && userName) {
            setUser({name: userName, token: userToken})
        }
    }, [])

    function login(user: User) {
        localStorage.setItem('user.name', user.name);
        localStorage.setItem('user.token', user.token);
        setUser(user)
    }

    function logout() {
        localStorage.removeItem('user.name');
        localStorage.removeItem('user.token');
        setUser(null)
    }

    function emulateLogin() {
        login({name: "0", token: "0"})
    }

    const content = user ? <Workspace></Workspace> : <Auth/>

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {content}
        </AuthContext.Provider>
    )
}

export default AuthProvider;