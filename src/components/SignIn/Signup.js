import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import logo from "../../public/img/Login/logo-colored.png";
import loginHelp from "../../public/img/Login/login-help.png";
import { Button } from "@mui/material";

const Signup = ({ showLogin, setShowLogin }) => {
  // 이메일, 이름, 비밀번호, 비밀번호 확인
  const [signupValue, setSignupValue] = useState({
    userEmail: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  console.log("signupValue: ", signupValue);
  const [isActive, setIsActive] = useState(false);

  // 오류메시지 상태 저장
  const [nameMessage, setNameMessage] = useState("이름을 입력해주세요.");
  const [emailMessage, setEmailMessage] = useState("이메일을 입력해주세요");
  const [passwordMessage, setPasswordMessage] =
    useState("비밀번호를 입력해주세요");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState("비밀번호를 한번 더 입력해주세요");

  const inputRef = useRef();
  const { userEmail, userName, password, confirmPassword } = signupValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupValue({ ...signupValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 회원가입에 필요한 데이터 서버로 전송
    axios
      .post("http://43.200.170.45/api/users/signup", signupValue)
      .then((res) => {
        console.log("res: ", res);
        if (res.data.success) {
          alert("회원가입에 성공하였습니다!");
        }
      })
      .catch((error) => console.log(error));
  };

  // <SignupStyle>
  //   <LoginWrap>
  //     <LoginTitle>{title}</LoginTitle>
  //     <EmailWrap>
  //       <FormWrap onSubmit={handleSubmit}>
  //         <div className="formbox">
  //           <EmailLabel>이름</EmailLabel>
  //           <EmailInput
  //             type="text"
  //             name="userName"
  //             value={userName || ""}
  //             userName={userName}
  //             onChange={handleChange}
  //             placeholder="5글자 이내로 입력해주세요."
  //             ref={inputRef}
  //           />
  //           {userName === "" && (
  //             <span className="help-message">{nameMessage}</span>
  //           )}
  //         </div>

  // <div className="formbox">
  //   <EmailLabel htmlFor="userEmail">이메일</EmailLabel>
  //   <EmailInput
  //     type="text"
  //     name="userEmail"
  //     value={userEmail || ""}
  //     onChange={handleChange}
  //     placeholder="사용 가능한 이메일주소를 입력해주세요."
  //     ref={inputRef}
  //   />
  //   {userEmail === "" && (
  //     <span className="help-message">{emailMessage}</span>
  //   )}
  // </div>

  // <div className="formbox">
  //   <EmailLabel>비밀번호</EmailLabel>
  //   <EmailInput
  //     name="password"
  //     type="password"
  //     value={password || ""}
  //     onChange={handleChange}
  //     placeholder="6글자 이상 입력해주세요."
  //     ref={inputRef}
  //   />
  //   {password === "" && (
  //     <span className="help-message">{passwordMessage}</span>
  //   )}
  // </div>
  // <div className="formbox">
  //   <EmailLabel>비밀번호 확인</EmailLabel>
  //   <EmailInput
  //     name="confirmPassword"
  //     type="password"
  //     value={confirmPassword || ""}
  //     onChange={handleChange}
  //     placeholder="비밀번호를 확인해주세요."
  //     ref={inputRef}
  //   />
  //   {confirmPassword === "" && (
  //     <span className="help-message">{passwordConfirmMessage}</span>
  //   )}
  // </div>
  //         <EmailSubmit
  //           type="submit"
  //           confirmPassword={confirmPassword}
  //           password={password}
  //           userName={userName}
  //           userEmail={userEmail}
  //         >
  //           회원가입하기
  //         </EmailSubmit>
  //       </FormWrap>
  //     </EmailWrap>
  //   </LoginWrap>
  // </SignupStyle>

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
            <div className="join" onClick={() => setShowLogin(!showLogin)}>
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
                  userName={userName}
                  onChange={handleChange}
                  placeholder="이름을 입력해 주세요."
                  ref={inputRef}
                  className="siginIn-input"
                />
                {/* {userName === "" && (
                    <span className="help-message">{nameMessage}</span>
                  )} */}
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
                {/* {confirmPassword === "" && (
                    <span className="help-message">
                      {passwordConfirmMessage}
                    </span>
                  )} */}
              </div>

              <div className="active-buttons">
                <div className="need-help">
                  <img
                    src={loginHelp}
                    alt="loginHelp"
                    className="loginHelp_icon"
                  />
                  <span className="loginHelp_message">도움이 필요해요</span>
                </div>

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
                    padding: "17px 47px",
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "26px",
                    color: "#ffffff",
                  }}
                >
                  회원가입 하기
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
    margin-top: 208px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 171.5px;
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
    gap: 25px;
  }
`;

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
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
