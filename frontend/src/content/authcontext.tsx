import React, { createContext } from "react";
import Workspace from "./workspace";
import { Button } from "antd";
import Auth from "./auth";
import axios, { AxiosResponse } from "axios";

interface User {
    name: string;
    token: string;
}

interface AuthContextType {
    csrfToken: string | null;
    user: User | null;
    logout: () => void;
    signIn: (username: string, password: string) => Promise<number>;
    signUp: (username: string, password: string) => Promise<number>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider() {
    const [user, setUser] = React.useState<User | null>(null);
    const [csrfToken, setCsrfToken] = React.useState<string | null>(null);

    React.useEffect(() => {
        getCsrfToken();
    }, []);

    function getCsrfToken() {
        axios.get("http://localhost:8000/csrf/", { withCredentials: true })
            .then(result => {
                const token = result.headers["x-csrftoken"];
                setCsrfToken(token);
                axios.defaults.headers.post["X-CSRFToken"] = token;
            })
            .catch(error => {
                alert(error);
            });
    }

    React.useEffect(() => {
        const userName = localStorage.getItem('user.name');
        const userToken = localStorage.getItem('user.token');
        if (userToken && userName) {
            setUser({ name: userName, token: userToken });
        }
    }, []);

    async function signIn(username: string, password: string): Promise<number> {
        let status = 0;
        try {
            const result = await axios.post(
                "http://localhost:8000/accounts/signin/",
                { "username": username, "password": password },
                { withCredentials: true }
            );
            status = Number(result.data["status"]);
            if (status == 0) {
                localStorage.setItem('user.name', username);
                localStorage.setItem('user.token', result.data["content"]["token"]);
                setUser({ name: username, token: result.data["content"]["token"] });
            }

        } catch (error) {
            status = 5;
        }
    
        return status;
    }

    async function signUp(username: string, password: string): Promise<number> {
        let status = 0;
        try {
            const result = await axios.post(
                "http://localhost:8000/accounts/signup/",
                { "username": username, "password": password },
                { withCredentials: true }
            );
    
            status = Number(result.data["status"]);
        } catch (error) {
            status = 5;
        }
    
        return status;
    }

    function logout() {
        localStorage.removeItem('user.name');
        localStorage.removeItem('user.token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ csrfToken, user, logout, signIn, signUp }}>
            {user ? <Workspace /> : <Auth />}
        </AuthContext.Provider>
    );
}


export default AuthProvider;