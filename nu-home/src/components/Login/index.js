import React from "react";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }

  onFinish = values => {
    console.log('Received values of form: ', values);
    this.setState({
      isLogin: true
    })
  };

  render () {
    if (this.state.isLogin) {
      return <Redirect to='/home' />
    } else {
      return (
        <Form
          name="login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <Link style={{marginLeft: 10}} to="/register">Register now!</Link>
          </Form.Item>
        </Form>
      );
    }
  }
};


class Login extends React.Component {
  render () {
    return (
      <LoginForm />
    )
  }
}

export default Login;