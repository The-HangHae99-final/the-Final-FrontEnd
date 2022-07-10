import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginValue, setLoginValue] = useState({
    userEmail: "",
    password: "",
  });
  const [showPwInput, setShowPwInput] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };

  console.log(loginValue.userEmail);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("서버로 회원가입 데이터를 보냅니다.");
    axios
      .post("http://52.79.82.195:3001/api/users/email", loginValue.userEmail)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <LoginStyle>
      로그인페이지입니다
      <form onSubmit={handleSubmit}>
        {!showPwInput ? (
          <>
            <input
              type="text"
              placeholder="아이디"
              name="userEmail"
              value={loginValue.userEmail}
              onChange={handleChange}
            />
            <button type="submit">계속</button>
          </>
        ) : (
          <>
            <input
              type="password"
              placeholder="비밀번호"
              value={loginValue.password}
              onChange={handleChange}
            />
            <button type="submit">계속</button>
          </>
        )}
      </form>
      <button onClick={() => navigate("/signup")}>회원가입하기</button>
    </LoginStyle>
  );
};

const LoginStyle = styled.div`
  /* background: linear-gradient(
      0deg,
      rgba(165, 163, 217, 0.2),
      rgba(165, 163, 217, 0.2)
    ),
    url(); */
`;

export default Login;
