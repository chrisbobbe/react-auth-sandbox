import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  authenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} render={(props) => {
    return (
      authenticated ?
        (<Component {...props} />) :
        (<Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}
          push
        />)
    )
  }} />
);

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};

export default PrivateRoute;
