import React from 'react';

import KanbanHeader from './kanban/KanbanHeader';

class App extends React.Component {
  render() {
    return (
      <div>
        <KanbanHeader pathname={this.props.location.pathname}/>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App;