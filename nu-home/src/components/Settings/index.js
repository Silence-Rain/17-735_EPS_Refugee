import React from "react";
import { Avatar, Button, Space, Input, Divider, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import "./index.css";
import store from '../../redux/store';
import api from '../../api';
import { loadUser, logout } from '../../redux/actions/authAction';
import { withRouter } from 'react-router-dom';

const id_props = {
  name: 'document',
  showUploadList: false,
  customRequest: ({ file }) => {
    const formData = new FormData();
    formData.append("document", file)
    api.post("/upload_document/", formData, {
      headers: {
        'X-CSRFToken': store.getState().auth.token,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      message.success(`File upload success`);
    })
    .catch(err => {
      message.error(`File upload failed.`);
    });
  }
};

class Settings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: {
        username: null,
        avatar: 0,
        bio: ""
      },
      newBio: ""
    };
  }

  componentWillMount () {
    this.setState({
      user: store.getState().auth.user
    })  
  }

  handleUpdateBio = () => {
    api.put("/update_user_profile/", {
      "avatar": this.state.user.avatar,
      "bio": this.state.newBio
    }, {
      headers: {
        'X-CSRFToken': store.getState().auth.token
      }
    })
    .then(res => {
      message.info("Update bio success!")
      store.dispatch(loadUser())
        .then(res => {
          this.setState({
            user: store.getState().auth.user
          })
        })
        .catch(err => {
          message.error("Network error in update bio")
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
      window.open(`http://${document.URL.split("/")[2]}/${res.data.res.url}`)
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

        {
          (this.state.user.user_type === "refugee" || this.state.user.user_type === "ngo_worker") ? (
            <div>
              <h4>Bio</h4>
              <Input.TextArea rows={4} defaultValue={this.state.user.bio} onChange={e => {this.setState({newBio: e.target.value})}}/>
              <Button type="primary" style={{ marginTop: "10px" }} onClick={this.handleUpdateBio}>Save Bio</Button>
              <Divider />
            </div>
          ) : (<></>)
        }

        {
          (this.state.user.user_type === "refugee" && this.state.user.isVerified === false) ? (
            <div>
              <h4>Please upload your government issued ID:</h4>
              <Upload {...id_props}>
                <Button>
                  <UploadOutlined /> Click to Upload
                </Button>
              </Upload>
              <Divider />
            </div>
          ) : (<></>)
        }
        
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

export default withRouter(Settings);