import React from "react";
import { Table, Popconfirm, Divider } from 'antd';

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
  render () {
    return (
      <div>
      	RefugeeStatus 
      	<Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default RefugeeStatus;
