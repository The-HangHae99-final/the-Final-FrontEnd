import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userReducer";
import { setItemToLs } from "./localStorage";
import Divider from "../elements/Divider";
import loginbg from "../public/img/loginbg.png";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const [loginValue, setLoginValue] = useState({
    userEmail: "",
    password: "",
  });
  const [showPwInput, setShowPwInput] = useState(false);
  const [showSignIn, setSignIn] = useState(false);
  const { userEmail, password } = loginValue;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.innerText.includes("이메일")) {
      // 등록된 이메일인지 확인
      axios
        .post("http://13.209.3.168:3001/api/users/email", {
          userEmail: loginValue.userEmail,
        })
        .then((response) => {
          if (response.data.success) {
            setShowPwInput(true);
            alert("이메일있다");
            inputRef.current.focus();
          }
        })
        .catch((error) => console.log(error));
    } else {
      // 입력한 비밀번호가 앞서 입력한 이메일과 매칭되는지 확인
      axios
        .post("http://13.209.3.168:3001/api/users/password", {
          userEmail: loginValue.userEmail,
          password: loginValue.password,
        })
        .then((response) => {
          console.log(response);
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

  const loginBox = (title, sub, join) => {
    return (
      <LoginStyle>
        <LoginWrap>
          <LoginTitle>{title}</LoginTitle>

          <EmailWrap>
            <FormWrap onSubmit={handleSubmit}>
              {!showPwInput ? (
                <>
                  <EmailLabel>이메일 주소</EmailLabel>
                  <EmailInput
                    id="textInput"
                    type="text"
                    name="userEmail"
                    value={userEmail || ""}
                    onChange={handleChange}
                    ref={inputRef}
                  />
                </>
              ) : (
                <>
                  <EmailLabel>비밀번호</EmailLabel>
                  <EmailInput
                    id="textInput"
                    type="password"
                    name="password"
                    value={password || ""}
                    onChange={handleChange}
                    ref={inputRef}
                  />
                </>
              )}
              <EmailSubmit type="submit" userEmail={userEmail}>
                계속
              </EmailSubmit>
              <div className="join" onClick={() => navigate("/signup")}>
                {join}
              </div>
            </FormWrap>
          </EmailWrap>

          <ContinueWrap>
            <Divider />
            <ContinueText>or continue with</ContinueText>
            <Divider />
          </ContinueWrap>

          <SocialLogin />
        </LoginWrap>
      </LoginStyle>
    );
  };

  useEffect(() => {
    inputRef.current.vlaue = "";
  }, [showPwInput]);

  return (
    <LoginBackGround>
      {!showSignIn ? (
        loginBox("Sign in", "이메일 주소", "JOIN US")
      ) : (
        <div>회원가입해</div>
      )}
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

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

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
  margin-top: 19px;
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

export default Login;

// return (
//   <LoginBackGround>
//     <LoginStyle>
//     <LoginWrap>
//     <LoginTitle>Sign in</LoginTitle>

//     <EmailWrap>
//           <EmailLabel>이메일 주소</EmailLabel>
//           <EmailInput id="textInput" type="text" />
//           </EmailWrap>
//     <EmailSubmit>계속</EmailSubmit>

//     <ContinueWrap>
//           <Divider />
//           <ContinueText>or continue with</ContinueText>
//           <Divider />
//         </ContinueWrap>

// <SocialLogin />

//       </LoginWrap>
//     </LoginStyle>
//     로그인페이지입니다
//     <form onSubmit={handleSubmit}>
//       {!showPwInput ? (
//         <>
//           <input
//             type="text"
//             placeholder="아이디"
//             name="userEmail"
//             value={loginValue.userEmail}
//             onChange={handleChange}
//           />
//           <button type="submit">계속</button>
//         </>
//       ) : (
//         <>
//           <input
//             type="text"
//             placeholder="비밀번호"
//             name="password"
//             value={loginValue.password}
//             onChange={handleChange}
//           />
//           <button type="submit">계속</button>
//         </>
//       )}
//     </form>
// <button onClick={() => navigate("/signup")}>회원가입하기</button>
//   </LoginBackGround>
// );
// };
