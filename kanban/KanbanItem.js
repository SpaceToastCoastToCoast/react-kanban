import React from 'react';

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

  updatePriority(e, props) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', props.postTo);
    oReq.open("PUT", `${props.apiAddress}/${props.itemId}`);
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`priority=${this.changeProperty(props.priority)}`);
  }

  updateStatus(e, props) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', props.postTo);
    oReq.open("PUT", `${props.apiAddress}/${props.itemId}`);
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`status=${this.changeProperty(props.status)}`);
  }

  render() {
    return (
      <div className={`${this.props.className} ${this.props.priority} kanbanItem`}>
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <p>Priority: {this.props.priority} <button onClick={(e, props) => {this.updatePriority(e, this.props)}}>Update</button></p>
        <p>Status: {this.props.status} <button onClick={(e, props) => {this.updateStatus(e, this.props)}}>Update</button></p>
      </div>
    )
  }
}

export default KanbanItem;