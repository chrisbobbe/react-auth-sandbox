import React, {PropTypes} from 'react';

import TextField from 'material-ui/TextField';

const TextInput = ({
  input,
  onChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField type="text" value={input} onChange={onChange} />
      <TextField type="submit"/>
    </form>
  );
}

TextInput.propTypes = {
  input: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default TextInput;
