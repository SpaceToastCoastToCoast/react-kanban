import React from 'react';
import ReactDOM from 'react-dom';
console.log('before kanbanclient');
import KanbanClient from './kanban/KanbanClient.js';
console.log('after kanbanclient');

ReactDOM.render(
  <KanbanClient />,
  document.getElementById("root")
);