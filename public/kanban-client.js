const status = {
  TO_DO: "TO DO",
  DOING: "DOING",
  DONE: "DONE"
}

class KanbanPage extends React.Component {
  constructor() {
    super();

    this.state = {
      data: []
    };

    this.onApiData = this.onApiData.bind(this);
  }

  onApiData(data) {
    const parsedKanbanData = JSON.parse(data.currentTarget.response).data;
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
        <NewTaskForm />
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

class KanbanHeader extends React.Component {
  render() {
    return (
      <div id="header">
        <h1>Kanban</h1>
      </div>
    )
  }
}

class NewTaskForm extends React.Component {
  render() {
    return (
      <div id="newTaskForm">
      <form method="post">
        <input type="text" name="title" placeholder="Title"></input>
        <input type="text" name="description" placeholder="Description"></input>
        <select name="priority">
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
        <select name="status">
          <option value="TO DO">TO DO</option>
          <option value="DOING">DOING</option>
          <option value="DONE">DONE</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      </div>
    )
  }
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

ReactDOM.render(
  <KanbanPage apiAddress="http://localhost:7000/api" />,
  document.getElementById("root")
);