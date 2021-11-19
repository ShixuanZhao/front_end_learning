
import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../constants";
//��˴���ǰ�ˣ��õ�token������main���ٴ���app��local storage  ʵ�֣������Ӵ���һ��������login�ش�����
function Login(props) {
    const { handleLoggedIn } = props;
    //�����Login����
    //1 get username/password
    //2 send login request to server
    //3 if success, inform parent component isLoggedIn, switch to home page
    // if fail, display error
    const onFinish = (values) => {
        const { username, password } = values;
        //use axios, ��������
        const opt = {
            method: "POST",
            url: `${BASE_URL}/signin`,
            data: {
                username: username,
                password: password
            },
            headers: { "Content-Type": "application/json" }
        };
        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    //get token
                    const { data } = res;
                    handleLoggedIn(data);
                    message.success("Login succeed! ");
                }
            })
            .catch((err) => {
                console.log("login failed: ", err.message);
                message.error("Login failed!");
            });
    };

    return (
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your Username!"
                    }
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!"
                    }
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            {/*//submit�������Բ��ü�onClick*/}
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <Link to="/register">register now!</Link>
            </Form.Item>
        </Form>
    );
}

export default Login;

