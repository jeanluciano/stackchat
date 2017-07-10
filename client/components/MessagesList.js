import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import store, {gotMessagesFromServer} from '../store';

export default class MessagesList extends Component {

  constructor () {
    super();
    this.state = store.getState();
    this.unsubscribe = () => {};
  }

  componentDidMount () {
    axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => {
        store.dispatch(gotMessagesFromServer(messages));
      });

    this.unsubscribe = store.subscribe(() => {
     return this.setState(store.getState());
    });

  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render () {

    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry channel={channelId}/>
      </div>
    );
  }
}
