import React from "react";
import "antd/dist/antd.css";
import "./index.css";

import * as firebase from "firebase/app";
import "firebase/auth";

import Login from "./component/Login/login";
import PageLayout from "./component/layout/PageLayout";
import AppLoading from "./component/common/AppLoading";

import firebaseData from "./firebaseService/database/firebaseData";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isSignedIn: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        firebaseData.setUser(user.email);
        this.setState({
          isSignedIn: true,
          isLoading: false
        });
      } else {
        // No user is signed in.
        this.setState({
          isSignedIn: false,
          isLoading: false
        });
      }
    });
  }

  render() {
    return this.state.isLoading ? (
      <AppLoading />
    ) : this.state.isSignedIn ? (
      <PageLayout />
    ) : (
      <Login />
    );
  }
}

export default App;
