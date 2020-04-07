import React from "react";
import { Layout, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import store from '../../redux/store';
import { login } from '../../redux/actions/authAction';

const { Header, Content } = Layout;

class LoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }

  componentDidMount () {
    store.subscribe(() => {
      this.setState({isLogin: store.getState().auth.isAuthenticated})
    });
  }

  onFinish = values => {
    console.log('Received values of form: ', values);
    store.dispatch(login({...values}))
  };

  render () {
    if (this.state.isLogin) {
      return <Redirect to='/home' />
    } else {
      return (
        <Layout>

          <Header>
            <div className="logo">
              <p>nuHome <span style={{marginLeft: '10px', fontSize: '16px'}}>by Refugee Group</span></p>
            </div>
          </Header>

          <Layout style={{ padding: '10px 50px' }}>
            <Content>

              <Form
                name="login"
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

            </Content>
          </Layout>

        </Layout>

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