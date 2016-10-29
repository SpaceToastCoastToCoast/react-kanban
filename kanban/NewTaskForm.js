import React from 'react';
import {connect} from 'react-redux';
import {receiveCards} from '../actions/kanbanActions.js'
import KanbanPage from './KanbanPage';

class NewTaskForm extends React.Component {
  onApiData(data) {
    const { dispatch } = this.props;
    const parsedKanbanData = JSON.parse(data.currentTarget.response).data;
    console.log("parsed data", parsedKanbanData);
    dispatch(receiveCards(parsedKanbanData));
  }

  formHandler(e) {
    e.preventDefault();
    console.log(this.props);
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onApiData.bind(this));
    oReq.open("POST", "http://localhost:3000/api");
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`title=${this.refs.title.value}&description=${this.refs.description.value}&priority=${this.refs.priority.value}&status=TO_DO&assignee_id=${this.refs.assignee_id.value}`);
  }

  render() {
    const assignees = this.props.users.map((dataItem, index) => {
      return (
        <option key={index} value={dataItem.uid}>Assign: {dataItem.username}</option>
      )
    })
    return (
      <div id="newTaskForm">
      <form method="post" id="taskForm" action="/api" onSubmit={(e)=> {this.formHandler = this.formHandler.bind(this); this.formHandler(e);}}>
        <input type="text" name="title" ref="title" placeholder="Title"></input>
        <input type="text" name="description" ref="description" placeholder="Description"></input>
        <select name="priority" ref="priority">
          <option value="3 LOW">LOW</option>
          <option value="2 MEDIUM">MEDIUM</option>
          <option value="1 HIGH">HIGH</option>
        </select>
        <select name="assignee_id" ref="assignee_id">
          { assignees }
        </select>
        <button type="submit">Submit</button>
      </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {kanbanCardReducer, loginReducer, userReducer} = state;
  return {
    data: kanbanCardReducer.toJS(),
    login: loginReducer.toJS().login,
    userID: loginReducer.toJS().uid,
    role: loginReducer.toJS().role,
    users: userReducer.toJS()
  }
}

export default connect(
  mapStateToProps
)(NewTaskForm);