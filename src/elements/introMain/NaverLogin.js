import React, { useEffect } from "react";

const { naver } = window;

function NaverLogin() {
  //   const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
  // const callbackUrl = process.env.REACT_APP_NAVER_CALLBACK_URL;
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "0wSIvykcfvmOTk3Dz4fS",
      callbackUrl: "http://localhost:3000/auth/login/callback",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "white", type: 1, height: "47" }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
    naverLogin.getLoginStatus(function (status) {
      console.log(status);
      //     if (status) {
      //         const nickName=naverLogin.user.getNickName();
      //         const age=naverLogin.user.getAge();
      //         const birthday=naverLogin.user.getBirthday();

      //         if(nickName===null||nickName===undefined ){
      //           alert("별명이 필요합니다. 정보제공을 동의해주세요.");
      //           naverLogin.reprompt();
      //           return ;
      //        }else{
      //         setLoginStatus();
      //        }
      // }
    });
    console.log(naverLogin);
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return <div id="naverIdLogin" />;
}

export default NaverLogin;
