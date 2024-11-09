import React, { createContext } from "react";
import Workspace from "./workspace";
import { Button } from "antd";
import Auth from "./auth";
import axios from "axios";

interface User {
    name: string;
    token: string;
}

interface AuthContextType {
    csrfToken: string | null;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    signIn: (username: string, password: string) => void;
    signUp: (username: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


function AuthProvider() {
    const [user, setUser] = React.useState<User | null>(null);
    const [csrfToken, setCsrfToken] = React.useState<string | null>(null);

    React.useEffect(() => {
        getCsrfToken()
    }, [])

    function getCsrfToken() {
        axios.get("http://localhost:8000/csrf/", {withCredentials: true})
        .then(result => {
            const token = result.headers["x-csrftoken"]
            setCsrfToken(token)
            axios.defaults.headers.post["X-CSRFToken"] = token
        })
        .catch(error => {
            alert(error)
        })
    }

    React.useEffect(() => {
        const userName = localStorage.getItem('user.name')
        const userToken = localStorage.getItem('user.token')
        if (userToken && userName) {
            setUser({name: userName, token: userToken})
        }
    }, [])

    function signIn(username: string, password: string) {
        axios.post(
                "http://localhost:8000/accounts/signin/",
                {"username": username, "password": password},
                {withCredentials: true}
                )
        .then(result => {
            if (result.data["isOk"] == "true") {
                alert("Вы успешно вошли!")
            }
            else {
                alert(result.data["message"])
            }
        })
        .catch(error => {
            alert(error)
        })
    }

    function signUp(username: string, password: string) {
        axios.post(
                "http://localhost:8000/accounts/signup/",
                {"username": username, "password": password},
                {withCredentials: true}
                )
        .then(result => {
            if (result.data["isOk"] == "true") {
                alert("Вы успешно зарегистрированы!")
            }
            else {
                alert(result.data["message"])
            }
        })
        .catch(error => {
            alert(error)
        })
    }

    function login(user: User) {
        axios.post("http://localhost:8000/post/", {}, {withCredentials: true})
        .then(result => {
            alert(result)
        })
        .catch(error => {
            alert(error)
        })

        localStorage.setItem('user.name', user.name);
        localStorage.setItem('user.token', user.token);
        setUser(user)
    }

    function logout() {
        localStorage.removeItem('user.name');
        localStorage.removeItem('user.token');
        setUser(null)
    }

    const content = user ? <Workspace></Workspace> : <Auth/>

    return (
        <AuthContext.Provider value={{csrfToken, user, login, logout, signIn, signUp}}>
            {content}
        </AuthContext.Provider>
    )
}

export default AuthProvider;