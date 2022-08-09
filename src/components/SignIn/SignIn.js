import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import logo from "../../public/img/Login/logo-colored.png";
import axios from "axios";
import { setItemToLs } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import Divider from "../../elements/Divider";
import SocialLogin from "../SocialLogin";
import { useDispatch } from "react-redux";
import CalendarLabel from "../../pages/Calendar/CalendarLabel";
import * as common from "../../elements/toast";
import { successNotify } from "../../elements/toast";
import Signup from "./Signup";
import { Button } from "@mui/material";

// 이미지
import loginHelp from "../../public/img/Login/login-help.png";
import loginBanner from "../../public/img/Login/login-banner.png";

function PopUpErrorMsg() {
  return (
    <PopUpErrorMsgStyle>아이디 또는 비밀번호를 확인하세요</PopUpErrorMsgStyle>
  );
}

export const SignIn = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [loginValue, setLoginValue] = useState({
    userEmail: "",
    password: "",
  });
  const [isActive, setIsActive] = useState(false);
  const [match, setMatch] = useState(true);
  const [emailHelpMessage, setEmailHelpMessage] = useState("");
  const [passwordHelpMessage, setPasswordHelpMessage] = useState("");

  const { userEmail, password } = loginValue;
  const isValidInput = userEmail.length >= 1 && password.length >= 1;
  const navigate = useNavigate();
  const emailRef = useRef();
  const pwRef = useRef();

  // useInput 으로 함수 분리하기
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
    if (!isValidInput) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  // 로그인 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO 로그인버튼 누르자마자 날리는게 좋음
    setLoginValue({ userEmail: "", password: "" });

    try {
      const res = await axios.post("https://teamnote.shop/api/users/login", {
        userEmail,
        password,
      });
      if (res.data.success) {
        const user_name = res.data.userName;
        const user_email = res.data.userEmail;
        const token = res.data.token;

        setItemToLs("myToken", token);
        setItemToLs("userName", user_name);
        setItemToLs("userEmail", user_email);
        common.successNotify("로그인 성공!");
        navigate("/main");
      }
    } catch (err) {
      // TOODO 토스트 얼럿으로 변경하는게 좋음
      console.log("err: ", err);
      if (err.response.data.errorMessage == "일치하는 이메일이 없습니다.") {
        setEmailHelpMessage("이메일 형식을 다시 확인 해주세요.");
        emailRef.current.focus();
      } else if (err.response.data.errorMessage == "비밀번호가 틀렸습니다.") {
        setPasswordHelpMessage("잘못된 비밀번호입니다");
        pwRef.current.focus();
      }
    }
  };

  const handleGoToLogin = () => {
    setShowLogin(true);
  };

  useEffect(() => {
    setEmailHelpMessage("");
    setPasswordHelpMessage("");
  }, [userEmail, password]);

  return (
    <>
      <LoginContainer>
        <div className="signin-screen-wrap">
          <div className="signin-top">
            <div className="logo">
              <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="signin_title">Sign In</div>
            <div className="switch">
              <span>신규 사용자이신가요?</span>
              <div className="join" onClick={() => navigate("/join/signup")}>
                회원가입
              </div>
            </div>
          </div>

          <LoginWrap>
            <EmailWrap>
              <FormWrap onSubmit={handleSubmit}>
                <div className="input-wrap">
                  <SignInInputEmail
                    type="text"
                    name="userEmail"
                    value={userEmail || ""}
                    onChange={handleChange}
                    ref={emailRef}
                    className="siginIn-input siginIn-input_email"
                    placeholder="이메일 주소를 입력해주세요."
                    emailHelpMessage={emailHelpMessage}
                    autoComplete="off"
                  />
                  {emailHelpMessage !== "" && (
                    <span className="help-message">{emailHelpMessage}</span>
                  )}
                </div>
                <div className="input-wrap">
                  <SignInInputPassword
                    type="password"
                    name="password"
                    value={password || ""}
                    onChange={handleChange}
                    ref={pwRef}
                    className="siginIn-input siginIn-input_password"
                    placeholder="비밀번호를 입력해주세요."
                    passwordHelpMessage={passwordHelpMessage}
                    autoComplete="off"
                  />
                  {passwordHelpMessage !== "" && (
                    <span className="help-message">{passwordHelpMessage}</span>
                  )}
                </div>

                <div className="active-buttons">
                  {/* <div className="need-help">
                    <img
                      src={loginHelp}
                      alt="loginHelp"
                      className="loginHelp_icon"
                    />
                    <span className="loginHelp_message">도움이 필요해요</span>
                  </div> */}

                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      all: "unset",
                      alignSelf: "flex-end",
                      transition: "all 0.2s linear",
                      borderRadius: "5px",
                      cursor: "pointer",
                      backgroundColor: isActive ? "#889AFF" : "#d5d8da",
                      position: "position",
                      textAlign: "center",
                      padding: "1rem 2.5rem",
                      width: "20%",
                      fontWeight: "400",
                      fontSize: "1.1em",
                      lineHeight: "26px",
                      color: "#ffffff",
                    }}
                  >
                    로그인
                  </Button>
                </div>
              </FormWrap>
            </EmailWrap>

            <ContinueWrap>
              <Divider />
              <div className="continue-text">or continue with</div>
              <Divider />
            </ContinueWrap>
            <SocialLogin />
          </LoginWrap>
        </div>
      </LoginContainer>
      {!match && <PopUpErrorMsg match={match} />}
    </>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;

  .signin-screen-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .signin-top {
    display: flex;
    flex-direction: column;
    margin-bottom: 36px;

    @media screen and (max-width: 768px) {
      align-items: center;
    }
  }

  .logo {
    width: 72px;
    height: 72px;
    margin-bottom: 37px;
  }

  .signin_title {
    font-weight: 400;
    font-size: 45px;
    line-height: 68px;
    color: #353841;
    text-shadow: 0px 0px 20px rgba(192, 200, 248, 0.49);
  }

  .join {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    text-decoration-line: underline;
    color: #7d8bdb;
    cursor: pointer;
  }

  .switch {
    display: flex;
    align-items: center;
    gap: 7px;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #7a858e;
  }

  @media screen and (max-width: 768px) {
    .signin-screen-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

const LoginWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EmailWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 95px;

  .input-wrap {
    display: Flex;
    flex-direction: column;
    margin-bottom: 25px;
    position: relative;

    .help-message {
      color: var(--error);
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      position: absolute;
      bottom: -20px;
      right: 0;
    }
  }

  .active-buttons {
    margin-top: 38px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .need-help {
    display: flex;
    align-items: center;
    gap: 7px;

    .loginHelp_icon {
      width: 24.08px;
      height: 24.08px;
    }

    .loginHelp_message {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      text-decoration-line: underline;
      color: #7d8bdb;
    }
  }
`;

const SignInInputEmail = styled.input`
  all: unset;
  outline: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #7a858e;
  padding: 23px 0px 10px 0px;
  border-bottom: 1px solid #dcdce8;

  ${(props) => {
    if (props.emailHelpMessage !== "") {
      return css`
        border-bottom: 1px solid var(--error);
      `;
    }
  }}

  ::placeholder {
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    color: #cbcbd7;
  }
`;

const SignInInputPassword = styled.input`
  all: unset;
  outline: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #7a858e;
  padding: 23px 0px 10px 0px;
  border-bottom: 1px solid #dcdce8;

  ${(props) => {
    if (props.passwordHelpMessage !== "") {
      return css`
        border-bottom: 1px solid var(--error);
      `;
    }
  }}

  ::placeholder {
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    color: #cbcbd7;
  }
`;
const ContinueWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 35px;

  .continue-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #7a858e;
    margin: 0px 25px;
    width: 100%;
    white-space: nowrap;
  }
`;

const PopUpErrorMsgStyle = styled.div`
  display: ${(props) => (props.match ? "none" : "block")};
  width: 371px;
  height: 56px;
  background: var(--error);
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.15);
  padding: 15px 58px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.02em;
  color: #ffffff;
  animation: shake 0.72s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`;
