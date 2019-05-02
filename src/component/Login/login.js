import React from "react";
import ReactDOM from "react-dom";
import { Button } from 'antd';
import Input from './Input'
import './login.css'
import firebaseAuth from '../Login/firebaseAuth'

class loginComp extends React.Component{
    constructor(props){
        super(props);

        this.state={
            phoneNum:''
        }
        this.handleChange= this.handleChange.bind(this);
        this.handleClick= this.handleClick.bind(this);
    }

    handleChange(phoneNum){
        this.setState({phoneNum: phoneNum});
    }

    handleClick(){
        firebaseAuth(this.state.phoneNum);
    }
 
    render(){
        return(    
            <div>
                <Input
                    value={this.state.phoneNum}
                    onPhoneNumChange={this.handleChange}
                />                
                <Button type="primary"
                    className="LoginButton"
                    onClick={this.handleClick}
                >Login</Button>
            </div>
        );
    };
}

export default loginComp;