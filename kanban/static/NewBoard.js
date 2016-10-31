import React from 'react';
import {connect} from 'react-redux';
import KanbanPage from '../KanbanPage';

class NewBoard extends React.Component {
  renderNewPage() {
    if(this.props.uid !== undefined) {
      return (<KanbanPage apiAddress={`http://localhost:3000/api/userBoards/${this.props.uid}`} />)
    } else {
      return (<KanbanPage apiAddress={`http://localhost:3000/api/userBoards/1`} />)
    }

  }

  render() {
    let newPage = this.renderNewPage.bind(this);
    return(
      <div>
        <div id="subheader">
          <h1>New Board</h1>
        </div>
        {newPage()}
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
)(NewBoard);