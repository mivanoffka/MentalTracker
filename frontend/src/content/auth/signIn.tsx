import {messages} from "../collections/messages"
import { Input, Flex, Button, Form } from "antd"
import type {FormProps} from "antd"
import React from "react"
import { fullFillStyle, fullWidthStyle } from "../utility/styles"
import { Context } from "../Context"

type SignInFormType = {
    username?: string,
    password?: string,
}

interface SignInProps {
    message: string,
    setMessage: (value: string) => void,
    resetMessage: () => void,
    mode: boolean,
    toggleMode: () => void
}

export default function SignIn({message, setMessage, resetMessage, mode: boolean, toggleMode}: SignInProps) {
    const auth = React.useContext(Context);

    const signIn: FormProps<SignInFormType>['onFinish'] = async (form) => {
        setMessage("")

        if (form.username && form.password) {
            const status = await auth?.signIn(form.username, form.password)
            if (status !== undefined && status != 0)  {
                setMessage(messages[status])
            }
        }
    };

    return (
        <>
            <Flex style={fullFillStyle} vertical align="center" justify="center" gap="middle">
            <h2>Вход в аккаунт</h2>
            <Form onFinish={signIn} style={fullWidthStyle}>  
                    Имя пользователя
                    <Form.Item<SignInFormType>
                    name="username"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <Input onChange={resetMessage}/>
                    </Form.Item>

                    Пароль
                    <Form.Item<SignInFormType>
                    name="password"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <Input.Password  onChange={resetMessage}/>
                    </Form.Item>

                    <Flex style={{color: "red"}} align="center" justify="center" gap="small">
                        <p>{message}</p>
                    </Flex>

                    <Form.Item style={fullWidthStyle}>
                        <Button type="primary" htmlType="submit" style={fullWidthStyle}>
                            Вход
                        </Button>
                    </Form.Item>
            </Form>
            <Button type="link" size="small" style={{border: "none"}} onClick={toggleMode}>
                Нет аккаунта?
            </Button>
        </Flex>

        </>
    )
}
