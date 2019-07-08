import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import "antd/dist/antd.css";

import config from "./common/firebaseConfig"
import * as firebase from 'firebase/app';

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));