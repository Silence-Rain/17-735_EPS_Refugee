import React from "react";
import { Table, Popconfirm, Divider, Button, Space, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import api from '../../api';
import store from '../../redux/store';
import './index.css';

class RefugeeStatus extends React.Component {
  state = {
    data: [],
    // Configurations of main table component
    columns: [
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Government ID',
        key: 'document',
        render: (text, record) => (
          <span>
            {record.document ? <a href={`http://${document.URL.split("/")[2]}/downloads/documents/${record.username}`} target="_blank" rel="noopener noreferrer">Download</a> : "Not Uploaded"}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="link" onClick={() => {this.redirectToChat(record.username)}}>Chat</Button>
            <Divider type="vertical"/>
            <Popconfirm 
              title={`Confirm the identity of ${record.username}?`} 
              onConfirm={() => this.verifyRefugee(record.username)}
            >
              <Button type="link">Verify</Button>
            </Popconfirm>
          </span>
        ),
      },
    ]
  }

  // When the component is mounted, request all unverified refugees of this certain NGO worker and render the page
  componentDidMount () {
    api.get("/get_unverified_users/", {
      headers: {
        'X-CSRFToken': store.getState().auth.token
      }
    })
      .then(res => {
        this.setState({
          data: res.data.res.unverified_refugees
        })
      })
      .catch(err => {
        if (err.response.data.res) {
          message.error(`Load RefugeeStatus failed!: ${err.response.data.res.message}`)
        } else {
          message.error(`Network error: ${err}`)
        }
      })
  }

  // Handler for "Chat" button
  // Redirect to DirectMessage with that certain refugee
  redirectToChat = username => {
    this.props.history.replace(`/home/dm/${username}`)
  }

  // Handler for "Verify" button
  verifyRefugee = username => {
    api.put("/verify_user/", {
      username: username
    }, {
      headers: {
        'X-CSRFToken': store.getState().auth.token
      }
    })
      .then(res => {
        message.info("Verification success!")
        this.setState({
          data: this.state.data.filter(val => {console.log(val, username); return val !== username} )
        })
      })
      .catch(err => {
        if (err.response.data.res) {
          message.error(`Verification failed!: ${err.response.data.res.message}`)
        } else {
          message.error(`Network error: ${err}`)
        }
      })
  }

  // Handler for "Download decryption script" button
  downloadDecryption = () => {
    window.open(`http://${document.URL.split("/")[2]}/downloads/decrypt.py`)
  }

  // Handler for "Download key" button
  downloadKey = () => {
    window.open(`http://${document.URL.split("/")[2]}/keys/${store.getState().auth.user.username}/key.key`)
  }

  // Handler for "Download secure deletion script" button
  downloadDeletion = () => {
    window.open(`http://${document.URL.split("/")[2]}/downloads/delete.py`)
  }

  // Layout of RefugeeStatus component
  render () {
    return (
      <div>
      	<h2>RefugeeStatus </h2>
        <div className="row-buttons">
          <Space>
            <Button type="primary" onClick={this.downloadKey}><DownloadOutlined/> Download decryption key</Button>
            <Button type="primary" onClick={this.downloadDecryption}><DownloadOutlined/> Download decrypt script</Button>
            <Button type="primary"  onClick={this.downloadDeletion}><DownloadOutlined/> Download secure deletion script</Button>
          </Space>
        </div>
        <Divider/>
      	<Table columns={this.state.columns} dataSource={this.state.data} rowKey="username"/>
      </div>
    )
  }
}

export default withRouter(RefugeeStatus);
