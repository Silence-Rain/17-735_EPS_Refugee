import React from "react";
import { Table, Popconfirm, Divider, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import api from '../../api';
import store from '../../redux/store';

class RefugeeStatus extends React.Component {
  state = {
    data: [],
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

  redirectToChat = username => {
    this.props.history.replace(`/home/dm/${username}`)
  }

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
          data: this.state.data.filter(val => val !== username )
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

  // Layout of RefugeeStatus component
  render () {
    return (
      <div>
      	<h2>RefugeeStatus </h2>
      	<Table columns={this.state.columns} dataSource={this.state.data} rowKey="username"/>
      </div>
    )
  }
}

export default withRouter(RefugeeStatus);
