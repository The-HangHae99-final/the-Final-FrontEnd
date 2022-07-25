import React from "react";
import PrivateMain from "./PrivateMain";
import PublicMain from "./PublicMain";

const ScreenForUser = ({ REQUIRED_ID }) => {
  return <>{REQUIRED_ID !== undefined ? <PrivateMain /> : <>hi</>}</>;
};

export default ScreenForUser;
