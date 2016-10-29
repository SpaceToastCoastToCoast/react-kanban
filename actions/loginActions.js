export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const logIn = (login) => {
  console.log("hit loginAction");
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