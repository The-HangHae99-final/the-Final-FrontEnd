import React from "react";
import ScreenForNewbie from "./ScreenForNewbie";

const PrivateRoute = ({ isNewbie, component: Component }) => {
  console.log(isNewbie);

  return <> {isNewbie ? Component : <ScreenForNewbie />}</>;
};

export default PrivateRoute;
