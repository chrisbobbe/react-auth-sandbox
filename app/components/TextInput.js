import React from 'react';

export const TextInput = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <input type="text" value={props.input} onChange={props.onChange} />
      <input type="submit"/>
    </form>
  );
}

export default TextInput;
