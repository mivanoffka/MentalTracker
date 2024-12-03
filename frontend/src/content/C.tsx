import React, { createContext } from "react";
import Workspace from "./workspace/W";
import Auth from "./auth/A";
import axios, { AxiosResponse } from "axios";
import Model from "./types/Model";
import Record from "./types/R";
import models from "./collections/models";
import dayjs from "dayjs";

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

    fillList: (response: AxiosResponse<any, any>) => void;
    saveRecord: (record: Record) => void;
    deleteRecord: (record: Record) => void;
    addRecord: (record: Record) => void;
    fetchRecords: () => void;
}

export const Context = createContext<ContextType | undefined>(undefined);

function ContextProvider() {
    const [user, setUser] = React.useState<User | null>(null);
    const [csrfToken, setCsrfToken] = React.useState<string | null>(null);

    const [records, setRecords] = React.useState<Record[] | null>([]);
    const [modelIndex, setModelIndex] = React.useState<number>(0);
    const [model, setModel] = React.useState<Model>(models[0]);

    React.useEffect(() => {
        getCsrfToken();

        const userName = localStorage.getItem("user.name");
        const userToken = localStorage.getItem("user.token");
        if (userToken && userName) {
            setUser({ name: userName, token: userToken });
        }
    }, []);

    React.useEffect(() => {
        setRecords(null);
        setModel(models[modelIndex]);
    }, [modelIndex]);

    React.useEffect(() => {
        if (user) {
            fetchRecords();
        }
    }, [user, model]);

    function fillList(response: AxiosResponse<any, any>) {
        const status = Number(response.data["status"]);
        const content = response.data["content"];

        if (status == 0) {
            let records: Record[] = [];
            for (let key in content) {
                let record = content[key];
                records.push(
                    new Record(
                        record["value"],
                        dayjs(record["datetime"], "DD-MM-YYYY-HH:mm"),
                        record["key"]
                    )
                );
            }
            setRecords(records);
        } else {
            alert(content["message"]);
        }
    }

    function saveRecord(record: Record) {
        if (record.id == -1) {
            addRecord(record);
        } else {
            updateRecord(record);
        }
    }

    function deleteRecord(record: Record) {
        let query =
            "http://localhost:8000/records/delete/token=" +
            user?.token +
            "&id=" +
            record.id +
            "&model=" +
            model?.index;
        axios
            .get(query)
            .then((response) => {
                fillList(response);
            })
            .catch((error) => {
                alert(error);
            });
    }

    function addRecord(record: Record) {
        let query =
            "http://localhost:8000/records/add/token=" +
            user?.token +
            "&value=" +
            record.value +
            "&datetime=" +
            record.datetime.format("DD-MM-YYYY-HH:mm") +
            "&model=" +
            model?.index;
        axios
            .get(query)
            .then((response) => {
                fillList(response);
            })
            .catch((error) => {
                alert(error);
            });
    }

    function fetchRecords() {
        axios
            .get(
                "http://localhost:8000/records/fetch/token=" +
                    user?.token +
                    "&model=" +
                    model?.index
            )
            .then((response) => {
                fillList(response);
            })
            .catch((error) => {
                alert(error);
            });
    }

    function updateRecord(record: Record) {
        let query =
            "http://localhost:8000/records/update/token=" +
            user?.token +
            "&id=" +
            record.id +
            "&value=" +
            record.value +
            "&datetime=" +
            record.datetime.format("DD-MM-YYYY-HH:mm") +
            "&model=" +
            model?.index;
        axios
            .get(query)
            .then((response) => {
                fillList(response);
            })
            .catch((error) => {
                alert(error);
            });
    }

    function getCsrfToken() {
        axios
            .get("http://localhost:8000/csrf/", { withCredentials: true })
            .then((result) => {
                const token = result.headers["x-csrftoken"];
                setCsrfToken(token);
                axios.defaults.headers.post["X-CSRFToken"] = token;
            })
            .catch((error) => {
                alert(error);
            });
    }

    async function signIn(username: string, password: string): Promise<number> {
        let status = 0;
        try {
            const result = await axios.post(
                "http://localhost:8000/accounts/signin/",
                { username: username, password: password },
                { withCredentials: true }
            );
            status = Number(result.data["status"]);
            if (status == 0) {
                localStorage.setItem("user.name", username);
                localStorage.setItem(
                    "user.token",
                    result.data["content"]["token"]
                );
                setUser({
                    name: username,
                    token: result.data["content"]["token"],
                });
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
                { username: username, password: password },
                { withCredentials: true }
            );

            status = Number(result.data["status"]);
        } catch (error) {
            status = 5;
        }

        return status;
    }

    function signOut() {
        localStorage.removeItem("user.name");
        localStorage.removeItem("user.token");
        setUser(null);

        setRecords(null);
    }

    return (
        <Context.Provider
            value={{
                csrfToken,
                user,
                logout: signOut,
                signIn,
                signUp,
                model,
                setModel,
                records,
                setRecords,
                modelIndex,
                setModelIndex,
                fillList,
                saveRecord,
                deleteRecord,
                addRecord,
                fetchRecords,
            }}
        >
            {user ? <Workspace /> : <Auth />}
        </Context.Provider>
    );
}

export default ContextProvider;
