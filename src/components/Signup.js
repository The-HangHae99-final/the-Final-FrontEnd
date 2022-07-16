import axios from "axios";
import React, { useState, useRef } from "react";
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

  const inputRef = useRef();

  const { userEmail, userName, password, confirmPassword } = signupValue;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupValue({ ...signupValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 회원가입에 필요한 데이터 서버로 전송
    axios
      .post("http://13.209.3.168:3001/api/users/signup", signupValue)
      .then((response) => {
        if (response.data.success) {
          alert("로그인에 성공하였습니다!");
          navigate("/");
        } else {
          alert("이메일 혹은 비밀번호가 틀렸습니다!");
        }
      })
      .catch((error) => console.log(error));
  };

  const signupBox = (title, sub, join) => {
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
                  onChange={handleChange}
                  placeholder="5글자 이내로 입력해주세요."
                  ref={inputRef}
                />
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
              </div>
              <EmailSubmit type="submit" userEmail={userEmail}>
                회원가입하기
              </EmailSubmit>
            </FormWrap>
          </EmailWrap>
        </LoginWrap>
      </SignupStyle>
    );
  };
  return (
    <LoginBackGround>
      {signupBox("Join Us", "이메일 주소", "JOIN US")}
    </LoginBackGround>
  );
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
    .message {
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 24px;
      letter-spacing: -1px;
      position: absolute;
      bottom: -10px;
      left: 0;
      👉 &.success {
        color: #8f8c8b;
      }
      👉 &.error {
        color: #ff2727;
      }
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
  border-bottom: 1px solid var(--FEFEFE);
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
    props.userEmail === "" ? "rgba(247, 247, 247, 0.5)" : "#7d8bdb"};
  transition: all 0.2s linear;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 40px;
  color: var(--main-grey);
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
