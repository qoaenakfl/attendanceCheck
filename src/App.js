import React from "react";
import "antd/dist/antd.css";
import "./index.css";

import * as firebase from 'firebase/app';
import 'firebase/auth';

import Login from "./component/Login/login";
import Layout from './component/layout/layout'
import AppLoading from './component/common/AppLoading'

class App extends React.Component {
    constructor(props){
      super(props)

      console.dir(firebase.auth().currentUser);
      this.state = {
        isLoading: true,
        isSignedIn: false
      };
    }
  
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            // User is signed in
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
    return(
        <div>
        {
            this.state.isLoading ? 
                (<AppLoading/>):
                this.state.isSignedIn? (<Layout/>):(<Login/>)
        }            
        </div>
    );
  }
}

export default App;