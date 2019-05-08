import React from "react";
import './login.css'
import {Layout} from 'antd';
import FirebaseLogin from './firebaseAuth'

class loginComp extends React.Component{
    constructor(props){
        super(props);
    }

    handleChange= (phoneNum) =>{
        this.setState({phoneNum: phoneNum});
    }

    userChange= (_user) =>{
        this.props.userLogin(_user);
    }
 
    render(){
        return(    
            <Layout>           
                <FirebaseLogin
                />
            </Layout>
        );
    };
}

export default loginComp;