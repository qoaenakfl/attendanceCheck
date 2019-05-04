import React from "react";
import Input from './Input'
import './login.css'
import {Layout} from 'antd';
import FirebaseAuth from '../common/firebaseAuth'

class loginComp extends React.Component{
    constructor(props){
        super(props);

        this.state={
            phoneNum:'',
        }
        this.handleChange= this.handleChange.bind(this);
        this.userChange= this.userChange.bind(this);
    }

    handleChange(phoneNum){
        this.setState({phoneNum: phoneNum});
    }

    userChange(_user){
        this.props.userLogin(_user);
    }
 
    render(){
        return(    
            <Layout>
                <Input
                    value={this.state.phoneNum}
                    onPhoneNumChange={this.handleChange}
                />                
                <FirebaseAuth
                    userLogin={this.userChange}
                    user={this.props.user}
                />
            </Layout>
        );
    };
}

export default loginComp;