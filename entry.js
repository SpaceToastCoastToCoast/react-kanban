import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import App from './App.js';
import NewBoard from './kanban/static/NewBoard.js';
import Login from './kanban/static/Login.js';
import KanbanClient from './kanban/KanbanClient.js';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory} >
      <Route path='/' component={App} >
        <IndexRoute component={KanbanClient} />
        <Route path='/newBoard' component={NewBoard} />
        <Route path='/login' component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);