import React from 'react';
import "./index.css";
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import { ViewRouter } from '../../routes.js'
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class Index extends React.Component {
  componentDidMount () {

  }

  render () {
    return (
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['important']}
            defaultOpenKeys={['forum']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu
              key="forum"
              title={
                <span>
                  <AppstoreOutlined />
                  Forum
                </span>
              }
            >
              <Menu.Item key="important">
                <Link to={`${this.props.match.path}/forum/important`}>Important!</Link>
              </Menu.Item>
              <Menu.Item key="social">
                <Link to={`${this.props.match.path}/forum/social`}>Social</Link>
              </Menu.Item>
              <Menu.Item key="jobs">
                <Link to={`${this.props.match.path}/forum/jobs`}>Jobs</Link>
              </Menu.Item>
              <Menu.Item key="accomodation">
                <Link to={`${this.props.match.path}/forum/accomodation`}>Accomodation</Link>
              </Menu.Item>
              <Menu.Item key="resources">
                <Link to={`${this.props.match.path}/forum/resources`}>Resources</Link>
              </Menu.Item>
              <Menu.Item key="other">
                <Link to={`${this.props.match.path}/forum/other`}>Other</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="dm">
              <span>
                <MailOutlined />
              </span>
              <Link to={`${this.props.match.path}/dm`}>Direct Message</Link>
            </Menu.Item>

            <Menu.Item key="status">
              <span>
                <IdcardOutlined />
              </span>
              <Link to={`${this.props.match.path}/status`}>Refugee Status</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <ViewRouter {...this.props}/>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Index;
