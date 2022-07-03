import React from "react";

const Login = () => {
  return (
    <div>
      <a href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=0wSIvykcfvmOTk3Dz4fS&state=teamnote&redirect_uri=http://localhost:3000/auth/login/callback">
        로그인
      </a>
    </div>
  );
};

export default Login;
