import React from "react";
import ScreenForNewbie from "./ScreenForNewbie";

const PrivateRoute = ({ isNewbieUser, component: Component }) => {
  return <> {!isNewbieUser ? Component : <ScreenForNewbie />}</>;
};

export default PrivateRoute;
