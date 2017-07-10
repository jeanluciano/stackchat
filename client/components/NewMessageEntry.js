import React, { Component } from 'react';
import store, {addMessage, writeMessage, postMessages} from '../store';
import socket from '../socket';

export default class NewMessageEntry extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState();
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {

    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  submitHandler(form) {
    form.preventDefault();
    const channelId = this.props.channel;
    const message = {content: this.state.currentMessage, channelId: channelId, name: this.state.name};
    console.log('messageeeeeeeeeee', message);
    console.log('name', message.name);
    store.dispatch(postMessages(message));
    store.dispatch(writeMessage(''));

  }

  changeHandler(input) {
    // console.log('target value', input.target.value);
    store.dispatch(writeMessage(input.target.value));
  }


  render () {
    return (
      <form id="new-message-form" onSubmit = {this.submitHandler}>
        <div className="input-group input-group-lg">
          <input
            value = {this.state.currentMessage}
            onChange = {this.changeHandler}
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}

