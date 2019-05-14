import React from "react";
import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

class sideLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.value.data.area
    };
  }

  handleClick = e => {
    this.props.onSelectChange(e.key);
  };

  render() {
    return (
      <Sider>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={this.handleClick}
        >
          {this.state.data.map(data => {
            // console.log(JSON.parse(data));
            // console.log(typeof data);
            return (
              <Menu.Item key={data.id}>
                <Icon type={data.icon} />
                <span>{data.name}</span>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
    );
  }
}

export default sideLayout;
