import React from "react";
import { Input, Form, Menu, Dropdown, Icon } from "antd";

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

export const EditableFormRow = Form.create()(EditableRow);

export class EditableCell extends React.Component {
  state = {
    editing: false,
    select: 2
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
    const { record, handleSave } = this.props;
    console.dir(record);
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }

      this.toggleEdit();

      handleSave({ ...record, ...values });
    });
  };

  dropdownClick = e => {
    const { record, handleSave } = this.props;
    this.setState({ select: e.key - 1 });

    handleSave({
      ...record,
      time: this.props.dropData[this.state.select].time
    });
  };

  renderDropdown= () => {
    
  }

  render() {
    const { editing } = this.state;
    const {
      isDrop,
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      dropData,
      ...restProps
    } = this.props;

    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return isDrop ? (
                <FormItem style={{ margin: 0 }}>
                  {
                    <Dropdown
                      overlay={
                        <Menu onClick={this.dropdownClick}>
                          {dropData.map(data => {
                            return (
                              <Menu.Item key={data.id}>
                                <span>{data.time}</span>
                              </Menu.Item>
                            );
                          })}
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <a>
                        {dropData[this.state.select].time}
                        <Icon type="down" />
                      </a>
                    </Dropdown>
                  }
                </FormItem>
              ) : editing ? (
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} is required.`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(
                    <Input
                      ref={node => (this.input = node)}
                      onPressEnter={this.save}
                      onBlur={this.save}
                    />
                  )}
                </FormItem>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}
