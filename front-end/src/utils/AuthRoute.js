import React, { Component, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

const AuthRoute = ({ component: CompositionEvent, ...rest }) => {
  const context = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        context.user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
