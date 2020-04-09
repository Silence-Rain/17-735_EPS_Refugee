import React from "react";
import { Comment, Avatar, Form, Button, List, Input, Divider, Space } from 'antd';
import moment from 'moment';
import "./index.css";

const { TextArea } = Input;

const CommentList = ({ username, comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    header={`Chat with ${username}`}
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Send Message
      </Button>
    </Form.Item>
  </div>
);

class DirectMessage extends React.Component {
  state = {
    comments: [
      {
        author: 'Refugee',
        avatar: '/assets/refugee.png',
        content: <p>Hi, I'm looking for help</p>,
        datetime: moment(1586424056559).fromNow(),
      },
      {
        author: 'Silence',
        avatar: '/assets/silence.png',
        content: <p>Hi, I'm here to help you!</p>,
        datetime: moment(1586425058000).fromNow(),
      },
    ],
    submitting: false,
    value: '',
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          ...this.state.comments,
          {
            author: 'Silence',
            avatar: '/assets/silence.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div className="two-cols-layout">
        <div style={{ width: "65%", marginRight: "5%" }}>
          <h2>DirectMessage </h2>
          {comments.length > 0 && <CommentList username="Refugee" comments={comments} />}
          <Divider />
          <Comment
            avatar={
              <Avatar
                src="/assets/silence.png"
                alt="Silence"
              />
            }
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        </div>
        <div style={{ width: "25%" }}>
          <List
            header={<div>Contacts</div>}
            dataSource={["Refugee", "Anonymous Giraffe"]}
            renderItem={item => (
              <List.Item>
                <Space>
                  <Avatar
                    src="/assets/refugee.png"
                    alt="Refugee"
                  />
                  {item}
                </Space>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default DirectMessage;