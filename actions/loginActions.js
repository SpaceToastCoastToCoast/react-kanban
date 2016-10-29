export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const logIn = (login) => {
  return {
    type: LOGIN,
    login
  }
}

export const logOut = (login) => {
  return {
    type: LOGOUT,
    login
  }
}