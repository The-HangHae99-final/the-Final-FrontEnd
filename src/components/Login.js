import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userReducer";
import { setItemToLs } from "./localStorage";

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
        .post("http://doublenongdam.shop/api/users/email", loginValue.userEmail)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setShowPwInput(true);
          }
        })
        .catch((error) => console.log(error));
    } else {
      // 입력한 비밀번호가 앞서 입력한 이메일과 매칭되는지 확인
      axios
        .post("http://doublenongdam.shop/api/users/password", {
          userEmail: loginValue.userEmail,
          password: loginValue.password,
        })
        .then((response) => {
          const user_name = response.data.name;
          const user_email = response.data.email;

          // response 값이 success라면 토큰 저장, 리디렉션, 유저 정보 저장
          if (response.data.success) {
            const token = response.data.token;
            alert("로그인에 성공하였습니다!");
            setItemToLs("myToken", token);
            setItemToLs("userName", user_name);
            setItemToLs("userEmail", user_email);
            navigate("/main");
            dispatch(login({ user_email: user_email, user_name: user_name }));
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
