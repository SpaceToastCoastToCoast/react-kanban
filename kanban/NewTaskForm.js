import React from 'react';
import {connect} from 'react-redux';
import {receiveCards} from '../actions/kanbanActions.js'
import KanbanPage from './KanbanPage';

class NewTaskForm extends React.Component {
  onApiData(data) {
    const { dispatch } = this.props;
    const parsedKanbanData = JSON.parse(data.currentTarget.response).data;
    let errorMessage = JSON.parse(data.currentTarget.response).error;
    if(errorMessage === undefined) {
      errorMessage = "";
      dispatch(receiveCards(parsedKanbanData));
    }
    document.getElementById("formError").innerHTML = errorMessage;
  }

  formHandler(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onApiData.bind(this));
    oReq.open("POST", `${this.props.apiAddress}`);
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`title=${this.refs.title.value}&description=${this.refs.description.value}&priority=${this.refs.priority.value}&status=TO_DO&creator_id=${this.props.userID}&assignee_id=${this.refs.assignee_id.value}`);
  }

  render() {
    const assignees = this.props.users.map((dataItem, index) => {
      return (
        <option key={index} value={dataItem.id}>Assign: {dataItem.username}</option>
      )
    })
    return (
      <div id="newTaskForm">
        <div id="formError">
        </div>
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