import React from "react";
import { Input } from "../../login/node_modules/antd";
import { FormItem } from "./cellFrom";

class EditableInputCell extends React.Component {
  state = {
    editing: false
  };

  save = e => {
    const { record, handleSave, form } = this.props;
    form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }

      this.toggleEdit();

      handleSave({ ...record, ...values });
    });
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  render() {
    const { editing } = this.state;
    const { dataindex, title, record, form, restProps } = this.props;
    return editing ? (
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
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {restProps.children}
      </div>
    );
  }
}

export default EditableInputCell;
