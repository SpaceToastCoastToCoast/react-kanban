import { Map } from 'immutable';
import { LOGIN, LOGOUT } from '../actions/loginActions';

const initialState = Map({"login": undefined});

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN:
      if(action.login !== undefined) {
        return Map({"login": action.login});
      } else {
        return state;
      }
    case LOGOUT:
      return Map({"login": undefined});
    default:
      return state;
  }
}

export default loginReducer;