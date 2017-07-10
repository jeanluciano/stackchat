import { createStore } from "redux";
const GOT_MESSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";
const WRITE_MESSAGE = "WRITE_MESSAGE";
const ADD_MESSAGE_TO_SERVER = "ADD_MESSAGE_TO_SERVER";

const initialState = {
  messages: [],
  currentMessage: ''
};

function reducer(prevState = initialState, action) {
  let newState = Object.assign({}, prevState);
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      newState.messages = action.messages;
      break;
    case WRITE_MESSAGE: 
      newState.currentMessage = action.message;
      break;
    case ADD_MESSAGE_TO_SERVER:
      newState.messages = [...newState.messages, action.message];
      newState.currentMessage = '';
      break;
    default:
      return prevState;
  }
  return newState;
}


export function gotMessagesFromServer(messages) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messages
  };
}

export function writeMessage(message) {
  return {
    type: WRITE_MESSAGE,
    message: message
  };
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE_TO_SERVER,
    message: message
  };
}

const store = createStore(reducer);
export default store;
