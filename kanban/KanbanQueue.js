import React from 'react';
import KanbanItem from './KanbanItem';

const status = {
  TO_DO: "TO DO",
  DOING: "DOING",
  DONE: "DONE"
}

class KanbanQueue extends React.Component {
  render() {
    const queueItems = this.props.data.filter((dataItem) => {
      return dataItem.status === status.TO_DO;
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
          className="toDo"
        />
      )
    })
    return (
      <div id="kanbanQueue" className="column">
        { queueItems }
      </div>
    )
  }
}

export default KanbanQueue;