import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Divider from "../elements/Divider";
import loginbg from "../public/img/loginBg.png";

const Signup = () => {
  // 이메일, 이름, 비밀번호, 비밀번호 확인
  const [signupValue, setSignupValue] = useState({
    userEmail: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  // 오류메시지 상태 저장
  const [nameMessage, setNameMessage] = useState("이름을 입력해주세요.");
  const [emailMessage, setEmailMessage] = useState("이메일을 입력해주세요");
  const [passwordMessage, setPasswordMessage] =
    useState("비밀번호를 입력해주세요");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState("비밀번호를 한번 더 입력해주세요");

  const inputRef = useRef();
  const navigate = useNavigate();

  const { userEmail, userName, password, confirmPassword } = signupValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupValue({ ...signupValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 회원가입에 필요한 데이터 서버로 전송
    axios
      .post("https://0jun.shop/api/users/signup", signupValue)
      .then((response) => {
        if (response.data.success) {
          alert("로그인에 성공하였습니다!");
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };

  const signupBox = (title) => {
    return (
      <SignupStyle>
        <LoginWrap>
          <LoginTitle>{title}</LoginTitle>
          <EmailWrap>
            <FormWrap onSubmit={handleSubmit}>
              <div className="formbox">
                <EmailLabel>이름</EmailLabel>
                <EmailInput
                  type="text"
                  name="userName"
                  value={userName || ""}
                  userName={userName}
                  onChange={handleChange}
                  placeholder="5글자 이내로 입력해주세요."
                  ref={inputRef}
                />
                {userName === "" && (
                  <span className="help-message">{nameMessage}</span>
                )}
              </div>

              <div className="formbox">
                <EmailLabel htmlFor="userEmail">이메일</EmailLabel>
                <EmailInput
                  type="text"
                  name="userEmail"
                  value={userEmail || ""}
                  onChange={handleChange}
                  placeholder="사용 가능한 이메일주소를 입력해주세요."
                  ref={inputRef}
                />
                {userEmail === "" && (
                  <span className="help-message">{emailMessage}</span>
                )}
              </div>

              <div className="formbox">
                <EmailLabel>비밀번호</EmailLabel>
                <EmailInput
                  name="password"
                  type="password"
                  value={password || ""}
                  onChange={handleChange}
                  placeholder="6글자 이상 입력해주세요."
                  ref={inputRef}
                />
                {password === "" && (
                  <span className="help-message">{passwordMessage}</span>
                )}
              </div>
              <div className="formbox">
                <EmailLabel>비밀번호 확인</EmailLabel>
                <EmailInput
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword || ""}
                  onChange={handleChange}
                  placeholder="비밀번호를 확인해주세요."
                  ref={inputRef}
                />
                {confirmPassword === "" && (
                  <span className="help-message">{passwordConfirmMessage}</span>
                )}
              </div>
              <EmailSubmit
                type="submit"
                confirmPassword={confirmPassword}
                password={password}
                userName={userName}
                userEmail={userEmail}
              >
                회원가입하기
              </EmailSubmit>
            </FormWrap>
          </EmailWrap>
        </LoginWrap>
      </SignupStyle>
    );
  };

  return <LoginBackGround>{signupBox("Join Us")}</LoginBackGround>;
};

const LoginBackGround = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url(${loginbg});
  background-size: cover;
  background-position: center;
`;

const SignupStyle = styled.div`
  padding: 50px 100px 81px 100px;
  background: rgba(254, 254, 254, 0.5);
  opacity: 0.9;
  border-radius: 20px;
  width: 560px;
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

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

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
`;

const EmailLabel = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #7a858e;
`;

const EmailInput = styled.input`
  all: unset;
  border-bottom: ${(props) =>
    props.value === "" ? "1px solid #F06767" : "1px solid #FFFFFF"};
  width: 100%;
  height: 20px;
  padding: 10px 10px 10px 0px;

  ::placeholder {
    color: #7a858e;
    opacity: 0.5;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`;

const EmailSubmit = styled.button`
  all: unset;
  align-self: flex-end;
  width: 100px;
  height: 40px;
  background: ${(props) =>
    props.userEmail === "" &&
    props.userName === "" &&
    props.password === "" &&
    props.confirmPassword === ""
      ? "rgba(247, 247, 247, 0.5)"
      : "#7d8bdb"};
  transition: all 0.2s linear;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 40px;
  color: var(--middle-text);
  position: position;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => (props.userEmail === "" ? "#7A858E" : "#ffffff")};
  text-align: center;
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
export default Signup;
