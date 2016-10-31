import React from 'react';
import {connect} from 'react-redux';
import {logIn, logOut} from '../../actions/loginActions.js'

const FormTypes = {
  login: "login",
  createUser: "createUser"
}

class LoginForm extends React.Component {

  onUserAction(response) {
    const { dispatch } = this.props;
    let errorMessage = JSON.parse(response.currentTarget.response).error;
    if(errorMessage === undefined) {
      errorMessage = "";
    }
    const loginMessage = JSON.parse(response.currentTarget.response);
    document.getElementById("flashMessage").innerHTML = errorMessage;
    if(errorMessage === undefined || errorMessage === "") {
    //successful redirect
      if(loginMessage !== undefined) {
        this.context.router.push("/");
        dispatch(logIn(loginMessage));
      } else {
        dispatch(logOut(loginMessage));
      }
    }
  }

  logOutButton() {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onUserAction.bind(this));
    oReq.open("GET", 'http://localhost:3000/logout');
    oReq.send();
  }

  formHandler(e, location) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onUserAction.bind(this));
    oReq.open("POST", `http://localhost:3000/${location}`);
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`username=${this.refs.username.value}&password=${this.refs.password.value}`);
  }

  render() {
    let CreatedForm;
    let FormTitle;
    let loggedInBlock;

    if(this.props.login !== undefined) {
      loggedInBlock = <p>Logged in as {this.props.login} <button onClick={()=> {this.logOutButton = this.logOutButton.bind(this); this.logOutButton();}}>Logout</button></p>
    } else {
      loggedInBlock = <p>Not logged in</p>
    }

    if(this.props.className == FormTypes.login) {
      FormTitle = "Log In";
      CreatedForm = <form method="post" className="loginForm" action="/login" onSubmit={(e)=> {this.formHandler = this.formHandler.bind(this); this.formHandler(e, 'login');}}>
        <input type="text" name="username" ref="username" placeholder="username"></input>
        <input type="password" name="password" ref="password" placeholder="password"></input>
        <button type="submit">Login</button>
      </form>
    } else {
      FormTitle = "Create Account";
      CreatedForm = <form method="post" className="loginForm" action="/users" onSubmit={(e)=> {this.formHandler = this.formHandler.bind(this); this.formHandler(e, 'users');}}>
        <input type="text" name="username" ref="username" placeholder="username"></input>
        <input type="password" name="password" ref="password" placeholder="password"></input>
        <button type="submit">Create Account</button>
      </form>
    }

    return(
      <div className={this.props.className}>
        <h2>{ FormTitle }</h2>
        <div id="flashMessage"></div>
        { loggedInBlock }
        { CreatedForm }
      </div>
    )
  }
}

LoginForm.contextTypes = {
  router: React.PropTypes.object
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
)(LoginForm);