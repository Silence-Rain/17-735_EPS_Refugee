import React from "react";
import { Table, Popconfirm, Divider } from 'antd';

// Column settings for the table
const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Government ID',
    key: 'id',
    render: (text, record) => (
      <span>
      	{record.id ? <a>Download</a> : "Not Uploaded"}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Chat</a>
        <Divider type="vertical"/>
        <Popconfirm title={`Confirm the identity of ${record.username}?`}>
          <a>Verify</a>
        </Popconfirm>
      </span>
    ),
  },
];
// Fake data for demo purpose
const data = [
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
];

class RefugeeStatus extends React.Component {
  // Layout of RefugeeStatus component
  render () {
    return (
      <div>
      	<h2>RefugeeStatus </h2>
      	<Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default RefugeeStatus;
