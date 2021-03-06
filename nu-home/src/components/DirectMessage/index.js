import React from "react";
import { Comment, Avatar, Form, Button, List, Input, Divider } from 'antd';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import "./index.css";
import store from '../../redux/store';
import api from '../../api';

const { TextArea } = Input;

// Layout of chat history
const CommentList = ({ username, messages }) => (
  <List
    dataSource={messages}
    itemLayout="horizontal"
    header={`Chat with ${username}`}
    renderItem={props => <Comment {...props} />}
  />
);

// Layout of message editor
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
    messages: [],
    submitting: false,
    value: '',
    from: {
      author: "",
      avatar: ""
    },
    to: {
      author: "",
      avatar: ""
    }
  };
  ws = null;

  // When the component will be mounted, set profiles for both sender and receiver
  componentWillMount () {
    this.setState({
      from: {
        author: store.getState().auth.user.username,
        avatar: `/assets/avatars/avatar${store.getState().auth.user.avatar}.png`
      },
      to: {
        author: this.props.match.params.user,
        avatar: `/assets/refugee.png`
      }
    })
  }

  // When the component is mounted, set avatar for receiver,
  // establish WebSocket connection with chat server, and finish all WebSocket configurations
  componentDidMount () {
    api.get("/get_avatar/", {
      params: {
        'username': this.props.match.params.user
      },
      headers: {
        'X-CSRFToken': store.getState().auth.token
      }
    })
    .then(res => {
      this.setState({ 
        to: {
          author: this.state.to.author,
          avatar: `/assets/avatars/avatar${res.data.res.avatar}.png`
        }
      })
    })
    .catch(err => {
      console.log(err)
    });

    let baseURL = process.env.NODE_ENV === 'production' ? 'wss://www.silence-rain.com/chat/' : 'ws://localhost/chat/';
    this.ws = new WebSocket(baseURL);
    // When WS connection is established, send the sender's username to help server-side init
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({
        type: "init",
        data: this.state.from.author
      }))
    }

    this.ws.onmessage = message => {
      let msg = JSON.parse(message.data)

      // Client init: receive all previous messages
      if (msg.type === "init") {
        this.setState({
          messages: msg.data
            .filter(v => (v.from_user === this.state.to.author || v.to_user === this.state.to.author))
            .map(v => {
              return {
                author: v.from_user,
                avatar: v.from_user === this.state.from.author ? this.state.from.avatar : this.state.to.avatar,
                content: v.content,
                datetime: moment(v.date_time).fromNow()
              }
            })
        })
      // When receiving a new message, add and display it
      } else if (msg.type === "message") {
        this.setState({
          messages: [
            ...this.state.messages,
            {
              ...this.state.to,
              content: <p>{msg.content}</p>,
              datetime: moment(msg.date_time).fromNow(),
            },
          ],
        });
      // When receiving a confirmation, enable the "send message" button again and display the newly-sent message
      } else if (msg.type === "confirm") {
        this.setState({
          submitting: false,
          value: '',
          messages: [
            ...this.state.messages,
            {
              ...this.state.from,
              content: <p>{this.state.value}</p>,
              datetime: moment().fromNow(),
            },
          ],
        });
      // When receiving a broadcast message, only process it if it is belong to this client
      } else if (msg.type === "broadcast") {
        if (msg.to_user === this.state.from.author) {
          this.setState({
            messages: [
              ...this.state.messages,
              {
                ...this.state.to,
                content: <p>{msg.content}</p>,
                datetime: moment(msg.date_time).fromNow(),
              },
            ],
          });
        }
      }
    }
  }

  // Handler for "send message" button
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    // Disable the "send message" button and send the new message to server
    this.setState({
      submitting: true,
    });

    this.ws.send(JSON.stringify({
      type: "message",
      content: this.state.value,
      from_user: this.state.from.author,
      to_user: this.state.to.author,
      date_time: (new Date()).getTime()
    }));
  };

  // Record the value of textarea in a real-time fashion
  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  // Layout of DirectMessage component
  render() {
    const { messages, submitting, value } = this.state;
    const { user } = this.props.match.params; 

    return (
      <div className="two-cols-layout">
        <div style={{ width: "75%" }}>
          <h2>DirectMessage </h2>
          {
            user !== "default" ? (
              <div>
                {messages.length > 0 && <CommentList username={user} messages={messages} />}
                <Divider />
                <Comment
                  avatar={
                    <Avatar
                      src={this.state.from.avatar}
                      alt={this.state.from.author}
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
            ) : (<h4>Please go to "Refugee Status" and click on the user you want to chat with!</h4>)
          }        
        </div>
      </div>
    );
  }
}

export default withRouter(DirectMessage);