import { Input, Flex, Button, Form } from "antd"
import type {FormProps} from "antd"
import React from "react"
import { fullFillStyle, fullWidthStyle } from "./styles"
import { AuthContext } from "./authcontext"
import axios from "axios"

type FormType = {
    username?: string,
    password?: string,
}

function Auth() {
    const auth = React.useContext(AuthContext);

    const onFinish: FormProps<FormType>['onFinish'] = (form) => {
        if (form.username && form.password) {
            auth?.signIn(form.username, form.password)
        }
    };

    const signUp: FormProps<FormType>['onFinish'] = (form) => {
        if (form.username && form.password) {
            auth?.signUp(form.username, form.password)
        }
    };

    function reset() {
        axios.get("http://localhost:8000/accounts/reset")
        .then(result => {
            if (result.data["isOk"] == "true") {
                alert("Сброшено!")
            }
            else {
                alert(result.data["message"])
            }
        })
        .catch(error => {
            alert(error)
        })
    }

    return (
        <Flex vertical>
            <Flex style={fullFillStyle} vertical align="center" justify="center" gap="middle">
                <h2>Вход в аккаунт</h2>
                <Form onFinish={onFinish}>  
                        Имя пользователя
                        <Form.Item<FormType>
                        name="username"
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                        >
                            <Input/>
                        </Form.Item>

                        Пароль
                        <Form.Item<FormType>
                        name="password"
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item style={fullWidthStyle}>
                            <Button type="primary" htmlType="submit" style={fullWidthStyle}>
                                Вход
                            </Button>
                        </Form.Item>
                </Form>
            </Flex>

            <Flex style={fullFillStyle} vertical align="center" justify="center" gap="middle">
                <h2>Регистрация</h2>
                <Form onFinish={signUp}>  
                        Имя пользователя
                        <Form.Item<FormType>
                        name="username"
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                        >
                            <Input/>
                        </Form.Item>

                        Пароль
                        <Form.Item<FormType>
                        name="password"
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item style={fullWidthStyle}>
                            <Button type="primary" htmlType="submit" style={fullWidthStyle}>
                                Регистрация
                            </Button>
                        </Form.Item>
                </Form>
            </Flex>

            <Button onClick={reset} style={fullWidthStyle}>
                Сброс
            </Button>
        </Flex>
    )
}

export default Auth