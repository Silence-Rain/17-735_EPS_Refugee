import React from "react";
import { withRouter } from "react-router-dom";
import { List, Avatar, Tag, Button, Modal, Form, Input, Select, Divider, message, Space, Popover } from 'antd';
import store from '../../redux/store';
import api from '../../api';

const { Option } = Select;
const categories = ["important", "social", "jobs", "accomodation", "resources", "other"]

// Layout of "New Post" modal dialog
const PostCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Create a new post"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of your post!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category" 
          label="Category" 
          rules={[
            { 
              required: true,
              message: 'Please select the category of your post!',
            }
          ]}
        >
          <Select
            showSearch
          >
            {
              categories.length && categories.map(item => (
                <Option key={item} value={item}>{item}</Option>
              )) 
            }
          </Select>
        </Form.Item>

        <Form.Item 
          name="content" 
          label="Content"
          rules={[
            { 
              required: true,
              message: 'Please input the content of your post!',
            }
          ]}
        >
          <Input.TextArea rows={10} />
        </Form.Item>

      </Form>
    </Modal>
  );
};

class Forum extends React.Component {
  state = {
    showModal: false,
    data: []
  }

  // When the component is mounted, load all posts from server
  componentDidMount () {
    this.loadPosts()
  }

  // Handler for "Create post" button
  onCreate = values => {
    api.post("/new_post/", values, {
      headers: {
        'X-CSRFToken': store.getState().auth.token
      }
    })
    .then(res => {
      message.info("Creation success!")
      this.setState({ showModal: false })
      this.loadPosts()
    })
    .catch(err => {
      if (err.response.data.res) {
        message.error(`Creation failed!: ${err.response.data.res.message}`)
      } else {
        message.error(`Network error: ${err}`)
      }
    });
  }

  // Handler for "Delete post" button
  onDelete = id => {
    api.delete("/delete_post/", {
      headers: {
        'X-CSRFToken': store.getState().auth.token
      },
      data: {
        "post_id": id
      }
    })
    .then(res => {
      message.info("Deletion success!")
      this.loadPosts()
    })
    .catch(err => {
      if (err.response.data.res) {
        message.error(`Deletion failed!: ${err.response.data.res.message}`)
      } else {
        message.error(`Network error: ${err}`)
      }
    });
  }

  // Handler for "Verify post" & "Mark as false" button
  onVerify = (id, status) => {
    api.put("/update_post_status/", {
      "post_id": id,
      "status": status
    }, {
      headers: {
        'X-CSRFToken': store.getState().auth.token
      }
    })
    .then(res => {
      message.info("Verification success!")
      this.loadPosts()
    })
    .catch(err => {
      if (err.response.data.res) {
        message.error(`Verification failed!: ${err.response.data.res.message}`)
      } else {
        message.error(`Network error: ${err}`)
      }
    });
  }

  // Request all posts from server
  loadPosts = () => {
    api.get("/get_all_posts/", {
      headers: {
        'X-CSRFToken': store.getState().auth.token
      }
    })
    .then(res => {
      this.setState({ data: res.data.res })
    })
    .catch(err => {
      if (err.response.data.res) {
        message.error(`Load posts failed!: ${err.response.data.res.message}`)
      } else {
        message.error(`Network error: ${err}`)
      }
    });
  }

  // Layout of Forum component
  render () {
    const { category } = this.props.match.params;   
    return (
      <div>
        <h2>Forum: { category }</h2>
        <Button type="primary" onClick={() => { this.setState({ showModal: true }) }}>
          New Post
        </Button>

        <Divider />
        
        <PostCreateForm
          visible={this.state.showModal}
          onCreate={this.onCreate}
          onCancel={() => { this.setState({ showModal: false }) }}
        />

        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 10
          }}
          // Use array.filter to switch between categories, will not request for posts every time
          dataSource={this.state.data.filter(e => e.category === this.props.match.params.category)}
          renderItem={item => (
            <List.Item
              key={item.post_id}
            >
              <List.Item.Meta
                avatar={<Avatar src={`/assets/avatars/avatar${item.user.avatar}.png`} />}
                title={
                  item.title
                }
                description={
                  <div>
                    <Popover 
                      placement="topLeft"
                      content={
                        <div>
                          <Space>
                            <Avatar src={`/assets/avatars/avatar${item.user.avatar}.png`} />
                            <b>{item.user.username}</b>
                          </Space>
                          <p>{`${item.user.bio}`}</p>
                        </div>
                      } 
                      title="Author's Profile"
                    >
                      <div>Author: {item.user.username}</div>
                    </Popover>
                    <div>
                      <Tag color={item.category === "important" ? "red" : "blue"}>{item.category}</Tag>
                      <Tag color={item.status === "verified" ? "green" : (item.status === "false" ? "orange" : null)}>{item.status}</Tag>
                    </div>
                  </div>
                }
              />
              {item.content}
              <div style={{ margin: "20px 0" }}>
                <Space>
                  {
                    item.user.username === store.getState().auth.user.username ? 
                    <Button type="primary" danger onClick={() => { this.onDelete(item.post_id) }}>
                      Delete Post
                    </Button>
                    : <></>
                  }
                  {
                    ("refugee" !== store.getState().auth.user.user_type && item.status === "unverified") ? 
                    <Button ghost type="primary" onClick={() => { this.onVerify(item.post_id, "verified") }}>
                      Verify This Post
                    </Button>
                    : <></>
                  }
                  {
                    ("refugee" !== store.getState().auth.user.user_type && item.status === "unverified") ? 
                    <Button danger onClick={() => { this.onVerify(item.post_id, "false") }}>
                      Mark This Post as False
                    </Button>
                    : <></>
                  }
                </Space>
              </div>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default withRouter(Forum);
