import React, { Component } from 'react';
import store, { nameChange } from '../store';

class NameEntry extends Component {

  constructor() {
    super();
    this.state = store.getState();
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  changeHandler(input) {
    store.dispatch(nameChange(input.target.value));
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render() {

    return (
      <form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input
          value = {this.state.name}
          onChange = {this.changeHandler}
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
        />
      </form>
    );
  }

}


export default NameEntry
