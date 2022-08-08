import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import logo from "../../public/img/Login/logo-colored.png";
import loginHelp from "../../public/img/Login/login-help.png";
import { Button } from "@mui/material";

// TODO prop명 바꾸기
const Signup = () => {
  const [signupValue, setSignupValue] = useState({
    userEmail: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  // 오류메시지 상태 저장
  // const [nameMessage, setNameMessage] = useState("");
  // const [emailMessage, setEmailMessage] = useState("");
  // const [passwordMessage, setPasswordMessage] =
  //   useState("비밀번호를 입력해주세요");
  // const [passwordConfirmMessage, setPasswordConfirmMessage] =
  //   useState("비밀번호를 한번 더 입력해주세요");

  const inputRef = useRef();
  const navigate = useNavigate();

  const { userEmail, userName, password, confirmPassword } = signupValue;

  const isValidInput =
    userEmail.length >= 1 &&
    userName.length >= 1 &&
    password.length >= 1 &&
    confirmPassword.length >= 1;

  // useInput 으로 함수 분리하기
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupValue({ ...signupValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidInput) {
      return alert("모든 칸을 채워주세요.");
    }

    // 회원가입 요청
    axios
      .post("https://teamnote.shop/api/users/signup", signupValue)
      .then((res) => {
        console.log("res: ", res);
        if (res.data.success) {
          alert("회원가입에 성공하였습니다!");
          navigate("/join/signin");
        }
      })
      .catch((err) => {
        const errMsg = err.response.data.errorMessage;
        console.log("errMsg: ", errMsg);
      });
  };
  return (
    <LoginContainer>
      <div className="signin-screen-wrap">
        <div className="signin-top">
          <div className="logo">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="signin_title">Join Us</div>
          <div className="switch">
            <span>이미 팀노트의 멤버이신가요?</span>
            <div className="join" onClick={() => navigate("/join/signin")}>
              로그인
            </div>
          </div>
        </div>

        <LoginWrap>
          <EmailWrap>
            <FormWrap onSubmit={handleSubmit}>
              <div className="input-wrap">
                <input
                  type="text"
                  name="userName"
                  value={userName || ""}
                  username={userName}
                  onChange={handleChange}
                  placeholder="이름을 입력해 주세요."
                  ref={inputRef}
                  className="siginIn-input"
                />
                <input
                  type="text"
                  name="userEmail"
                  value={userEmail || ""}
                  onChange={handleChange}
                  placeholder="사용 가능한 이메일을 입력해 주세요."
                  ref={inputRef}
                  className="siginIn-input"
                />
                {/* {userEmail === "" && (
                    <span className="help-message">{emailMessage}</span>
                  )} */}

                <input
                  name="password"
                  type="password"
                  value={password || ""}
                  onChange={handleChange}
                  placeholder="비밀번호를 입력해 주세요."
                  ref={inputRef}
                  className="siginIn-input"
                />
                {/* {password === "" && (
                    <span className="help-message">{passwordMessage}</span>
                  )} */}
                <input
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword || ""}
                  onChange={handleChange}
                  placeholder="비밀번호를 한번 더 입력해 주세요."
                  ref={inputRef}
                  className="siginIn-input"
                />
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
                    backgroundColor: "#d5d8da",
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
                  회원가입
                </Button>
              </div>
            </FormWrap>
          </EmailWrap>
        </LoginWrap>
      </div>
    </LoginContainer>
  );
};

const EmailWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 95px;
  width: 100%;

  .siginIn-input {
    all: unset;
    outline: none;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #7a858e;
    border-bottom: 1px solid #dcdce8;
    padding: 23px 0px 10px 0px;

    ::placeholder {
      font-weight: 400;
      font-size: 18px;
      line-height: 26px;
      color: #cbcbd7;
    }
  }
  .active-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  .formbox {
    margin-top: 30px;
  }

  .join {
    align-self: flex-end;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    text-align: right;
    text-decoration-line: underline;
    color: #7d8bdb;
    margin: 8px 0px;
    margin-bottom: 32px;
  }

  .formbox {
    position: relative;
    transition: all 0.3s linear;

    .help-message {
      margin-top: 4px;
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      letter-spacing: -1px;
      position: absolute;
      left: 0;
      color: #f06767;
    }
  }

  .input-wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: 3.5rem;
    gap: 1.3rem;
  }
`;

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

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
`;

export default Signup;

// const EmailLabel = styled.div`
//   font-weight: 400;
//   font-size: 14px;
//   line-height: 20px;
//   color: #7a858e;
// `;

// const EmailSubmit = styled.button`
//   all: unset;
//   align-self: flex-end;
//   width: 100px;
//   height: 40px;
//   background: ${(props) =>
//     props.userEmail === "" &&
//     props.userName === "" &&
//     props.password === "" &&
//     props.confirmPassword === ""
//       ? "rgba(247, 247, 247, 0.5)"
//       : "#7d8bdb"};
//   transition: all 0.2s linear;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-top: 40px;
//   color: var(--middle-text);
//   position: position;
//   font-weight: 400;
//   font-size: 14px;
//   line-height: 20px;
//   color: ${(props) => (props.userEmail === "" ? "#7A858E" : "#ffffff")};
//   text-align: center;
// `;
