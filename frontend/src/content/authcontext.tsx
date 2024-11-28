import React, { createContext } from "react";
import Workspace from "./workspace";
import { Button } from "antd";
import Auth from "./auth";
import axios, { AxiosResponse } from "axios";
import Model from "./model";
import Record from "./record";
import models from "./models";

interface User {
    name: string;
    token: string;
}

interface ContextType {
    csrfToken: string | null;
    user: User | null;
    logout: () => void;
    signIn: (username: string, password: string) => Promise<number>;
    signUp: (username: string, password: string) => Promise<number>;

    records: Record[];
    setRecords: (records: Record[]) => void;

    modelIndex: number;
    setModelIndex: (index: number) => void;

    model: Model;
    setModel: (model: Model) => void;
}

export const Context = createContext<ContextType | undefined>(undefined);

function ContextProvider() {
    const [user, setUser] = React.useState<User | null>(null);
    const [csrfToken, setCsrfToken] = React.useState<string | null>(null);

    const [records, setRecords] = React.useState<Record[]>([]);
    const [modelIndex, setModelIndex] = React.useState<number>(0);
    const [model, setModel] = React.useState<Model>(models[0]);

    React.useEffect(() => {
        setRecords([]);
        setModel(models[modelIndex]);
    }, [modelIndex]);

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
        <Context.Provider value={{ csrfToken, user, logout, signIn, signUp, model, setModel, records, setRecords, modelIndex, setModelIndex }}>
            {user ? <Workspace /> : <Auth />}
        </Context.Provider>
    );
}


export default ContextProvider;