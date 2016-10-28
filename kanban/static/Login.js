import React from 'react';
import LoginForm from './LoginForm';

class Login extends React.Component {
  render() {
    return(
      <div>
        <div id="subheader">
          <h1>Login</h1>
        </div>
        <div id="main">
          <div id="formContainer">
            <LoginForm className="login" />
            <LoginForm className="createUser" />
          </div>
        </div>
      </div>
    )
  }
}

export default Login;