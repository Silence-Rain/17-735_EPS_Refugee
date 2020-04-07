import React from 'react';
import { Layout } from 'antd';
import { MainRouter } from './routes.js';

class App extends React.Component {

  render () {
    return (
      <div>
        <Layout>
          <MainRouter/>
        </Layout>
      </div>
    );
  }
}

export default App;
