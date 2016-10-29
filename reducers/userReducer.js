import { List } from 'immutable';
import { RECEIVE_USERS, REMOVE_USER } from '../actions/kanbanActions';

const initialState = List();

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case RECEIVE_USERS:
      if(action.users !== undefined) {
        return List(action.users);
      } else {
        return state;
      }
    case REMOVE_USER:
      return state.delete(action.index);
    default:
      return state;
  }
}

export default userReducer;