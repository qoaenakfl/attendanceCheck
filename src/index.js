import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";

import Login from "./component/Login/login";
import Layout from './component/layout/layout'

class App extends React.Component {
    constructor(props){
        super(props)
    }

  render() {
    if(false){
        return (<Layout/>)
    }else{
        return (<Login/>);
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));