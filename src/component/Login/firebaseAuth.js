import React from "react";
import { Button } from 'antd';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import config from "../common/firebaseConfig"

firebase.initializeApp(config);
const provider = new firebase.auth.GoogleAuthProvider();
const auth= firebase.auth();

class firebaseAuth extends React.Component{
    
    constructor(props){
        super(props);

        this.signInWithGoogle= this.signInWithGoogle.bind(this);
        this.signOut= this.signOut.bind(this);
    }

    signInWithGoogle(){
        let _this=this;
        auth.signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...

            console.dir(error);
            return;
          });
    }

    signOut(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
        // An error happened.
        });
    }
    
    render(){
        const user= this.props.value;
        return(            
            <div className="App">
                {
                    user
                    ? <p>Hello, {user.displayName}</p>
                    : <p>Please sign in.</p>
                }
                {
                    user
                    ? <Button onClick={this.signOut}>Sign out</Button>
                    : <Button onClick={this.signInWithGoogle}>Sign in with Google</Button>
                }
            </div>
        );
    }
}

export default firebaseAuth;