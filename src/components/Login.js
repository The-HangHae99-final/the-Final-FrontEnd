import React from "react";
import { KAKAO_AUTH_URL } from "../elements/introMain/Oauth";

const Login = () => {
  const onClickKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <a href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=0wSIvykcfvmOTk3Dz4fS&state=teamnote&redirect_uri=http://localhost:3000/auth/login/callback">
        네이버 로그인
      </a>
      <button onClick={onClickKakao}>카카오 로그인</button>
    </div>
  );
};

export default Login;
