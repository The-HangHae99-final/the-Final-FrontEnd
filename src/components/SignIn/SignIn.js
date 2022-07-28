import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import logo from "../../public/img/Login/logo-colored.png";
import axios from "axios";
import { setItemToLs } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import Divider from "../../elements/Divider";
import SocialLogin from "../SocialLogin";
import { useDispatch } from "react-redux";

// 이미지
import loginHelp from "../../public/img/Login/login-help.png";
import loginBanner from "../../public/img/Login/login-banner.png";
import { Button } from "@mui/material";
import Signup from "./Signup";

const SignIn = () => {
  const [showLogin, setShowLogin] = useState(true);

  const [loading, setLoading] = useState(false);
  const [loginValue, setLoginValue] = useState({
    userEmail: "",
    password: "",
  });
  const { userEmail, password } = loginValue;
  const [isActive, setIsActive] = useState(false);
  console.log("isActive: ", isActive);
  const emailChars = userEmail.length;
  const passwordChars = password.length;

  useEffect(() => {
    if (emailChars !== 0 && passwordChars !== 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [loginValue, loginValue?.userEmail, userEmail?.password]);

  const navigate = useNavigate();
  const inputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userEmail !== "" && password !== "") {
      console.log("loginValue: ", loginValue);

      try {
        const res = await axios.post("http://43.200.170.45/api/users/login", {
          userEmail,
          password,
        });
        if (res.data.success) {
          const user_name = res.data.userName;
          const user_email = res.data.userEmail;
          const token = res.data.token;
          setItemToLs("myToken", token);
          setItemToLs("userName", user_name);
          setItemToLs("userEmail", user_email);
          navigate("/main");
        }
      } catch (err) {
        inputRef.current.focus();
        console.log(err);
      }
    }
    // if (e.target.innerText.includes("이메일")) {
    //   // 등록된 이메일인지 확인
    //   axios
    //     .post("http://43.200.170.45/api/users/email", {
    //       userEmail: loginValue.userEmail,
    //     })
    //     .then((response) => {
    //       if (response.data.success) {
    //         inputRef.current.focus();
    //       }
    //     })
    //     .catch((err) => {
    //       alert(err.response.data.errorMessage);
    //       inputRef.current.focus();
    //       setLoginValue({ ...loginValue, userEmail: "" });
    //     });
    // } else {
    //   // 입력한 비밀번호가 앞서 입력한 이메일과 매칭되는지 확인
    //   axios
    //     .post("http://43.200.170.45/api/users/password", {
    //       userEmail: loginValue.userEmail,
    //       password: loginValue.password,
    //     })
    //     .then((response) => {
    //       console.log("response: ", response);
    //       const user_name = response.data.userName;
    //       const user_email = response.data.userEmail;
    //       if (response.data.success) {
    //         const token = response.data.token;
    //         setItemToLs("myToken", token);
    //         setItemToLs("userName", user_name);
    //         setItemToLs("userEmail", user_email);
    //         navigate("/main");
    //       }
    //     })
    //     .catch((err) => {
    //       alert(err.response.data.errorMessage);
    //       inputRef.current.focus();
    //       setLoginValue({ ...loginValue, password: "" });
    //     });
    // }
  };

  const login = () => {
    return (
      <LoginContainer>
        <div className="signin-screen-wrap">
          <div className="signin-top">
            <div className="logo">
              <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="signin_title">Sign In</div>
            <div className="switch">
              <span>신규 사용자이신가요?</span>
              <div className="join" onClick={() => setShowLogin(!showLogin)}>
                회원가입
              </div>
            </div>
          </div>

          <LoginWrap>
            <EmailWrap>
              <FormWrap onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="userEmail"
                  value={userEmail || ""}
                  onChange={handleChange}
                  ref={inputRef}
                  className="siginIn-input"
                  placeholder="이메일 주소를 입력해주세요."
                />
                <input
                  type="password"
                  name="password"
                  value={password || ""}
                  onChange={handleChange}
                  ref={inputRef}
                  className="siginIn-input"
                  placeholder="비밀번호를 입력해주세요."
                />

                <div className="active-buttons">
                  <div className="need-help">
                    <img
                      src={loginHelp}
                      alt="loginHelp"
                      className="loginHelp_icon"
                    />
                    <span className="loginHelp_message">도움이 필요해요</span>
                  </div>

                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      all: "unset",
                      alignSelf: "flex-end",
                      transition: "all 0.2s linear",
                      borderRadius: "5px",
                      cursor: "pointer",
                      backgroundColor: isActive ? "#889AFF" : "#d5d8da",
                      position: "position",
                      textAlign: "center",
                      padding: "17px 47px",
                      fontWeight: "400",
                      fontSize: "18px",
                      lineHeight: "26px",
                      color: "#ffffff",
                    }}
                  >
                    로그인 하기
                  </Button>
                </div>
              </FormWrap>
            </EmailWrap>

            <ContinueWrap>
              <Divider />
              <div className="continue-text">or continue with</div>
              <Divider />
            </ContinueWrap>
            <SocialLogin />
          </LoginWrap>
        </div>
      </LoginContainer>
    );
  };

  return (
    <SignInStyle>
      <SignInBanner></SignInBanner>
      <SingInScreen>
        {showLogin ? (
          login()
        ) : (
          <Signup showLogin={showLogin} setShowLogin={setShowLogin} />
        )}
      </SingInScreen>
    </SignInStyle>
  );
};

const SignInStyle = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
`;
const SignInBanner = styled.div`
  width: 53%;
  background-color: yellowgreen;
  background: url(${loginBanner});
  background-size: cover;
  background-position: center;
`;

const SingInScreen = styled.div`
  display: flex;
  background-color: whitesmoke;
  width: 47%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const LoginWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EmailWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 95px;

  .siginIn-input {
    all: unset;
    outline: none;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #7a858e;
    border-bottom: 1px solid #dcdce8;
    padding: 23px 0px 10px 0px;

    ::placeholder {
      font-weight: 400;
      font-size: 18px;
      line-height: 26px;
      color: #cbcbd7;
    }
  }
  .active-buttons {
    margin-top: 38px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 171.5px;
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
`;

const ContinueWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;

  .continue-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #7a858e;
    width: 400px;
    margin: 0px 25px;
  }
`;

export default SignIn;
