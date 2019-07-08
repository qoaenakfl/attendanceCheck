import React from "react";
import { Menu, Dropdown, Icon } from "../../login/node_modules/antd";
import { FormItem } from "./cellFrom";

class DropdownCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      select: 2
    };
  }

  dropdownClick = e => {
    const { record, handleSave, title } = this.props;
    this.setState({ select: e.key - 1 });

    if (title == "worship") {
      handleSave({
        ...record,
        worship: this.props.dropData[e.key - 1].time
      });
    } else if (title == "meeting") {
      handleSave({
        ...record,
        meeting: this.props.dropData[e.key - 1].time
      });
    } else if (title == "time") {
      handleSave({
        ...record,
        time: this.props.dropData[e.key - 1].time
      });
    }
  };

  render() {
    const { dropData } = this.props;
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
