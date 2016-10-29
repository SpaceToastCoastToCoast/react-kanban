import React from 'react';
import {connect} from 'react-redux';
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

const mapStateToProps = (state, ownProps) => {
  const {kanbanCardReducer, loginReducer} = state;
  return {
    data: kanbanCardReducer.toJS(),
    login: loginReducer.toJS().login,
    role: loginReducer.toJS().role,
    uid: loginReducer.toJS().uid
  }
}

export default connect(
  mapStateToProps
)(Login);