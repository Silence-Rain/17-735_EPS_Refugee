import React from 'react';
import { Layout, Divider } from 'antd';
import { MainRouter } from './routes.js';

const { Footer } = Layout;

class App extends React.Component {

  // Basic layout 
  render () {
    return (
      <div>
        <Layout>
          <MainRouter/>
          <Footer style={{ textAlign: 'center' }}>
            { "Copyright © EPS-Refugee 2020." }
            <Divider type="vertical" style={{ backgroundColor: "#000" }}/>
            <a href="!#">Privacy Policy</a>
            <Divider type="vertical" style={{ backgroundColor: "#000" }}/>
            <a href="!#">Cookies</a>
            <Divider type="vertical" style={{ backgroundColor: "#000" }}/>
            <a href="!#">Contact</a>
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
