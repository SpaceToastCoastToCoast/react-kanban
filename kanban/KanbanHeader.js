import React from 'react';
import {Link} from 'react-router';

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
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/newBoard'>New Board</Link></li>
            <li><Link to='/'>Main Board</Link></li>
            <li><button onClick={this.revealNewPost}>New Task</button></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default KanbanHeader;