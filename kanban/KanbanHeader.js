import React from 'react';

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
          <button onClick={this.revealNewPost}>New Task</button>
        </div>
      </div>
    )
  }
}

export default KanbanHeader;