import React from 'react';

class KanbanHeader extends React.Component {
  revealNewPost() {
    let newPost = document.getElementById("newTaskForm");
    newPost.style.display = "block";
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