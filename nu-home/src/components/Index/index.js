import React from 'react';
import "./index.css";
import { Layout, Menu, Dropdown } from 'antd';
import { AppstoreOutlined, MailOutlined, IdcardOutlined, DownOutlined ,UserAddOutlined } from '@ant-design/icons';
import { ViewRouter } from '../../routes.js'
import { Link, Redirect } from 'react-router-dom';
import store from '../../redux/store';
import { logout } from '../../redux/actions/authAction';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Index extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      stores: {
        isAuthenticated: true,
        user: {
          data:{
            username: "",
            type: ""
          }
        }
      },
      menuDropdown: (
        <Menu>
          <Menu.Item key="settings">
            <Link to={`/home/settings`}>Settings</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="logout" onClick={this.handleLogout} style={{ color: '#ff4d4f' }}>Logout</Menu.Item>
        </Menu>
      )
    }
  } 

  componentDidMount () {
    this.setState({
      stores: store.getState().auth
    })
    store.subscribe(() => {
      this.setState({
        stores: store.getState().auth
      })
    });
  }

  handleLogout () {
    store.dispatch(logout());
  }

  menuDisplay () {
    return this.state.stores.isAuthenticated ? (
      <Menu theme="dark" mode="horizontal" className="settings" selectable={false}>
        <Menu.Item key="user">
          <Dropdown overlay={this.state.menuDropdown}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Hi, {this.state.stores.user.data.username} <DownOutlined />
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>) : (<></>);
  }

  render () {
    if (!this.state.stores.isAuthenticated) {
      return (<Redirect to="/login" />);
    } else {
    return (
      <Layout>

      <Header>
        <div className="logo">
          <p>nuHome <span style={{marginLeft: '10px', fontSize: '16px'}}>by Refugee Group</span></p>
        </div>
        {this.menuDisplay()}
      </Header>

      <Layout style={{ padding: '10px 50px' }}>

        <Sider width={250} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['dm']}
            defaultOpenKeys={['forum']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="dm">
              <span>
                <MailOutlined />
              </span>
              <Link to={`${this.props.match.path}/dm`}>Direct Message</Link>
            </Menu.Item>

            {
              this.state.stores.user.data.isVerified ? (
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
              ) : (<></>)
            }

            { 
              this.state.stores.user.data.type !== "refugee" ? (
                <Menu.Item key="status">
                  <span>
                    <IdcardOutlined />
                  </span>
                  <Link to={`${this.props.match.path}/status`}>Refugee Status</Link>
                </Menu.Item>
              ) : (<></>)
            }

            { 
              this.state.stores.user.data.type === "admin" ? (
                <Menu.Item key="reg_ngo">
                  <span>
                    <UserAddOutlined />
                  </span>
                  <Link to={`${this.props.match.path}/register_ngo`}>NGO Workers Registration</Link>
                </Menu.Item>
              ) : (<></>)
            }
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
      </Layout>
    )
  }
  }
}

export default Index;
