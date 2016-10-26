import React from 'react';

class KanbanItem extends React.Component {
  render() {
    return (
      <div className={`${this.props.className} ${this.props.priority} kanbanItem`}>
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <p>Priority: {this.props.priority}</p>
        <p>Status: {this.props.status}</p>
      </div>
    )
  }
}

export default KanbanItem;