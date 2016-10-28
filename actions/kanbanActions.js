export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const REMOVE_CARD = 'REMOVE_CARD';

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