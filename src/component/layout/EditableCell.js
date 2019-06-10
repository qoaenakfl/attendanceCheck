import React from "react";
import { Input, Menu, Dropdown, Icon, Switch } from "antd";
import { FormItem, EditableContext } from "./editableCell/cellFrom";

import DropdownCell from "./editableCell/DropdownCell";
import EditableInputCell from "./editableCell/EditableInputCell";
import SwitchCell from "./editableCell/SwitchCell";

export class EditableCell extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      record: this.props.record
    }
  }

  render() {
    const {
      isDrop,
      isSwitch,
      editable,
      index,
      handleSave,
      dropData,
      record,
      dataindex,
      title,
      ...restProps
    } = this.props;

    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return isDrop ? (
                <DropdownCell
                  dropData={dropData}
                  handleSave={handleSave}
                  record={record}
                  title={title}
                />
              ) : isSwitch ? (
                <SwitchCell
                record={record}
                handleSave={handleSave}
                />
              ) : (
                <EditableInputCell
                  dataindex={dataindex}
                  title={title}
                  record={record}
                  form={form}
                  restProps= {restProps}
                  handleSave={handleSave}
                />
              )
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}
