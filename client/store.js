import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
const middleware = applyMiddleware(loggerMiddleware, thunkMiddleware);
import socket from './socket';
import axios from 'axios';

const GOT_MESSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";
const WRITE_MESSAGE = "WRITE_MESSAGE";
const ADD_MESSAGE_TO_SERVER = "ADD_MESSAGE_TO_SERVER";
const FETCH_MESSAGES = "FETCH_MESSAGES";
const NAME_CHANGED = "NAME_CHANGED";

const initialState = {
  messages: [],
  currentMessage: '',
  name: ''
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
      // newState.currentMessage = '';
      break;
    case NAME_CHANGED:
      newState.name = action.name;
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

export function nameChange(name) {
  return {
    type: NAME_CHANGED,
    name: name
  };
}

export function fetchMessages() {
  return function thunk (dispatch) {
    axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => {
        dispatch(gotMessagesFromServer(messages));
      });
  };
}

export function postMessages(message) {
  return function thunk (dispatch) {
    axios.post(`/api/messages`, message)
    .then(response => {
      dispatch(addMessage(response.data));
      socket.emit('new-message', response.data);
    })
    .catch(console.error);
  };

}

const store = createStore(reducer, middleware);
export default store;
