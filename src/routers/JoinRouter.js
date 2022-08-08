import React from "react";
import { Route, Outlet } from "react-router-dom";
import styled, { css } from "styled-components";
import loginBanner from "../public/img/Login/login-banner.png";

const JoinRouter = () => {
  return (
    <JoinRouterSC>
      <SignInBannerSC />
      <SignInScreenSC>
        <LoginContainerSC>
          <Outlet />
        </LoginContainerSC>
      </SignInScreenSC>
    </JoinRouterSC>
  );
};

const JoinRouterSC = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
`;

const SignInBannerSC = styled.div`
  width: 53%;
  background-color: yellowgreen;
  background: url(${loginBanner});
  background-size: cover;
  background-position: center;
`;

const SignInScreenSC = styled.div`
  display: flex;
  width: 47%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0px 90px;
`;

const LoginContainerSC = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default JoinRouter;
