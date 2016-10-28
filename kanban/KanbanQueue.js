import React from 'react';
import {connect} from 'react-redux';
import KanbanItem from './KanbanItem';

class KanbanQueue extends React.Component {
  render() {
    let queueName;
    switch(this.props.listType) {
      case 'TO_DO':
      queueName = <h2>To Do</h2>;
      break;
      case 'DOING':
      queueName = <h2>Doing</h2>;
      break;
      case 'DONE':
      queueName = <h2>Done</h2>;
      break;
      default: break;
    }
    const queueItems = this.props.data.filter((dataItem) => {
      return dataItem.status === this.props.listType;
    }).map((queueItem) => {
      return (
        <KanbanItem
          title={queueItem.title}
          description={queueItem.description}
          priority={queueItem.priority}
          status={queueItem.status}
          createdBy={queueItem.creator_id}
          assignedTo={queueItem.assignee_id}
          key={queueItem.id}
          itemId={queueItem.id}
          postTo={this.props.postTo}
          apiAddress={this.props.apiAddress}
          className={this.props.listType}
        />
      )
    })
    return (
      <div id="kanbanQueue" className="column">
        { queueName }
        { queueItems }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {kanbanCardReducer} = state;
  return {
    data: kanbanCardReducer.toJS()
  }
}

export default connect(
  mapStateToProps
)(KanbanQueue);