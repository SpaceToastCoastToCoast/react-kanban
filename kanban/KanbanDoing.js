import React from 'react';
import KanbanItem from './KanbanItem';

const status = {
  TO_DO: "TO DO",
  DOING: "DOING",
  DONE: "DONE"
}

class KanbanDoing extends React.Component {
  render() {
    const doingItems = this.props.data.filter((dataItem) => {
      return dataItem.status === status.DOING;
    }).map((doingItem) => {
      return (
        <KanbanItem
          title={doingItem.title}
          description={doingItem.description}
          priority={doingItem.priority}
          status={doingItem.status}
          createdBy={doingItem.creator_id}
          assignedTo={doingItem.assignee_id}
          key={doingItem.id}
          className="doing"
        />
      )
    })
    return (
      <div id="kanbanDoing" className="column">
        { doingItems }
      </div>
    )
  }
}

export default KanbanDoing;