import React from 'react';
import {receiveCards} from '../actions/kanbanActions.js'
import {connect} from 'react-redux';

class KanbanItem extends React.Component {
  changeProperty(prop) {
    switch(prop) {
      case '3 LOW':
      return '2 MEDIUM';
      case '2 MEDIUM':
      return '1 HIGH';
      case '1 HIGH':
      return '3 LOW';
      case 'TO_DO':
      return 'DOING';
      case 'DOING':
      return 'DONE';
      case 'DONE':
      return 'TO_DO';
      default:
      return prop;
    }
  }

  onApiData(data) {
    const { dispatch } = this.props;
    const parsedKanbanData = JSON.parse(data.currentTarget.response).data;
    console.log("parsed data", parsedKanbanData);
    dispatch(receiveCards(parsedKanbanData));
  }

  updatePriority(e, props) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onApiData.bind(this));
    oReq.open("PUT", `http://localhost:3000/api/${this.props.itemId}`);
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`priority=${this.changeProperty(this.props.priority)}`);
  }

  updateStatus(e, props) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onApiData.bind(this));
    oReq.open("PUT", `http://localhost:3000/api/${this.props.itemId}`);
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`status=${this.changeProperty(this.props.status)}`);
  }

  render() {
    this.updatePriority = this.updatePriority.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    return (
      <div className={`${this.props.className} ${this.props.priority} kanbanItem`}>
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <p>Priority: {this.props.priority} <button onClick={(e) => {this.updatePriority(e)}}>Update</button></p>
        <p>Status: {this.props.status} <button onClick={(e) => {this.updateStatus(e)}}>Update</button></p>
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
)(KanbanItem);