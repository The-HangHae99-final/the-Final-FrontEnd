import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ component: Component, hasWorkspace, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        hasWorkspace ? <Navigate to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
