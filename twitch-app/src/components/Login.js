import { Button, Form, Input, message, Modal } from 'antd';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
//����⹹,utils�����login api
import { login } from '../utils';
//ʵ�ֵ��Login�������Ի�����modal������
class Login extends React.Component {
    state = {
        //��һ��״ֵ̬��Ϊ�Ƿ񵯳��Ի���Ŀ���
        displayModal: false
    }

    handleCancel = () => {
        this.setState({
            displayModal: false,
        })
    }
//https://ant.design/components/modal/
    //��displaymodel == true,��ʾmodal�����������ʾ
    signinOnClick = () => {
        this.setState({
            displayModal: true,
        })
    }
// ���Log in��button��onFinsh���������ռ�formItem�µĸ�������
//     step1: collect username/password from the form
//     step2: send the data to the server
    onFinish = (data) => {
        login(data)
            .then((data) => {
                //close modal
                this.setState({
                    displayModal: false,
                })
                //�����֪ͨ�������props����һ������
                //��¼�ɹ���ʧ�ܵ���ʾ
                message.success(`Welcome back, ${data.name}`);
                this.props.onSuccess();
            }).catch((err) => {
            message.error(err.message);
        })
    }

    render = () => {
        return (
            <div>
                {/*onclick�¼�������*/}
                <Button shape="round" onClick={this.signinOnClick} style={{ marginRight: '20px' }}>
                    Login</Button>
                {/*//ant������ƺõ������*/}
                <Modal
                    title="Log in"
                    visible={this.state.displayModal}
                    onCancel={this.handleCancel}
                    footer={null}
                    destroyOnClose={true}
                >
                    <Form
                        name="normal_login"
                        //class����ĺ���Ҫ��this
                        onFinish={this.onFinish}
                        //ant�ٷ�doc��API,Keep field value even when field removed
                        preserve={false}
                    >
                        <Form.Item
                            name="user_id"
                            //rule:�������
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
