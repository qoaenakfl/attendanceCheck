import React from "react";
import firebase from "firebase"
import firebaseui from "firebaseui"
import config from "../common/firebaseConfig"

let first = true;

function firebaseAuth(phoneNum){
    if(phoneNum.length !=11){
        return;
    }
    
    if(first){
        firebase.initializeApp(config);
        firebase.auth().useDeviceLanguage();
        first = false;
    }
}

export default firebaseAuth;