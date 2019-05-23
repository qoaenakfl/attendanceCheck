import React from "react";
import { Menu, Dropdown, Icon } from "antd";
import { FormItem } from "./cellFrom";

class DropdownCell extends React.Component {

  state = {
    select: 2
  };

  componentDidMount= () => {
    const { record, handleSave } = this.props;
    handleSave({
      ...record,
      time: this.props.dropData[this.state.select - 1].time
    });
  }

  dropdownClick = e => {
    const { record, handleSave } = this.props;
    this.setState({ select: e.key - 1 });

    handleSave({
      ...record,
      time: this.props.dropData[e.key - 1].time
    });
  };

  render() {
    const {
      dropData,
    } = this.props;
    return (
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
  }
}

export default DropdownCell;
