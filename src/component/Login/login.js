import React from "react";
import Input from './Input'
import './login.css'
import {Layout} from 'antd';
import FirebaseAuth from '../Login/firebaseAuth'

class loginComp extends React.Component{
    constructor(props){
        super(props);

        this.state={
            phoneNum:'',
            user:''
        }
        this.handleChange= this.handleChange.bind(this);
        this.userChanger= this.userChanger.bind(this);
    }

    handleChange(phoneNum){
        this.setState({phoneNum: phoneNum});
    }

    userChanger(_user){
        this.setState({user:_user});
    }
 
    render(){
        return(    
            <Layout>
                <Input
                    value={this.state.phoneNum}
                    onPhoneNumChange={this.handleChange}
                />                
                <FirebaseAuth
                    onUserChange={this.userChanger}/>
            </Layout>
        );
    };
}

export default loginComp;