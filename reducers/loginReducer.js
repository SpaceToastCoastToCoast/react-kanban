import { Map } from 'immutable';
import { LOGIN, LOGOUT } from '../actions/loginActions';

const initialState = Map({"login": undefined, "uid": undefined, "role": undefined});

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN:
      if(action.login !== undefined) {
        let newState = Map({
            "login": action.login,
            "uid": action.uid,
            "role": action.role
          });
        return newState;
      } else {
        return state;
      }
    case LOGOUT:
      return Map({"login": undefined, "uid": undefined, "role": undefined});
    default:
      return state;
  }
}

export default loginReducer;