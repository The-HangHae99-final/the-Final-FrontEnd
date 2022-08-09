import React from "react";
import { Route, Outlet } from "react-router-dom";
import styled, { css } from "styled-components";
import loginBanner from "../public/img/Login/login-banner.png";
import mobile_bg from "../public/img/Login/mobile_bg.png";

const JoinRouter = () => {
  return (
    <JoinRouterSC>
      <div className="signin-screen_left" />
      <div className="signin-screen_right">
        <LoginContainerSC>
          <Outlet />
        </LoginContainerSC>
      </div>
    </JoinRouterSC>
  );
};

const JoinRouterSC = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;

  .signin-screen_left {
    width: 53%;
    background-color: yellowgreen;
    background: url(${loginBanner});
    background-size: cover;
    background-position: center;
  }

  .signin-screen_right {
    display: flex;
    width: 47%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0px 90px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    .signin-screen_right {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background: url(${mobile_bg});
      background-position: center;
      background-size: cover;
    }

    .signin-screen_left {
      background-color: red;
    }
  }
`;

const LoginContainerSC = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default JoinRouter;
