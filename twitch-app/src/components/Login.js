import { Button, Form, Input, message, Modal } from 'antd';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
//引入解构,utils里面的login api
import { login } from '../utils';
//实现点击Login，弹出对话框（用modal来做）
class Login extends React.Component {
    state = {
        //用一个状态值作为是否弹出对话框的开关
        displayModal: false
    }

    handleCancel = () => {
        this.setState({
            displayModal: false,
        })
    }
//https://ant.design/components/modal/
    //当displaymodel == true,显示modal，不点击不显示
    signinOnClick = () => {
        this.setState({
            displayModal: true,
        })
    }
// 点击Log in的button，onFinsh被触发，收集formItem下的各个数据
//     step1: collect username/password from the form
//     step2: send the data to the server
    onFinish = (data) => {
        login(data)
            .then((data) => {
                //close modal
                this.setState({
                    displayModal: false,
                })
                //子组件通知父组件，props传递一个函数
                //登录成功和失败的提示
                message.success(`Welcome back, ${data.name}`);
                this.props.onSuccess();
            }).catch((err) => {
            message.error(err.message);
        })
    }

    render = () => {
        return (
            <div>
                {/*onclick事件处理函数*/}
                <Button shape="round" onClick={this.signinOnClick} style={{ marginRight: '20px' }}>
                    Login</Button>
                {/*//ant里面设计好的子组件*/}
                <Modal
                    title="Log in"
                    visible={this.state.displayModal}
                    onCancel={this.handleCancel}
                    footer={null}
                    destroyOnClose={true}
                >
                    <Form
                        name="normal_login"
                        //class里面的函数要加this
                        onFinish={this.onFinish}
                        //ant官方doc的API,Keep field value even when field removed
                        preserve={false}
                    >
                        <Form.Item
                            name="user_id"
                            //rule:定义规则
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Login</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Login;
