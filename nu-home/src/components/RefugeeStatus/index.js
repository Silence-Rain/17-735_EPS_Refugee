import React from "react";
import { Table, Popconfirm, Divider, message } from 'antd';
import { withRouter } from 'react-router-dom';
import api from '../../api';
import store from '../../redux/store';

class RefugeeStatus extends React.Component {
  state = {
    data: [
      {
        key: '1',
        username: 'John Brown',
        id: true
      },
      {
        key: '2',
        username: 'Silence',
        id: false
      },
      {
        key: '3',
        username: 'Daniel',
        id: true
      },
    ],
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
            {record.document ? <a href={`${record.username}`} target="_blank">Download</a> : "Not Uploaded"}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => {this.redirectToChat(record.username)}}>Chat</a>
            <Divider type="vertical"/>
            <Popconfirm 
              title={`Confirm the identity of ${record.username}?`} 
              onConfirm={() => this.verifyRefugee(record.username)}
            >
              <a href="#">Verify</a>
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
          data: res.data.res.usernames
        })
      })
      .catch(err => {
        message.error("Load RefugeeStatus Failed!")
      })
  }

  redirectToChat = username => {
    console.log(username)
    this.props.history.push("/home/dm")
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
        message.info("Verification Success!")
        this.setState({
          data: this.state.data.filter(val => { val !== username })
        })
      })
      .catch(err => {
        message.error("Verification Failed!")
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
