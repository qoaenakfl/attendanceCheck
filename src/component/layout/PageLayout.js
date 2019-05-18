import React from "react";
import { Layout } from "antd";
import SideLayout from "./SideLayout";
import ContentLayout from './ContentLayout'

import FirebaseAuth from "../../firebaseService/Login/firebaseAuth";

import firebaseData from "../../firebaseService/database/firebaseData";
import AppLoading from "../common/AppLoading";

const { Header, Content } = Layout;

class PageLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      select: 1,
      isLoading: true
    };
  }

  handleClick = _select => {
    this.setState({ select: _select });
  };

  userChange = _user => {
    this.props.userLogin(_user);
  };

  componentDidMount = () => {
    firebaseData.sideMenu().then(sideArr => {
      if (sideArr) {
        this.setState({
          data: sideArr,
          isLoading: false
        });
      }
    });
  };

  render() {
    return this.state.isLoading ? (
      <AppLoading />
    ) : (
      <Layout>
        <FirebaseAuth />
        <SideLayout value={this.state} onSelectChange={this.handleClick} />
        <Layout>
          <Header style={{ background: "#fff", padding: 10 }}>
            <h1>{this.state.data.area[this.state.select-1].name}</h1>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            <ContentLayout contentNum={this.state.select}/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default PageLayout;