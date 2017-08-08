import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import App from './components/App.jsx';

ReactDOM.render(
  (<MuiThemeProvider>
    <App />
  </MuiThemeProvider>),
  document.getElementById('app')
);
