import React from 'react';
import KanbanItem from './KanbanItem';

const status = {
  TO_DO: "TO DO",
  DOING: "DOING",
  DONE: "DONE"
}

class KanbanDone extends React.Component {
  render() {
    const doneItems = this.props.data.filter((dataItem) => {
      return dataItem.status === status.DONE;
    }).map((doneItem) => {
      return (
        <KanbanItem
          title={doneItem.title}
          description={doneItem.description}
          priority={doneItem.priority}
          status={doneItem.status}
          createdBy={doneItem.creator_id}
          assignedTo={doneItem.assignee_id}
          key={doneItem.id}
          className="done"
        />
      )
    })
    return (
      <div id="kanbanDone" className="column">
        { doneItems }
      </div>
    )
  }
}

export default KanbanDone;