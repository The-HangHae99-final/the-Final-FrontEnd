import React from "react";
import ScreenForNewbie from "./ScreenForNewbie";
import { APP_USER_STATE } from "../App";

const PrivateRoute = ({ isNewbieUser, component: Component }) => {
  console.log(isNewbieUser, Component);

  return <> {!isNewbieUser ? Component : <ScreenForNewbie />}</>;
};

export default PrivateRoute;
