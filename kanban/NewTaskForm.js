import React from 'react';
import KanbanPage from './KanbanPage';

class NewTaskForm extends React.Component {

  formHandler(e, props) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', props.postTo);
    oReq.open("POST", props.apiAddress);
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`title=${this.refs.title.value}&description=${this.refs.description.value}&priority=${this.refs.priority.value}&status=${this.refs.status.value}`);
  }

  render() {
    return (
      <div id="newTaskForm">
      <form method="post" id="taskForm" action="/api" onSubmit={(e, props)=> {this.formHandler(e, this.props)}}>
        <input type="text" name="title" ref="title" placeholder="Title"></input>
        <input type="text" name="description" ref="description" placeholder="Description"></input>
        <select name="priority" ref="priority">
          <option value="3 LOW">LOW</option>
          <option value="2 MEDIUM">MEDIUM</option>
          <option value="1 HIGH">HIGH</option>
        </select>
        <select name="status" ref="status">
          <option value="TO DO">TO DO</option>
          <option value="DOING">DOING</option>
          <option value="DONE">DONE</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      </div>
    )
  }
}

export default NewTaskForm;