import React from "react";
import { KAKAO_AUTH_URL } from "../elements/introMain/Oauth";

const SocialLogin = () => {
  const onClickNaver = () => {
    window.location.href =
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=0wSIvykcfvmOTk3Dz4fS&state=teamnote&redirect_uri=http://localhost:3000/auth/login/callback";
  };

  const onClickKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      {/* <a href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=0wSIvykcfvmOTk3Dz4fS&state=teamnote&redirect_uri=http://localhost:3000/auth/login/callback">
        네이버 로그인
      </a> */}
      <button onClick={onClickNaver}>네이버 로그인</button>
      <button onClick={onClickKakao}>카카오 로그인</button>
      <button>구글 로그인</button>
    </div>
  );
};
// 주소창에
// https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=0wSIvykcfvmOTk3Dz4fS&client_secret=oQne0wSuP7&access_token=AAAANefUOe8jvoOYFOV1WiS0QZCD0SVN_JOtIg2WuRbDv24LdID7Sphk70difRV3rTX8cHmCKOuAX1Sb6HcVk0LjVJI&service_provider=NAVER
// 치면 네이버 로그아웃 가능
export default SocialLogin;
