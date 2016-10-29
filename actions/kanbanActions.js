export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const REMOVE_CARD = 'REMOVE_CARD';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const REMOVE_USER = 'REMOVE_USER';

export const receiveCards = (data) => {
  return {
    type: RECEIVE_CARDS,
    data
  }
}

export const removeCard = (index) => {
  return {
    type: REMOVE_CARD,
    index
  }
}

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export const removeUser = (index) => {
  return {
    type: REMOVE_USER,
    index
  }
}