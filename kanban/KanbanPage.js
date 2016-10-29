import React from 'react';
import {connect} from 'react-redux';
import {receiveCards} from '../actions/kanbanActions.js'
import NewTaskForm from './NewTaskForm';
import KanbanQueue from './KanbanQueue';

class KanbanPage extends React.Component {
  constructor() {
    super();

    this.onApiData = this.onApiData.bind(this);
  }

  onApiData(data) {
    const { dispatch } = this.props;
    const parsedKanbanData = JSON.parse(data.currentTarget.response).data;
    console.log("parsed data", parsedKanbanData);
    dispatch(receiveCards(parsedKanbanData));
  }

  onApiError(error) {
    console.error("error:", error);
  }

  loadApiData() {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", this.onApiData);
    oReq.addEventListener("error", this.onApiError);
    oReq.open("GET", this.props.apiAddress);
    oReq.send();
  }

  componentWillMount() {
    this.loadApiData();
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