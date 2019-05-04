import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";

import Login from "./component/Login/login";
import Layout from './component/layout/layout'

class App extends React.Component {
  constructor(props){
    super(props);

    const user= JSON.parse(window.sessionStorage.getItem('user'));
    this.state={
        user: user
    }
    this.userChange= this.userChange.bind(this);
  }

  userChange(_user){
    this.setState({user:_user});
  }

  render() {
    if(this.state.user){
        return (
        <Layout
          userLogin={this.userChange}
          user={this.state.user}
        />)
    }else{
        return (
        <Login
          userLogin={this.userChange}
          user={this.state.user}
        />);
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));