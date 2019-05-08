import React from "react";
import {Layout, Menu, Icon } from 'antd';
import SideLayout from './sideLayout'

import FirebaseLogin from '../Login/firebaseAuth'

const { Header, Content, Sider } = Layout;

class SiderDemo extends React.Component {
    constructor(props){
        super(props);

        this.state={
            data:[
                {
                    id: 1,
                    name: 'nav1',
                    icon: 'user'
                },{
                    id: 2,
                    name: 'nav2',
                    icon: 'user'
                },{
                    id: 3,
                    name: 'nav3',
                    icon: 'user'
                }
            ],
            select:1
        }
    }

    handleClick= (_select) => {
      this.setState({select:_select})
    }

    userChange= (_user) => {
      this.props.userLogin(_user);
    }

    render() {
    return (
      <Layout>
        <FirebaseLogin
        />
        <SideLayout
          value={this.state}
          onSelectChange={this.handleClick}
        />          
        <Layout>
          <Header style={{ background: '#fff', padding: 10 }}>
            <h1>{this.state.data[this.state.select-1].name}</h1>
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;