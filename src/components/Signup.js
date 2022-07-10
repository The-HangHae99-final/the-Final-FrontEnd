import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  console.log(signupValue);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("서버로 회원가입 데이터를 보냅니다.");

    axios
      .post("http://52.79.82.195:3001/api/users/signup", signupValue)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          alert("로그인에 성공하였습니다!");
          navigate("/login");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
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
    </div>
  );
};

export default Signup;
