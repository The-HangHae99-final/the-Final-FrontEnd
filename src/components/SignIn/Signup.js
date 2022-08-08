import axios from "axios";
import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import logo from "../../public/img/Login/logo-colored.png";
import { Button } from "@mui/material";
import { ErrorAlert, SuccessAlert } from "../../elements/alert";

// TODO prop명 바꾸기
const Signup = () => {
  // 회원가입에 필요한 인풋 값
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 오류 메시지
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState("");

  // 오류 메시지 상태
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const [openSuccessToast, setOpenSuccessToast] = useState(false);
  const [openErrorToast, setOpenErrorToast] = useState(false);

  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleToastClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessToast(false);
    setOpenErrorToast(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 회원가입 요청
    axios
      .post("https://teamnote.shop/api/users/signup", {
        userEmail: email,
        userName: name,
        password: password,
        confirmPassword: passwordConfirm,
      })
      .then((res) => {
        console.log("res: ", res);
        if (res.data.success) {
          navigate("/join/signin");
          setOpenSuccessToast(true);
        }
      })
      .catch((err) => {
        const errMsg = err.response.data.errorMessage;
        setOpenErrorToast(true);
        setSubmitErrorMessage(errMsg);
        setTimeout(() => {
          setOpenErrorToast(false);
        }, 4000);
      });
  };

  // 이름 입력 + 유효성 검사
  const onChangeName = useCallback((e) => {
    const nameLength = e.target.value.length;

    setName(e.target.value);
    if (nameLength < 2 || nameLength >= 5) {
      setNameErrorMessage("2글자 이상 5글자 미만으로 입력해주세요.");
      setIsName(false);
    } else if (2 <= nameLength <= 5) {
      setNameErrorMessage("사용 할 수 있는 이름입니다.");
      setIsName(true);
    }
  }, []);

  // 이메일 유효성 검사
  const onChangeEmail = useCallback((e) => {
    const emailValue = e.target.value;
    setEmail(e.target.value);
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    console.log("!emailRegex.test(email): ", emailRegex.test(emailValue));
    if (!emailRegex.test(emailValue)) {
      setEmailErrorMessage("이메일 형식이 틀렸습니다.");
      setIsEmail(false);
    } else {
      setEmailErrorMessage("사용 할 수 있는 이메일입니다.");
      setIsEmail(true);
    }
  }, []);

  // 비밀번호 유효성 검사(6글자 이상)
  const onChangePassword = useCallback((e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    if (passwordValue.length <= 6) {
      setPasswordErrorMessage("6글자 이상 입력해주세요.");
      setIsPassword(false);
    } else {
      setPasswordErrorMessage("사용 할 수 있는 비밀번호입니다.");
      setIsPassword(true);
    }
  }, []);

  // 비밀번호2 유효성 검사
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmValue = e.target.value;
      setPasswordConfirm(passwordConfirmValue);
      if (passwordConfirmValue !== password) {
        setPasswordConfirmErrorMessage("비밀번호가 일치하지 않습니다.");
        setIsPasswordConfirm(false);
      } else {
        setPasswordConfirmErrorMessage("사용 할 수 있는 비밀번호입니다.");
        setIsPasswordConfirm(true);
      }
    },
    [password]
  );

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
                  name="name"
                  value={name || ""}
                  onChange={onChangeName}
                  placeholder="이름을 입력해 주세요."
                  ref={inputRef}
                  className={`signup-input ${
                    name.length > 0 &&
                    nameErrorMessage ===
                      "2글자 이상 5글자 미만으로 입력해주세요." &&
                    "error"
                  }`}
                  // onBlur={isNameValidate}
                />
                {name.length > 0 && (
                  <span
                    className={`inputErrorMessage ${
                      isName ? "success" : "error"
                    }`}
                  >
                    {nameErrorMessage}
                  </span>
                )}
              </div>
              <div className="input-wrap">
                <input
                  className={`signup-input ${
                    email.length > 0 &&
                    emailErrorMessage === "이메일 형식이 틀렸습니다." &&
                    "error"
                  }`}
                  type="text"
                  name="userEmail"
                  value={email || ""}
                  onChange={onChangeEmail}
                  placeholder="사용 가능한 이메일을 입력해 주세요."
                  ref={inputRef}
                  // onBlur={isEmailValidate}
                />
                {email.length > 0 && (
                  <span
                    className={`inputErrorMessage ${
                      isEmail ? "success" : "error"
                    }`}
                  >
                    {emailErrorMessage}
                  </span>
                )}
              </div>
              <div className="input-wrap">
                <input
                  className={`signup-input ${
                    password.length > 0 &&
                    passwordErrorMessage === "6글자 이상 입력해주세요." &&
                    "error"
                  }`}
                  name="password"
                  type="password"
                  value={password || ""}
                  onChange={onChangePassword}
                  placeholder="비밀번호를 입력해 주세요."
                  ref={inputRef}
                />
                {password.length > 0 && (
                  <span
                    className={`inputErrorMessage ${
                      isPassword ? "success" : "error"
                    }`}
                  >
                    {passwordErrorMessage}
                  </span>
                )}
              </div>
              <div className="input-wrap">
                <input
                  className={`signup-input ${
                    passwordConfirm.length > 0 &&
                    passwordConfirmErrorMessage ===
                      "비밀번호가 일치하지 않습니다." &&
                    "error"
                  }`}
                  name="confirmPassword"
                  type="password"
                  value={passwordConfirm || ""}
                  onChange={onChangePasswordConfirm}
                  placeholder="비밀번호를 한번 더 입력해 주세요."
                  ref={inputRef}
                />
                {passwordConfirm.length > 0 && (
                  <span
                    className={`inputErrorMessage ${
                      isPasswordConfirm ? "success" : "error"
                    }`}
                  >
                    {passwordConfirmErrorMessage}
                  </span>
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
                  variant="outlined"
                  type="submit"
                  style={{
                    all: "unset",
                    alignSelf: "flex-end",
                    transition: "all 0.2s linear",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor:
                      isName && isEmail && isPassword && isPasswordConfirm
                        ? "rgb(136, 154, 255)"
                        : "rgb(213, 216, 218)",
                    position: "position",
                    textAlign: "center",
                    padding: "1rem 2.5rem",
                    width: "20%",
                    fontWeight: "400",
                    fontSize: "1.1em",
                    lineHeight: "26px",
                    color: "#ffffff",
                  }}
                  disabled={
                    !(isName && isEmail && isPassword && isPasswordConfirm)
                  }
                >
                  회원가입
                </Button>
              </div>
            </FormWrap>
          </EmailWrap>
        </LoginWrap>
      </div>

      {openSuccessToast && (
        <SuccessAlert
          text="회원가입에 성공했습니다!"
          handleClose={handleToastClose}
          openToast={openSuccessToast}
        />
      )}
      {openErrorToast && (
        <ErrorAlert
          text={submitErrorMessage}
          handleClose={handleToastClose}
          openToast={openErrorToast}
        />
      )}
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

  .active-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    justify-content: flex-end;
    margin-top: 4rem;
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
  }

  .input-wrap {
    display: flex;
    flex-direction: column;
    position: relative;

    .signup-input {
      all: unset;
      outline: none;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #7a858e;
      border-bottom: 1px solid #dcdce8;
      padding: 23px 0px 10px 0px;
      margin-bottom: 25px;

      ::placeholder {
        font-weight: 400;
        font-size: 18px;
        line-height: 26px;
        color: #cbcbd7;
      }
    }

    .inputErrorMessage {
      margin-top: 4px;
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      letter-spacing: -1px;
      position: absolute;
      bottom: 0px;
      right: 0;
      color: #00c753;
    }

    .signup-input.error {
      border-bottom: 1px solid var(--error);
    }

    .inputErrorMessage.error {
      color: #f06767;
    }
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
