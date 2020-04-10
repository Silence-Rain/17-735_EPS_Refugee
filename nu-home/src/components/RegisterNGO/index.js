import React from 'react';
import { Form, Input, Select, Button, Switch } from 'antd';
import "./index.css"
import store from '../../redux/store';
import api from '../../api';

const { Option } = Select;
// List of current countries
const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua & Deps","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Rep","Chad","Chile","China","Colombia","Comoros","Congo","Congo Democratic Rep","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea North","Korea South","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russian Federation","Rwanda","St Kitts & Nevis","St Lucia","Saint Vincent & the Grenadines","Samoa","San Marino","Sao Tome & Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

class RegisterNGO extends React.Component {

  // Handler for "register your worker" button
  // STILL IN PROGRESS
  onFinish = values => {
    console.log('Received values of form: ', values);
    // let url = values.isWorker ? "/ngo_registration/" : "/ngo_admin_registration/";
    // let {username, password, region} = values;
    // api.post(url, {
    //   username,
    //   password,
    //   region
    // })
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(err => {
    //   console.log(err)
    // });
  };

  // Layout of RegisterNGO component
  render () {
    return (
      <div className="wrapper">
        <h2>Register Your Fellow Workers</h2>
        <Form
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
            label="Region" 
            rules={[
              { 
                required: true,
                message: 'Please select your region!',
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
          
          {/*
          <Form.Item
            name="isWorker" 
            label="Simple worker?" 
          >
            <Switch defaultChecked />
          </Form.Item>
          */}

          <Form.Item
          >
            <Button type="primary" htmlType="submit" className="login-form-button">
              Register Your Worker
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
};

export default RegisterNGO;
