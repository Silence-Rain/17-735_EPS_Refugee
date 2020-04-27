import React from 'react';
import { Layout, Form, Input, Select, Button, Modal, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import store from '../../redux/store';
import { register } from '../../redux/actions/authAction';
import "./index.css";

const { Option } = Select;
const { Header, Content } = Layout;

// Responsive grid layout for registration form
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};
// List of current countries
const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua & Deps","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Rep","Chad","Chile","China","Colombia","Comoros","Congo","Congo Democratic Rep","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea North","Korea South","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russian Federation","Rwanda","St Kitts & Nevis","St Lucia","Saint Vincent & the Grenadines","Samoa","San Marino","Sao Tome & Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

class Register extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLogin: false,
      err: {
        msg: null,
        status: null
      },
      showModal: true,
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

  // Handler for "register" button
  // If registration succeed, log the user in automatically
  onFinish = values => {
    store.dispatch(register({...values}))
      .then(res => {
        if (this.state.err.status) {
          message.error(this.state.err.msg)
        }
        this.props.history.replace("/home")
      })
      .catch(err => {
        message.error("Network error")
      })
  };

  // Notification modal dialog before registration
  // Voluntary consent
  notificationModal = () => {
    return (
      <Modal
        title="Notification Regarding Data Collection"
        visible={this.state.showModal}
        footer={[
          <Button key="ok" type="primary" onClick={() => {this.setState({ showModal: false })}}>
            OK
          </Button>
        ]}
      >
        <p>By creating an account, we will store your chosen user name, password and your current region. Your user name is used to maintain your account, post. comment and chat history.</p>
        <p>If you select an avatar and/or write a bio, we will store that in our database also.</p>
        <p>If you upload a Government ID, we will store that in the database only after encrypting it. This ID will be used to verify your identity and will be securely deleted as soon as the verification process is completed.</p>
        <br/>
        <p><b>Note that if you click "OK", we will take it as a implied consent.</b></p>
        <p><b>If you are not comfortable with data collection strategies above, please don't register your account.</b></p>
      </Modal>
    )
  };

  // Layout of Register component
  // Except government ID, all the fields are required, otherwise error messages would be displayed
  // The ID uploading function is still developing, it is not functional at this point
  render () {
    return (
      <Layout>

        <Header>
          <div className="logo">
            <img src="/assets/logo.png" />
          </div>
        </Header>

        <Layout className="main-layout">
          <Content className="main-content">
            <div style={{ width: "90%" }}>
              <img src="/assets/logo_dark.png" className="center-logo"/>
              <h1>Sign up</h1>

              {this.notificationModal()}

              <Form
                {...formItemLayout}
                name="register"
                onFinish={this.onFinish}
                scrollToFirstError
              >
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject('The two passwords that you entered do not match!');
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="region" 
                  label="Current Region" 
                  rules={[
                    { 
                      required: true,
                      message: 'Please select your current region!',
                    }
                  ]}
                >
                  <Select
                    showSearch
                  >
                    {
                      countries.length && countries.map(item => (
                        <Option key={item} value={item}>{item}</Option>
                      )) 
                    }
                  </Select>
                </Form.Item>

                <Form.Item
                  {...tailFormItemLayout}
                >
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Register
                  </Button>
                  <Link style={{marginLeft: 10}} to="/login">Back to Login</Link>
                </Form.Item>
              </Form>

            </div>
          </Content>
        </Layout>

      </Layout>
    );
  }
};

export default withRouter(Register);
