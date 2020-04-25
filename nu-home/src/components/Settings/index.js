import React from "react";
import { Avatar, Button, Space, Input, Divider, message } from "antd";
import "./index.css";
import store from '../../redux/store';
import api from '../../api';
import { loadUser, logout } from '../../redux/actions/authAction';

class Settings extends React.Component {
  state = {
    user: {
      username: null,
      avatar: 0,
      bio: ""
    }
  }

  componentDidMount () {
    this.setState({
      user: store.auth.user
    })
  }

  handleUpdateBio = value => {
    api.put("/update_user_profile/", {
      "avatar": this.state.user.avatar,
      "bio": value
    }, {
      headers: {
        'X-CSRFToken': store.getState().auth.token
      }
    })
    .then(res => {
      message.info("Update bio success!")
      store.dispatch(loadUser())
        .then(res => {
          if (this.state.stores.error.status) {
            message.error(this.state.stores.error.msg)
          }
          this.setState({
            user: store.auth.user
          })
        })
        .catch(err => {
          message.error("Network error in Logout")
        })
    })
    .catch(err => {
      if (err.response.data.res) {
        message.error(`Update bio failed!: ${err.response.data.res.message}`)
      } else {
        message.error(`Network error: ${err}`)
      }
    });
  }

  // handleUpdateAvatar = e => {
  //   console.log(e);
  // }

  handleSAR = () => {
    api.get("/get_sar/", {
      headers: {
        'X-CSRFToken': store.getState().auth.token
      }
    })
    .then(res => {
      console.log(res.data.res.url)
    })
    .catch(err => {
      if (err.response.data.res) {
        message.error(`SAR request failed!: ${err.response.data.res.message}`)
      } else {
        message.error(`Network error: ${err}`)
      }
    });
  }

  handleDeleteAccount = () => {
    api.delete("/delete_user_profile/", {
      headers: {
        'X-CSRFToken': store.getState().auth.token
      }
    })
    .then(res => {
      message.info("Account deletion success! You will be logged out in 3 seconds...")
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
    })
    .catch(err => {
      if (err.response.data.res) {
        message.error(`Deletion failed!: ${err.response.data.res.message}`)
      } else {
        message.error(`Network error: ${err}`)
      }
    });
  }

  // Layout of Settings component
  render () {
    return (
      <div style={{ width: "60%" }}>
        <h2>Settings </h2>

        <div className="flex-row">
          <Space>
            <h2>Hi, {this.state.user.username}</h2>
            <div>
              <Space>
                <Avatar src={`/assets/avatars/avatar${this.state.user.avatar}.png`}/>
                {/*<Button type="primary">Change avatar</Button>*/}
              </Space>
            </div>
          </Space>
        </div>

        <h4>Bio</h4>
        <Input.TextArea rows={4} defaultValue={this.state.user.bio}/>
        <Button type="primary" onClick={this.handleUpdateBio}>Save Bio</Button>
        <Divider />
        <h4>Subject access request (SAR)</h4>
        <p>Description of SAR blah blah blah</p>
        <Button type="primary" onClick={this.handleSAR}>Initiate SAR</Button>
        <Divider />
        <h4>Delete your account</h4>
        <p>Are you sure???!!!</p>
        <Button type="primary" danger onClick={this.handleDeleteAccount}>Delete account</Button>

      </div>
    )
  }
}

export default Settings;