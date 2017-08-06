import React from 'react';
import fire from '../fire.js';

import TextInput from './TextInput.js';
import TextDisplay from './TextDisplay.js';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '', messages: [] };
    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({input: e.target.value});
  }
  addMessage(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.state.input );
    this.setState({input: ''});
  }
  componentDidMount() {
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(10);
    messagesRef.on('child_added', snap => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snap.val(), id: snap.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  render() {
    return (
      <div>
        <TextInput
          input={this.state.input}
          onChange={this.handleChange}
          onSubmit={this.addMessage}
        />
        <TextDisplay messages={this.state.messages} />
      </div>
    );
  }
  componentWillUnmount() {
    fire.database().ref().off();
  }
}

export default App;
