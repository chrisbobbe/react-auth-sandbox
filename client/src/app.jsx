import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Switch } from 'react-router-dom';
import history from './history.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDOM.render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={history}>
      <Route path='/' component={Base} />
    </Router>
  </MuiThemeProvider>
),
document.getElementById('react-app')
);
