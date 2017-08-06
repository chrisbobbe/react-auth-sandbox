import React from 'react';

export const TextDisplay = (props) => {
  return (
    <ul>
      { /* Render the list of messages */
        props.messages.map( message => <li key={message.id}>{message.text}</li> )
      }
    </ul>
  );
}

export default TextDisplay;
