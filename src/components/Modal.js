import React from "react";
import styled from "styled-components";
import Divider from "../elements/Divider";
import SocialLogin from "./SocialLogin";
import ModalPortal from "../elements/Portal/Portal";

const Modal = ({ text, onClose }) => {
  const closeModal = (e) => {
    if (e.target.id !== "loginBg") {
      return;
    }
    onClose();
  };

  return (
    <ModalPortal>
      <LoginBackGround id="loginBg" onClick={closeModal}>
        <LoginStyle>
          <LoginWrap>
            <LoginTitle>{text}</LoginTitle>

            <EmailWrap>
              <EmailLabel>이메일 주소</EmailLabel>
              <EmailInput id="textInput" type="text" />
            </EmailWrap>
            <EmailSubmit>계속</EmailSubmit>

            <ContinueWrap>
              <Divider />
              <ContinueText>or continue with</ContinueText>
              <Divider />
            </ContinueWrap>

            <SocialLogin />
          </LoginWrap>
        </LoginStyle>
      </LoginBackGround>
    </ModalPortal>
  );
};

const LoginBackGround = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  text-align: center;
`;

const LoginStyle = styled.div`
  padding: 50px 100px 81px 100px;
  background: rgba(254, 254, 254, 0.5);
  opacity: 0.9;
  border-radius: 20px;
  width: 560px;
  height: 532px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginTitle = styled.div`
  font-weight: 400;
  font-size: 40px;
  line-height: 60px;
  text-align: center;
  letter-spacing: -0.02em;
  color: var(--point-main);
  text-shadow: 0px 0px 20px rgba(192, 200, 248, 0.49);
  margin-bottom: 37px;
`;

const EmailWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailLabel = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  color: var(--main-grey);
`;

const EmailInput = styled.input`
  all: unset;
  border-bottom: var(--FEFEFE);
  width: 100%;
  height: 20px;
  padding: 10px 10px 10px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EmailSubmit = styled.div`
  width: 100px;
  height: 40px;
  background: rgba(247, 247, 247, 0.9);
  border-radius: 5px;

  cursor: pointer;
  display: Flex;
  justify-content: center;
  align-items: center;
  justify-self: flex-end;
  margin-top: 19px;
  margin-bottom: 64px;
  color: var(--main-grey);
  position: position;
`;

const LoginWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ContinueWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
`;

const ContinueText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #7a858e;
  width: 400px;
  margin: 0px 25px;
`;
// const  = styled.div``;
// const  = styled.div``;
// const  = styled.div``;

export default Modal;
