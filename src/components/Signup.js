import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const SignupStyle = styled.div``;

export default Signup;
