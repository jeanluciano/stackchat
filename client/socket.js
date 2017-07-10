import io from 'socket.io-client';
import store, {addMessage} from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');
});

socket.on('new-message', (message) => {
  store.dispatch(addMessage(message));
});

export default socket;
