import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { setCookie } from "../../shared/cookie";

const KakaoLoginCallback = () => {
  const [userInfo, setUserInfo] = useState({
    user_email: "",
    user_id: "",
    user_name: "",
  });
  const { user_email, user_id, user_name } = userInfo;
  const location = useLocation();

  const getKakaoToken = () => {
    const code = location.search.split("=")[1];
    console.log(code);
    // 인가 코드 서버로 전송
    axios
      .post(`http://52.78.168.151:3001/auth/login/kakao/callback`, {
        code: code,
      })
      .then((res) => {
        const token = res.data;
        setCookie("myToken", token);
        axios
          .post(`http://52.78.168.151:3001/kakao/member`, {
            token,
          })
          .then((res) => {
            const user_email = res.data.kakao_account.email;
            const user_id = res.data.id;
            const user_name = res.data.kakao_account.profile.nickname;
            console.log(user_email, user_id, user_name); // 성공
            setUserInfo({
              user_email,
              user_id,
              user_name,
            });
            axios
              .post(`http://52.78.168.151:3001/kakao/parsing`, {
                user_email,
                user_id,
                user_name,
              })
              .then((res) => console.log(res));
          });
      })
      .catch((err) => console.log(err));
  };

  //   받아온 토큰으로 유저 정보 조회

  useEffect(() => {
    getKakaoToken();
  }, []);
  return (
    <div>
      user_name: {user_name}, user_id: {user_id}
    </div>
  );
};

export default KakaoLoginCallback;
