export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const logIn = (login) => {
  return {
    type: LOGIN,
    login: login.login,
    uid: login.uid,
    role: login.role
  }
}

export const logOut = (login) => {
  return {
    type: LOGOUT,
    login: login.login,
    uid: login.uid,
    role: login.role
  }
}