import React, {Component} from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card,message  } from 'antd';
import styles from './login.less';
import '../../global.less';
import { history } from 'umi';


import Cookies from 'js-cookie';
import qs from 'qs';

import requestUntil from '../../utils/request';
class Login extends Component {

    render() {

        const onFinish = async (values: any) => {
            console.log('Received values of form: ', values);
            //勾选记住密码后，在cookie中设置用户名和密码
            if(values.remember){
                Cookies.set("username",values.username,{expires:30});
                Cookies.set("password",values.password,{expires:30});
                Cookies.set("rememberMe",values.remember,{expires:30});
            }else{
                Cookies.remove("username");
                Cookies.remove("password");
                Cookies.remove("rememberMe");
            }
            let result : any= await requestUntil.post('/lib/login?'+qs.stringify(values));
            let data = result.data;
            if(data.code === 200){
                const token = data.authorization;
                const menuList = data.menuList;
                const currentUser = data.currentUser;
                console.log("menuList = ",menuList);
                sessionStorage.setItem("menuList",JSON.stringify(menuList));
                sessionStorage.setItem("token",token);
                sessionStorage.setItem("currentUser",JSON.stringify(currentUser));
                message.success({
                    content: data.msg,
                });

                history.push('/home');
                console.log("登陆成功，token="+token);
            }else {
                message.error({
                    content: data.msg,
                });
            }
        };

        return (
            <div className={styles.loginFrom}>

                <Card title="登陆界面" bordered={false} className={styles.Card}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            initialValue={Cookies.get("username")===undefined?null:Cookies.get("username")}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" >
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </Card>

            </div>

        );
    }
}

export default Login;