import React from "react";
import { Layout, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import store from '../../redux/store';
import { login } from '../../redux/actions/authAction';
import "./index.css";

const { Header, Content } = Layout;

class LoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLogin: false,
      err: {
        msg: null,
        status: null
      }
    }
  }

  // When the component is mounted, register a listener for redux store
  // Once store has been changed, update this.state accordingly
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        isLogin: store.getState().auth.isAuthenticated,
        err: store.getState().error
      })
    })
  }

  // When the component is going to be unmounted, unregister the lister for redux store
  componentWillUnmount () {
    this.unsubscribe();
  }

  // Handler for "Login" buttion
  // If login succeed, redirect to the homepage
  onFinish = values => {
    store.dispatch(login({...values}))
      .then(res => {
        if (this.state.err.status) {
          message.error(this.state.err.msg)
        }
        this.props.history.replace("/home")
      })
      .catch(err => {
        console.log(err)
        message.error("Network error")
      })
  };

  // Layout of the Login form
  // All the fields are required, otherwise error messages would be displayed
  render () {
    return (
      <Layout>

        <Header>
          <div className="logo">
            <img src="/assets/logo.png" alt=""/>
          </div>
        </Header>

        <Layout className="main-layout">
          <Content className="main-content">
            <div style={{ width: "300px" }}>
              <img src="/assets/logo_dark.png" alt="" className="center-logo"/>
              <h1>Sign in</h1>

              <Form
                name="login"
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
            
            </div>
          </Content>
        </Layout>

      </Layout>
    );
  }
};


class Login extends React.Component {
  // Layout of Login component
  render () {
    return (
      <LoginForm history={this.props.history}/>
    )
  }
}

export default withRouter(Login);