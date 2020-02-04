import React from 'react';
import { Layout } from 'antd';
import TodoItems from './components/TodoItems';
import './App.css';

const { Header, Content } = Layout;

// Entry of application
// Set the layout for index page
const App = () => {
  return (
    <div className="App">
      <Layout>
        <Header style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>
          <p>TODO ITEMS <span style={{marginLeft: '10px', fontSize: '18px'}}>by Refugee Group</span></p>
        </Header>
        <Content style={{ padding: '10px 50px' }}>
          <TodoItems />
        </Content>
      </Layout>
    </div>
  );
}

export default App;