import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

const RouteWithAuth = (props) => {
  // Get the global login context
  const context = useContext(AuthContext);
  // Extract data from props
  const { component: Component, ...more } = props;

  return (
    // Return Route in form of:
    // <Route exact path="/somePath" component={SomeComponent} />
    <Route
      {...more}
      // The render creates the component from props
      render={(props) =>
        context.user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default RouteWithAuth;
