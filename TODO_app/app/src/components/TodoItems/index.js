import React from 'react';
import axios from 'axios';
import { Table, Input, Button, Popconfirm, Form, message, Modal } from 'antd';

// Use the template of Ant Design to implement an editable table
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleUpdate } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleUpdate({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleUpdate,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
};

// Use the template of Ant Design to implement a form inside modal
const SubmitForm = Form.create({ name: 'submit_form' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new todo item"
          okText="Create"
          cancelText="Cancel"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Time">
              {getFieldDecorator('ts', {
                rules: [{ required: true }],
                initialValue: new Date().toLocaleString(),
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('comment', {
                rules: [{ required: true }],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class TodoItems extends React.Component {
  
  constructor(props) {
    super(props);
    // Description of table columns
    // The last column will be rendered as a "Delete" hyperlink associated with a pop-up confirmation box
    this.columns = [
      {
        title: 'Time',
        dataIndex: 'ts',
        width: '40%',
        editable: true,
      },
      {
        title: 'Description',
        dataIndex: 'comment',
        editable: true,
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    // Use state for data binding
    this.state = {
      dataSource: [],
      isVisible: false,
    };
  }

  // When the component is mounted, request for all records
  componentDidMount() {
    this.handleGet();
  };

  // Control the display of "Add item" modal
  showModal = () => {
    this.setState({ isVisible: true });
  };

  // Control the display of "Add item" modal
  handleCancel = () => {
    this.setState({ isVisible: false });
  };

  // Save the reference of form inside modal
  // Therefore this component can get the values from that child component
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  // Parse the format of response JSON
  parseRecord = record => {
    return {
      key: record.id,
      ts: new Date(record.ts).toLocaleString(),
      comment: record.comment,
    }
  }

  // Initiate GET request for all the records
  handleGet = () => {
    let res = axios.get("http://18.222.111.201:8888/todo_items")
      .then(res => {
        // Set this.state to update DOM
        this.setState({
          dataSource: res.data.result.res.map(this.parseRecord)
        });
      })
      .catch(() => {
        message.error('Onload error');
      }) 
  }

  // When "Create" is clicked...
  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      // Initiate POST request to add new record
      let res = axios.post("http://18.222.111.201:8888/todo_items", {
        data: {
          "comment": values.comment,
          "ts": new Date(values.ts).getTime(),
        }
      })
        .then(res => {
          // Set this.state to update DOM
          this.state.dataSource.push({
            key: this.state.dataSource[this.state.dataSource.length - 1].key + 1,
            ...values
          })
          this.setState({ 
            dataSource: this.state.dataSource 
          });    
        })
        .catch(() => {
          message.error('Add error');
        }) 
        .finally(() => {
          // Hide the pop-up modal, clear all the values in inputs
          form.resetFields();
          this.setState({ 
            isVisible: false 
          });
        })
    });
  };

  // When "Delete" is clicked...
  handleDelete = key => {
    // Initiate DELETE request to delete a record
    let res = axios.delete("http://18.222.111.201:8888/todo_items", {
      data: {
        "id": key
      }
    })
      .then(res => {
        // Set this.state to update DOM
        this.setState({ 
          dataSource: this.state.dataSource.filter(item => item.key !== key) 
        });      
      })
      .catch(() => {
        message.error('Delete error');
      }) 
  };

  // When the content of table changes...
  handleUpdate = row => {
    // Find which row is changed
    const index = this.state.dataSource.findIndex(item => row.key === item.key);
    const item = this.state.dataSource[index];
    
    // Initiate PUT request to update corresponding record
    let res = axios.put("http://18.222.111.201:8888/todo_items", {
      data: {
        "id": row.key, 
        "comment": row.comment,
        "ts": new Date(row.ts).getTime(),
      }
    })
      .then(res => {
        // Set this.state to update DOM
        this.state.dataSource[index] = row
        this.setState({ 
          dataSource: this.state.dataSource 
        });     
      })
      .catch(() => {
        message.error('Update error');
      }) 
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    // Set up editable attribute to all the cells under editable column
    // Register handler for the event when cell's value updates
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleUpdate: this.handleUpdate,
        }),
      };
    });

    // Render DOM
    return (
      <div>
        <Button onClick={this.showModal} type="primary" style={{ marginBottom: 16 }}>
          Add a todo item
        </Button>
        <SubmitForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.isVisible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default TodoItems;