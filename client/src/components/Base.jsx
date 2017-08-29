import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import Auth from '../modules/Auth.js'

import PrivateRoute from '../containers/PrivateRoute.jsx';
import PublicRoute from '../containers/PublicRoute.jsx';

import HomePage from './HomePage.jsx';
import LoginPage from '../containers/LoginPage.jsx';
import SignUpPage from '../containers/SignUpPage.jsx';
import DashboardPage from '../containers/DashboardPage.jsx';

const Base = () => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/">React App</Link>
      </div>
      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
          <Link to="/logout">Log out</Link>
        </div>
      ) : (
        <div className="top-bar-right">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}
      <Switch>
        <PublicRoute exact path='/login' component={LoginPage} authenticated={Auth.isUserAuthenticated()} />
        <PublicRoute exact path='/signup' component={SignUpPage} authenticated={Auth.isUserAuthenticated()} />
        <PrivateRoute exact path='/dashboard' component={DashboardPage} authenticated={Auth.isUserAuthenticated()} />
        <PrivateRoute exact path='/logout'
          component={() => {
            Auth.deauthenticateUser();
            return (
              <Redirect to="/" replace />
            );
          }}
          authenticated={Auth.isUserAuthenticated()}
        />
        <Route exact path='/' component={HomePage} />
      </Switch>
    </div>
  </div>
);

export default Base;
