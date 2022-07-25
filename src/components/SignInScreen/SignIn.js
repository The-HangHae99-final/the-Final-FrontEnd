import React from "react";
import styled from "styled-components";

const SignIn = () => {
  return (
    <SignInStyle>
      <SignInBanner>qweqwe</SignInBanner>
      <SingInScreen>
        <div className="signin-screen-wrap">
          <div className="signin-top">
            <div className="logo"></div>
            <div className="title"></div>
          </div>
        </div>
      </SingInScreen>
    </SignInStyle>
  );
};

const SignInStyle = styled.div`
  background-color: blue;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
`;

const SignInBanner = styled.div`
  width: 53%;
  background-color: yellowgreen;
`;
const SingInScreen = styled.div`
  width: 47%;
  background-color: whitesmoke;
`;

// const SignInStyle = styled.div`

// `;

export default SignIn;
