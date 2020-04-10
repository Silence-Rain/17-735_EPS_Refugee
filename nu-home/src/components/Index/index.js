import React from 'react';
import "./index.css";
import { Layout, Menu, Dropdown, Avatar, Space, message } from 'antd';
import { AppstoreOutlined, MailOutlined, IdcardOutlined, DownOutlined ,UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { ViewRouter } from '../../routes.js'
import { Link, withRouter } from 'react-router-dom';
import store from '../../redux/store';
import { logout } from '../../redux/actions/authAction';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Index extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      stores: {
        auth: {
          user: {
            username: null,
            user_type: null,
            isVerified: false
          }
        },
        error: {
          msg: null,
          status: null
        }
      },
      isVerified: false,
      // Dropdown menu for user's settings and logout
      menuDropdown: (
        <Menu>
          <Menu.Item key="settings">
            <Link to={`/home/settings`}>Settings</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="logout" onClick={this.onLogout} style={{ color: '#ff4d4f' }}>Logout</Menu.Item>
        </Menu>
      )
    };
  }

  // When the component is mounted, register a listener for redux store
  // Once store has been changed, update this.state accordingly
  componentDidMount () {
    this.setState({
      stores: store.getState(),
      isVerified: store.getState().auth.user.user_type !== "refugee" || store.getState().auth.user.isVerified
    })
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        stores: store.getState()
      })
    });
  }

  // When the component is going to be unmounted, unregister the lister for redux store
  componentWillUnmount () {
    this.unsubscribe();
  }

  // Handler for "logout" button
  // If logout succeed, redirect to the login page
  onLogout = () => {
    store.dispatch(logout())
      .then(res => {
        if (this.state.stores.error.status) {
          message.error(this.state.stores.error.msg)
        }
        this.props.history.replace("/login")
      })
      .catch(err => {
        message.error("Network error in Logout")
      })
  }

  // Only display the dropdown menu if user has logged-in
  menuDisplay () {
    return this.state.stores.auth.isAuthenticated ? (
      <Menu theme="dark" mode="horizontal" className="settings" selectable={false}>
        <Menu.Item key="user">
          <Dropdown overlay={this.state.menuDropdown}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <Space>
                {`Hi, ${this.state.stores.auth.user.username}`} 
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>) : (<></>);
  }

  // Layout of Index component
  // Will display different views according to user's type
  render () {
    return (
      <Layout>

      <Header>
        <div className="logo">
          <p>nuHome <span style={{marginLeft: '10px', fontSize: '14px'}}>by EPS-Refugee</span></p>
        </div>
        {this.menuDisplay()}
      </Header>

      <Layout style={{ padding: '10px 50px' }}>

        <Sider breakpoint="xs" collapsedWidth="0" className="site-layout-content" width={250}>
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

          {/*If the user is an unverified refugee, then he/she can not access the forum page*/}
            <SubMenu
              key="forum"
              title={
                <span>
                  <AppstoreOutlined />
                  Forum
                </span>
              }
              disabled={!this.state.isVerified}
            >
              <Menu.Item key="important" disabled={!this.state.isVerified}>
                <Link to={`${this.props.match.path}/forum/important`}>Important!</Link>
              </Menu.Item>
              <Menu.Item key="social" disabled={!this.state.isVerified}>
                <Link to={`${this.props.match.path}/forum/social`}>Social</Link>
              </Menu.Item>
              <Menu.Item key="jobs" disabled={!this.state.isVerified}>
                <Link to={`${this.props.match.path}/forum/jobs`}>Jobs</Link>
              </Menu.Item>
              <Menu.Item key="accomodation" disabled={!this.state.isVerified}>
                <Link to={`${this.props.match.path}/forum/accomodation`}>Accomodation</Link>
              </Menu.Item>
              <Menu.Item key="resources" disabled={!this.state.isVerified}>
                <Link to={`${this.props.match.path}/forum/resources`}>Resources</Link>
              </Menu.Item>
              <Menu.Item key="other" disabled={!this.state.isVerified}>
                <Link to={`${this.props.match.path}/forum/other`}>Other</Link>
              </Menu.Item>
            </SubMenu>

            {/*If the user is a refugee, then he/she can not access the refugee status page*/}
            { 
              (this.state.stores.auth.user.user_type === "ngo_worker" 
                || this.state.stores.auth.user.user_type === "ngo_admin") ? (
                <Menu.Item key="status">
                  <span>
                    <IdcardOutlined />
                  </span>
                  <Link to={`${this.props.match.path}/status`}>Refugee Status</Link>
                </Menu.Item>
              ) : (<></>)
            }

          {/*Only admin can access the NGO registration page*/}
            {
              this.state.stores.auth.user.user_type === "ngo_admin" ? (
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

        <Layout style={{ padding: '0 24px' }}>
          <Content className="site-layout-content" style={{ padding: 24 }}>
            <ViewRouter {...this.props}/>
          </Content>
        </Layout>

      </Layout>
      </Layout>
    )
  }
}

export default withRouter(Index);
