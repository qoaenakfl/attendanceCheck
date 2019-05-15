import React from "react";
import { Button } from "antd";

import * as firebase from "firebase/app";
import "firebase/auth";

import firebaseData from "../database/firebaseData";

import { popErrorModal } from "../../common/popup";

const provider = new firebase.auth.GoogleAuthProvider();

class firebaseAuth extends React.Component {
  signInWithGoogle = () => {
    const _this = this;
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => firebaseData.authLogin(result.user.email))
      .then(e => {
        if (e) {
          throw {
            code: "emailError"
          };
        }
      })
      .catch(function(error) {
        // Handle Errors here.
        switch (error.code) {
          case "emailError":
            _this.signOut();
            popErrorModal("로그인 에러", "비활성화된 이메일 계정입니다.");
        }
        // The email of the user's account used.
        console.dir(error);
        return;
      });
  };

  signOut = () => {
    try {
      firebase
        .auth()
        .signOut()
        .then(function() {
          firebaseData.logout();
        })
        .catch(function(error) {
          // An error happened.
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="App">
        {firebase.auth().currentUser ? (
          <Button onClick={this.signOut}>Sign out</Button>
        ) : (
          <Button onClick={this.signInWithGoogle}>Sign in with Google</Button>
        )}
      </div>
    );
  }
}

export default firebaseAuth;
