import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import decode from "jwt-decode";
const AUTH = localStorage.getItem("userToken");

if (AUTH) {
  var decoded = decode(AUTH);
  if (decoded) {
    localStorage.setItem("email", decoded.email);
    localStorage.setItem("_id", decoded._id);
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AUTH ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: {
              from: props.location,
            },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
