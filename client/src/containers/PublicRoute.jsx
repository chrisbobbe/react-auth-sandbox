import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
  authenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} render={(props) => {
    return (
      !authenticated ?
        (<Component {...props} />) :
        (<Redirect to={{
          pathname: '/dashboard',
          state: { from: props.location }
        }}
          push
        />)
    )
  }} />
);

PublicRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};

export default PublicRoute;
