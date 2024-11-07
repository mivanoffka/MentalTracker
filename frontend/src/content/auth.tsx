import { Input, Flex, Button } from "antd"
import React from "react"
import { fullFillStyle } from "./styles"
import { AuthContext } from "./authcontext"


function Auth() {
    const [userName, setUserName] = React.useState<String>("")
    const [password, setPassword] = React.useState<String>("")
    const { csrfToken, user, login } = React.useContext(AuthContext);


    function applyLoginInput(event: React.FormEvent<HTMLInputElement>) {
        setUserName(event.currentTarget.value)
    }    

    function applyPasswordInput(event: React.FormEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value)
    }    

    function emulateLogin() {
        login({name: userName, token: userName})
    }

    return (
        <Flex vertical>
            <Flex style={fullFillStyle} vertical align="center" justify="center" gap="middle">
                <h2>Вход в аккаунт</h2>
                <Input value={userName} onChange={applyLoginInput} placeholder="Логин"></Input>
                <Input.Password value={password} onChange={applyPasswordInput} placeholder="Пароль"></Input.Password>
                <Button onClick={emulateLogin} style={fullFillStyle} type="primary">Вход</Button>
            </Flex>
        </Flex>
    )
}

export default Auth