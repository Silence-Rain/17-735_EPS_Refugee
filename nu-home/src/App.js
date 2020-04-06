import React from 'react';
import './App.css';
import { Layout } from 'antd';
import Index from './components/Index';
import Login from './components/Login';
import { MainRouter } from './routes.js';

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

// Entry of application
// Set the layout for index page
const App = () => {
  return (
    <div className="App">
      <Layout>
        <Header style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>
          <p>nuHome <span style={{marginLeft: '10px', fontSize: '16px'}}>by Refugee Group</span></p>
        </Header>
        <Content style={{ padding: '10px 50px' }}>
          <MainRouter/>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
