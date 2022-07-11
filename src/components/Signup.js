import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loginBg from "../public/img/Ellipse103.png";
import Divider from "../elements/Divider";
import SocialLogin from "./SocialLogin";

const Signup = () => {
  const [signupValue, setSignupValue] = useState({
    userEmail: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupValue({ ...signupValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 회원가입에 필요한 데이터 서버로 전송
    axios
      .post("http://52.79.82.195:3001/api/users/signup", signupValue)
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
  return (
    <SignupStyle>
      <h1 className="login-title">TeamNote에 오신걸 환영합니다</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div>
          <label className="label">이메일</label>
          <input
            placeholder="이메일"
            onChange={handleChange}
            name="userEmail"
          />
        </div>
        <div>
          <label>닉네임</label>
          <input placeholder="닉네임" onChange={handleChange} name="userName" />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            placeholder="비밀번호"
            onChange={handleChange}
            name="password"
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            placeholder="비밀번호"
            onChange={handleChange}
            name="confirmPassword"
          />
        </div>
        <button type="submit">회원가입하기</button>
      </form>
    </SignupStyle>
  );
};

const SignupStyle = styled.div`
  /* background: url("public/img/loginBg.png"); */
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
`;

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

export default Signup;
