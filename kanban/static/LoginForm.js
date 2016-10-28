import React from 'react';

const FormTypes = {
  login: "login",
  createUser: "createUser"
}

class LoginForm extends React.Component {

  onUserAction(response) {
    console.log(response.currentTarget.response);
    const errorMessage = JSON.parse(response.currentTarget.response).error;
    const loginMessage = JSON.parse(response.currentTarget.response).login;
    document.getElementById("flashMessage").innerHTML = errorMessage;
    if(errorMessage === undefined) {
    //successful redirect
      if(loginMessage !== undefined) {
        this.context.router.push("http://localhost:3000/#/");
      }
    }
  }

  formHandler(e, location) {
    e.preventDefault();
    console.log(this.props);
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

    if(this.props.username !== undefined) {
      loggedInBlock = <p>Logged in as {this.props.username} <button>Logout</button></p>
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

export default LoginForm;