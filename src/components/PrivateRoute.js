import React from "react";
import ScreenForNewbie from "./ScreenForNewbie";

const PrivateRoute = ({ appState, component: Component }) => {
  console.log(appState);

  return <> {appState ? Component : <ScreenForNewbie />}</>;
};

export default PrivateRoute;
