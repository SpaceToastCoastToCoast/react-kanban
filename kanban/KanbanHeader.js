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
        <h1>Kanban</h1>
        <div>
          <ul role='nav' id="navbar">
            <li><Link to='/login'>{function(){
              if(this.props.login !== undefined) {
                return "Logout";
              } else {
                return "Login";
              }
            }.call(this)}</Link></li>
            <li><Link to='/newBoard'>New Board</Link></li>
            <li><Link to='/'>Main Board</Link></li>
            {function(){
              if (this.props.pathname !== '/login') {
                return <li><button onClick={this.revealNewPost}>New Task</button></li>
              }
            }.call(this)}
          </ul>
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