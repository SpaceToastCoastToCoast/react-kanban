import React from 'react';
import KanbanPage from './KanbanPage';

class KanbanClient extends React.Component {
  render() {
    return (
      <div>
        <KanbanPage apiAddress="http://localhost:3000/api" />
      </div>
    )
  }
}

export default KanbanClient;