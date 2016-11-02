import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class KanbanHeader extends React.Component {
  revealNewPost() {
    let newPost = document.getElementById("newTaskForm");
    if(newPost.style.top === "48px") {
      newPost.style.top = "-400px";
    } else {
      newPost.style.top = "48px";
    }
  }

  render() {
    return (
      <div id="header">
        <div id="headerContainer">
          <h1>Kanban</h1>
          <div>
            <ul role='nav' id="navbar">
              <li><Link to='/loginPage'>{function(){
                if(this.props.login !== undefined) {
                  return "Logout";
                } else {
                  return "Login";
                }
              }.call(this)}</Link></li>
              {function(){
                if(this.props.login !== undefined) {
                  return <li><Link to='/userBoard'>Your Board</Link></li>
                }
              }.call(this)}
              <li><Link to='/'>Main Board</Link></li>
              {function(){
                if (this.props.pathname !== '/loginPage' && this.props.login !== undefined) {
                  return <li><button onClick={this.revealNewPost}>New Task</button></li>
                }
              }.call(this)}
            </ul>
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
)(KanbanHeader);