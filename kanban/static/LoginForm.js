import React from 'react';

const FormTypes = {
  login: "login",
  createUser: "createUser"
}

class LoginForm extends React.Component {

  onUserAction(response) {
    const errorMessage = JSON.parse(response).error;
    document.getElementById("flashMessage").innerHTML = errorMessage;
    if(errorMessage === undefined) {
    //successful redirect
    this.context.router.push("http://localhost:3000/#/");
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
    if(this.props.className == FormTypes.login) {
      CreatedForm = <form method="post" id="loginForm" action="/login" onSubmit={(e)=> {this.formHandler = this.formHandler.bind(this); this.formHandler(e, 'login');}}>
        <input type="text" name="username" ref="username" placeholder="username"></input>
        <input type="password" name="password" ref="password" placeholder="password"></input>
        <button type="submit">Login</button>
      </form>
    } else {
      CreatedForm = <form method="post" id="loginForm" action="/users" onSubmit={(e)=> {this.formHandler = this.formHandler.bind(this); this.formHandler(e, 'users');}}>
        <input type="text" name="username" ref="username" placeholder="username"></input>
        <input type="password" name="password" ref="password" placeholder="password"></input>
        <button type="submit">Create Account</button>
      </form>
    }

    return(
      <div className={this.props.className}>
        <div id="flashMessage"></div>
        { CreatedForm }
      </div>
    )
  }
}

LoginForm.contextTypes = {
  router: React.PropTypes.object
}

export default LoginForm;