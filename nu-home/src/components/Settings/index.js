import React from "react";
import { Avatar, Button, Space, Input, Divider } from "antd";
import "./index.css";

class Settings extends React.Component {
  state = {
    username: "Silence"
  }
  render () {
    return (
      <div style={{ width: "60%" }}>
        <h2>Settings </h2>

        <div className="flex-row">
          <Space>
            <h2>Hi, {this.state.username}</h2>
            <div>
              <Space>
                <Avatar src="/assets/silence.png"/>
                <Button type="primary">Change avatar</Button>
              </Space>
            </div>
          </Space>
        </div>

        <h4>Bio</h4>
        <Input.TextArea rows={4} />
        <Divider />
        <h4>Subject access request (SAR)</h4>
        <p>Description of SAR blah blah blah</p>
        <Button type="primary">Initiate SAR</Button>
        <Divider />
        <h4>Delete your account</h4>
        <p>Are you sure???!!!</p>
        <Button type="primary" danger>Delete account</Button>

      </div>
    )
  }
}

export default Settings;