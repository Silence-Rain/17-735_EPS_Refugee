import React from 'react';
import { Layout } from 'antd';
import TodoItems from './components/TodoItems';
import './App.css';

const { Header, Content } = Layout;
const logo = require('./assets/logo.png')

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Header style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>
          <p>Todo Items from Refugee Group</p>
        </Header>
        <Content style={{ padding: '10px 50px' }}>
          <TodoItems />
        </Content>
      </Layout>
    </div>
  );
}

export default App;