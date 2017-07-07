import { createStore } from "redux";
const GOT_MESSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";

const initialState = {
  messages: []
};

function reducer(prevState = initialState, action) {
  let newState = Object.assign({}, prevState);
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      newState.messages = action.messages;
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

const store = createStore(reducer);
export default store;
