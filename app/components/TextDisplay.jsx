import React, {PropTypes} from 'react';

import List, {ListItem} from 'material-ui/List';

const TextDisplay = ({
  messages
}) => {
  return (
    <List>
      { /* Render the list of messages */
        messages.map( (message) => <ListItem key={message.id} primaryText={message.text} />)
      }
    </List>
  );
}

TextDisplay.propTypes = {
  messages: PropTypes.array
};

export default TextDisplay;
