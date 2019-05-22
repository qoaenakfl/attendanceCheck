import React from "react";
import { Input, Form, Menu, Dropdown, Icon, Switch } from "antd";

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
      time: this.props.dropData[e.key - 1].time
    });
  };

  switchChange = checked => {
    const { record, handleSave } = this.props;

    handleSave({
      ...record,
      note: checked
    });
  };

  switchRender = () => {
    const rendering = (
      <FormItem style={{ margin: 0 }}>
        {
          <Switch
            defaultChecked
            checkedChildren="제출"
            unCheckedChildren="미제출"
            onChange={this.switchChange}
          />
        }
      </FormItem>
    );

    return rendering;
  };

  dropdownRender = () => {
    const { dropData } = this.props;

    const rendering = (
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
    );

    return rendering;
  };

  editableInputRender = form => {
    const { dataindex, title, record } = this.props;
    const rendering = (
      <FormItem style={{ margin: 0 }}>
        {form.getFieldDecorator(dataindex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`
            }
          ],
          initialValue: record[dataindex]
        })(
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </FormItem>
    );

    return rendering;
  };

  render() {
    const { editing } = this.state;
    const {
      isDrop,
      isSwitch,
      editable,
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
                this.dropdownRender()
              ) : isSwitch ? (
                this.switchRender()
              ) : editing ? (
                this.editableInputRender(form)
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
