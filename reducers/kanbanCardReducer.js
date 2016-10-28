import { List } from 'immutable';
import { RECEIVE_CARDS, REMOVE_CARD } from '../actions/kanbanActions';

const initialState = List();

const kanbanCardReducer = (state = initialState, action) => {
  switch(action.type) {
    case RECEIVE_CARDS:
      if(action.data !== undefined) {
        return List(action.data);
      } else {
        return state;
      }
    case REMOVE_CARD:
      return state.delete(action.index);
    default:
      return state;
  }
}

export default kanbanCardReducer;