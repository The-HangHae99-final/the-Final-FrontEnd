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

  const handleSubmit = (e) => {
    e.preventDefault();
    const placeholoder = e.target[0].placeholder;
    console.log(placeholoder);
    if (placeholoder === "아이디") {
      axios
        .post("http://52.79.82.195:3001/api/users/email", loginValue.userEmail)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            alert("존재하는 아이디입니다");
            setShowPwInput(true);
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log(loginValue.password);
      axios
        .post("http://52.79.82.195:3001/api/users/password", {
          userEmail: loginValue.userEmail,
          password: loginValue.password,
        })
        .then((response) => {
          console.log(response);
          // if (response.data.success) {
          //   setShowPwInput(true);
          // }
        })
        .catch((error) => console.log(error));
    }
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
              type="text"
              placeholder="비밀번호"
              name="password"
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
