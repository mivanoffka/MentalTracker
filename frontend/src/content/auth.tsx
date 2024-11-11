import { Input, Flex, Button, Form } from "antd"
import type {FormProps} from "antd"
import React from "react"
import { fullFillStyle, fullWidthStyle } from "./styles"
import { AuthContext } from "./authcontext"
import axios from "axios"

type SignInFormType = {
    username?: string,
    password?: string,
}

type SignUpFormType = {
    username?: string,
    password?: string,
    confirmation?: string
}

const messages = {0: "ОК", 1: "Неизвестная ошибка", 2: "Пользователь с таким именем уже существует", 
                    3: "Пользователя с таким именем не существует", 4: "Неверный пароль"
}

function Auth() {
    const auth = React.useContext(AuthContext);
    const [mode, setMode] = React.useState<boolean>(true);
    const [message, setMessage] = React.useState<string>("")

    const signIn: FormProps<SignInFormType>['onFinish'] = async (form) => {
        setMessage("")

        if (form.username && form.password) {
            const status = await auth?.signIn(form.username, form.password)
            if (status !== undefined && status != 0)  {
                setMessage(messages[status])
            }
        }
    };

    const signUp: FormProps<SignUpFormType>['onFinish'] = async (form) => {
        setMessage("")

        if (form.username && form.password && form.confirmation) {
            if (form.password == form.confirmation) {
                const status = await auth?.signUp(form.username, form.password)
                if (status !== undefined && status != 0) {
                    setMessage(messages[status])
                }
            }
            setMessage("Пароли не совпадают")
        }
    };

    function resetMessage() {
        setMessage("")
    }

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

    function toggleMode() {
        setMessage("")
        setMode(!mode);
    }

    const loginWidget =             <Flex style={fullFillStyle} vertical align="center" justify="center" gap="middle">
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

    const registerPage =  <Flex style={fullFillStyle} vertical align="center" justify="center" gap="middle">
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


    return (
        <Flex style={{width: "250px"}} vertical>
            <Button onClick={reset} style={fullWidthStyle}>
                Удалить все аккаунты
            </Button>
            {mode ? loginWidget : registerPage}
        </Flex>
    )
}

export default Auth