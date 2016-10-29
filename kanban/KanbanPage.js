import React from 'react';
import {connect} from 'react-redux';
import {receiveCards, receiveUsers} from '../actions/kanbanActions.js'
import NewTaskForm from './NewTaskForm';
import KanbanQueue from './KanbanQueue';

class KanbanPage extends React.Component {
  constructor() {
    super();

    this.onApiData = this.onApiData.bind(this);
    this.onUserData = this.onUserData.bind(this);
  }

  onApiData(data) {
    const { dispatch } = this.props;
    const parsedKanbanData = JSON.parse(data.currentTarget.response).data;
    console.log("parsed data", parsedKanbanData);
    dispatch(receiveCards(parsedKanbanData));
  }

  onUserData(data) {
    const { dispatch } = this.props;
    const parsedUserData = JSON.parse(data.currentTarget.response).users;
    console.log("parsed data", parsedUserData);
    dispatch(receiveUsers(parsedUserData));
  }

  onApiError(error) {
    console.error("error:", error);
  }

  loadApiData(address, loadListener) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", loadListener);
    oReq.addEventListener("error", this.onApiError);
    oReq.open("GET", address);
    oReq.send();
  }

  componentWillMount() {
    this.loadApiData(this.props.apiAddress, this.onApiData);
    this.loadApiData("http://localhost:3000/users", this.onUserData);
  }

  render() {
    return (
      <div id="kanbanPage">
        <NewTaskForm
        />
        <div id="main">
          <KanbanQueue
            data={this.props.data}
            listType="TO_DO"
          />
          <KanbanQueue
            data={this.props.data}
            listType="DOING"
          />
          <KanbanQueue
            data={this.props.data}
            listType="DONE"
          />
        </div>
      </div>
    )
  }
}

KanbanPage.defaultProps = {
  data: React.PropTypes.array
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
)(KanbanPage);