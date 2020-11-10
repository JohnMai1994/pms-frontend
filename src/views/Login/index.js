import React, {Component} from 'react';
import {Form, Input, Button, Checkbox, message} from 'antd';
import bg from "../../picture/login-bg.jpeg"
import logo_dark from "../../picture/logo_dark.png"
import "./Login.css"
import {login} from "../../api/index"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }




    onFinish = async values => {
        const isUser = await login("/User/login", values);
        console.log(isUser.value)

        if (isUser.value) {
            message.success("登录成功~")
            this.props.handleLogin()

        } else {
            message.error("你输入的用户名和密码错误，请联系管理员~")
        }

    };

    onFinishFailed = errorInfo => {
        message.error("小朋友你为什么不输入用户名和密码~")
        console.log('Failed:', errorInfo);

    };

    render() {
        return (
            <div className="login-container" style={{
                background: `url(${bg}) no-repeat 0 0`, width: "100%", opacity: 1,
                backgroundSize: "cover", height: "100vh", textAlign: "center", paddingTop: "200px"
            }}>
                <Form
                    className="login-form"
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}

                >
                    <div className="login-header">
                        登录界面
                    </div>
                    <div style={{
                        background: `url(${logo_dark}) no-repeat 0 0`, opacity: 1,
                        backgroundSize: "100%", height: "50px"
                    }}>

                    </div>

                    <Form.Item
                        name="username"
                        rules={[{required: true, message: '请输入你的用户名'}]}
                    >
                        <Input placeholder={"用户名"}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '请输入你的密码'}]}
                    >
                        <Input.Password placeholder={"密码"}/>
                    </Form.Item>

                    <Form.Item>
                        <Button className="login-btn" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Login;