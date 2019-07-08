import React from "react;
import "./Login.css";
import { Layout } from "antd";
import FirebaseLogin from "./FirebaseLogin";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = phoneNum => {
    this.setState({ phoneNum: phoneNum });
  };

  userChange = user => {
    this.props.userLogin(user);
  };

  render() {
    return (
      <Layout>
        <FirebaseLogin />
      </Layout>
    );
  }
}

export default Login;
