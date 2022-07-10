import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userReducer";

const Login = () => {
  const [loginValue, setLoginValue] = useState({
    userEmail: "",
    password: "",
  });
  const [showPwInput, setShowPwInput] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const placeholoder = e.target[0].placeholder;

    if (placeholoder === "아이디") {
      // 등록된 이메일인지 확인
      axios
        .post("http://52.79.82.195:3001/api/users/email", loginValue.userEmail)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setShowPwInput(true);
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log(loginValue.password);
      // 입력한 비밀번호가 앞서 입력한 이메일과 매칭되는지 확인
      axios
        .post("http://52.79.82.195:3001/api/users/password", {
          userEmail: loginValue.userEmail,
          password: loginValue.password,
        })
        .then((response) => {
          if (response.data.success) {
            const token = response.data.token;
            alert("로그인에 성공하였습니다!");
            localStorage.setItem("myToken", token);
            navigate("/main");
            dispatch(login({ ...user, isLoggedIn: true }));
          }
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
