import React from 'react';
import KanbanHeader from './KanbanHeader';
import NewTaskForm from './NewTaskForm';
import KanbanQueue from './KanbanQueue';
import KanbanDoing from './KanbanDoing';
import KanbanDone from './KanbanDone';

class KanbanPage extends React.Component {
  constructor() {
    super();

    this.state = {
      data: []
    };

    this.onApiData = this.onApiData.bind(this);

    this.postAction = this.loadApiData.bind(this);
  }

  onApiData(data) {
    const parsedKanbanData = JSON.parse(data.currentTarget.response).data;
    console.log("parsed data", parsedKanbanData);
    this.setState({data: parsedKanbanData});
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
        <KanbanHeader />
        <NewTaskForm
        postTo={this.postAction}
        apiAddress={this.props.apiAddress}
        />
        <div id="main">
          <KanbanQueue data={this.state.data} />
          <KanbanDoing data={this.state.data} />
          <KanbanDone data={this.state.data} />
        </div>
      </div>
    )
  }
}

KanbanPage.defaultProps = {
  data: []
}

KanbanPage.defaultProps = {
  data: React.PropTypes.array
}

export default KanbanPage;