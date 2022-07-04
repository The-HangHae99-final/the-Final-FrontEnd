import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { setCookie } from "../../shared/cookie";

const KakaoLoginCallback = () => {
  const location = useLocation();

  const getNaverToken = () => {
    const code = location.search.split("=")[1];
    console.log(code);
    // 인가 코드 서버로 전송
    axios
      .post(`http://52.78.168.151:3000/oauth/callback/kakao`, {
        code: code,
      })
      .then((res) => {
        console.log(res);
        console.log(res.json());
        // const token = res.data.access_token;
        // console.log(token);
        // setCookie(token);
      });
  };

  // 받아온 토큰으로 유저 정보 조회
  //   axios
  //     .post(`http://52.78.168.151:3000/member`, {
  //       token,
  //     })
  //     .then((res) => {
  //       const user_email = res.data.response.email;
  //       const user_id = res.data.response.id;
  //       const user_name = res.data.response.name;

  //       axios
  //         .post(`http://52.78.168.151:3000/parsing`, {
  //           user_email,
  //           user_id,
  //           user_name,
  //         })
  //         .then((res) => console.log(res));
  //     })
  //     .catch((error) => console.log(error));
  // })
  // .catch((err) => console.log(err));
  // };

  useEffect(() => {
    getNaverToken();
  }, []);
  return <div>KakaoLoginCallback페이지입니다</div>;
};

export default KakaoLoginCallback;
