import { Flex } from "antd";
import React from "react";
import axios from "axios";
import SignIn from "./SI";
import SignUp from "./SU";

function Auth() {
    const [mode, setMode] = React.useState<boolean>(true);
    const [message, setMessage] = React.useState<string>("");

    function resetMessage() {
        setMessage("");
    }

    function reset() {
        axios
            .get("http://localhost:8000/accounts/reset")
            .then((result) => {
                if (result.data["isOk"] == "true") {
                    alert("Сброшено!");
                } else {
                    alert(result.data["message"]);
                }
            })
            .catch((error) => {
                alert(error);
            });
    }

    function toggleMode() {
        setMessage("");
        setMode(!mode);
    }

    return (
        <Flex
            style={{ width: "100%", height: "100%" }}
            vertical
            // gap="middle"
            align="center"
            justify="center"
        >
            <Flex
                style={{ width: "100%", height: "100%" }}
                gap="middle"
                align="center"
                justify="center"
            >
                <Flex style={{ width: "250px" }} vertical align="center" justify="center">
                    {/* <Button onClick={reset} style={fullWidthStyle}>
                Удалить все аккаунты
            </Button> */}
                    {mode ? (
                        <SignIn
                            message={message}
                            setMessage={setMessage}
                            resetMessage={resetMessage}
                            toggleMode={toggleMode}
                        />
                    ) : (
                        <SignUp
                            message={message}
                            setMessage={setMessage}
                            resetMessage={resetMessage}
                            mode={mode}
                            toggleMode={toggleMode}
                        />
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Auth;
