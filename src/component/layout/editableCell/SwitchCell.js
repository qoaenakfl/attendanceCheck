import React from "react";
import { Switch } from "../../login/node_modules/antd";
import { FormItem } from "./cellFrom";

class SwitchCell extends React.Component {
  switchChange = checked => {
    // const { record, handleSave } = this.props;
    // handleSave({
    //   ...record,
    //   note: checked
    // });
  };

  render() {
    return (
      <FormItem style={{ margin: 0 }}>
        {
          <Switch
            defaultChecked
            checkedChildren="O"
            unCheckedChildren="X"
            onChange={this.switchChange}
          />
        }
      </FormItem>
    );
  }
}

export default SwitchCell;
