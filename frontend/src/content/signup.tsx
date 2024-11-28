import {messages} from "./messages"
import { Input, Flex, Button, Form } from "antd"
import type {FormProps} from "antd"
import React from "react"
import { fullFillStyle, fullWidthStyle } from "./styles"
import { Context } from "./authcontext"

type SignUpFormType = {
    username?: string,
    password?: string,
    confirmation?: string,
}

interface SignUpProps {
    message: string,
    setMessage: (value: string) => void,
    resetMessage: () => void,
    mode: boolean,
    toggleMode: () => void
}

export default function SignUp({message, setMessage, resetMessage, mode, toggleMode}: SignUpProps) {
    const auth = React.useContext(Context);
    const [finished, setFinished] = React.useState<boolean>(false)

    React.useEffect(() => {
        setFinished(false)
    }, [mode])

    const signUp: FormProps<SignUpFormType>['onFinish'] = async (form) => {
        setMessage("")

        if (form.username && form.password && form.confirmation) {
            if (form.password == form.confirmation) {
                const status = await auth?.signUp(form.username, form.password)
                if (status !== undefined && status != 0) {
                    setMessage(messages[status])
                }
                
                if (status == 0) {
                    setFinished(true)
                }
            }
            else {
                setMessage("Пароли не совпадают")
            }
        }
    };

    const signUpWidget =         
    <Flex style={fullFillStyle} vertical align="center" justify="center" gap="middle">
    <h2>Регистрация</h2>
    <Form onFinish={signUp} style={fullWidthStyle}>  
            Имя пользователя
            <Form.Item<SignUpFormType>
            name="username"
            rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Input  onChange={resetMessage}/>
            </Form.Item>

            Пароль
            <Form.Item<SignUpFormType>
            name="password"
            rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Input.Password  onChange={resetMessage}/>
            </Form.Item>

            Подтверждение
            <Form.Item<SignUpFormType>
            name="confirmation"
            rules={[{ required: true, message: 'Обязательное поле' }]}
            >
                <Input.Password onChange={resetMessage}/>
            </Form.Item>
            
            <Flex style={{color: "red"}} align="center" justify="center" gap="small">
                <p>{message}</p>
            </Flex>

            <Form.Item style={fullWidthStyle}>
                <Button type="primary" htmlType="submit" style={fullWidthStyle}>
                    Регистрация
                </Button>
            </Form.Item>

            
    </Form>
    <Button type="link" size="small" style={{border: "none"}} onClick={toggleMode}>
        Уже есть аккаунт?
    </Button>
</Flex>

const successWidget = 
<Flex vertical>
    <h1>Регистрация прошла успешно!</h1>
    <Button type="primary" onClick={toggleMode}>Войти в аккаунт</Button>
</Flex>

    return (
        <>
            {finished ? successWidget : signUpWidget}
        </>
    )
}
