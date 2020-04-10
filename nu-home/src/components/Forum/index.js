import React from "react";
import { withRouter } from "react-router-dom";
import { List, Avatar, Tag } from 'antd';

// Fake data for demo purpose
const listData = [];
const tags = ["important", "social", "jobs", "accomodation", "resources", "other"]
for (let i = 0; i < 23; i++) {
  listData.push({
    href: '',
    title: `Title ${i}`,
    avatar: '/assets/silence.png',
    tag: tags[i % 6],
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa officiis est, tenetur modi illum nesciunt porro expedita in iure dolor cupiditate ab voluptatum? Laborum labore inventore exercitationem nostrum corrupti tenetur.',
  });
}

class Forum extends React.Component {
  // Layout of Forum component
  render () {
    const { category } = this.props.match.params;   
    return (
      <div>
        <h2>Forum: { category }</h2>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={listData.filter(e => e.tag === this.props.match.params.category)}
          renderItem={item => (
            <List.Item
              key={item.title}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={
                  item.title
                  //<a href={item.href}>{item.title}</a>
                }
                description={<Tag color={item.tag === "important" ? "red" : "blue"}>{item.tag}</Tag>}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default withRouter(Forum);
