import React, {Component} from 'react';
import fire from '../fire.js';

import TextInput from './TextInput.jsx';
import TextDisplay from './TextDisplay.jsx';

import Card from 'material-ui/Card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '', messages: [] };
    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /* Event handlers */

  handleChange(e) {
    this.setState({input: e.target.value});
  }
  addMessage(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.state.input );
    this.setState({input: ''});
  }

  /* Lifecycle methods */

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
      <Card>
        <TextInput
          input={this.state.input}
          onChange={this.handleChange}
          onSubmit={this.addMessage}
        />
        <TextDisplay messages={this.state.messages} />
      </Card>
    );
  }
  componentWillUnmount() {
    fire.database().ref().off();
  }
}

export default App;
