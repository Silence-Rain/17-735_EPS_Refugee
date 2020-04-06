import React from 'react';
import './App.css';
import { Layout, Menu, Dropdown } from 'antd';
import Index from './components/Index';
import Login from './components/Login';
import { MainRouter } from './routes.js';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

const MainView = (props) => {
  if (props.isLoggedIn) {
    return <Index />;
  } else {
    return (
      <div className="login-form-wrapper">
        <Login className="login-form"/>
      </div>
    );
  }
}

let logout = () => {};
let showSettings = () => {};

const menu = (
  <Menu>
    <Menu.Item key="settings" onclick={showSettings}>
      <Link to={`/home/settings`}>Settings</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout" onclick={logout} style={{ color: '#ff4d4f' }}>Logout</Menu.Item>
  </Menu>
);

// Entry of application
// Set the layout for index page
const App = () => {
  return (
    <div className="App">
      <Layout>
        <Header>
          <div className="logo">
            <p>nuHome <span style={{marginLeft: '10px', fontSize: '16px'}}>by Refugee Group</span></p>
          </div>

          <Menu theme="dark" mode="horizontal" className="settings" selectable={false}>
            <Menu.Item key="user">
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Hi, {"User1"} <DownOutlined />
                </a>
              </Dropdown>
            </Menu.Item>
          </Menu>

        </Header>
        <Content style={{ padding: '10px 50px' }}>
          <MainRouter/>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
