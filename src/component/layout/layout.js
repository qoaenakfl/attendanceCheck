import React from "react";
import {Layout, Menu, Icon } from 'antd';
import SideLayout from './sideLayout'

import FirebaseAuth from '../common/firebaseAuth'

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

      this.handleClick= this.handleClick.bind(this);
      this.userChange= this.userChange.bind(this);
    }

    handleClick(_select){
      this.setState({select:_select})
    }

    userChange(_user){
      this.props.userLogin(_user);
    }

    render() {
    return (
      <Layout>
        <FirebaseAuth
          userLogin={this.userChange}
          user={this.props.user}
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

// import { Layout, Menu, Icon } from 'antd';

// const { Header, Sider, Content } = Layout;

// class SiderDemo extends React.Component {
//   state = {
//     collapsed: false,
//   };

//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   }

//   render() {
//     return (
//       <Layout>
//         <Sider
//           trigger={null}
//           collapsible
//           collapsed={this.state.collapsed}
//         >
//           <div className="logo" />
//           <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//             <Menu.Item key="1">
//               <Icon type="user" />
//               <span>nav 1</span>
//             </Menu.Item>
//             <Menu.Item key="2">
//               <Icon type="video-camera" />
//               <span>nav 2</span>
//             </Menu.Item>
//             <Menu.Item key="3">
//               <Icon type="upload" />
//               <span>nav 3</span>
//             </Menu.Item>
//           </Menu>
//         </Sider>
//         <Layout>
//           <Header style={{ background: '#fff', padding: 0 }}>
//             <Icon
//               className="trigger"
//               type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
//               onClick={this.toggle}
//             />
//           </Header>
//           <Content style={{
//             margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
//           }}
//           >
//             Content
//           </Content>
//         </Layout>
//       </Layout>
//     );
//   }
// }

// ReactDOM.render(<SiderDemo />, mountNode);