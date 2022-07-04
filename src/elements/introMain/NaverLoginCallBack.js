import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { setCookie } from "../../shared/cookie";
import { useNavigate } from "react-router-dom";

const NaverLoginCallBack = () => {
  const [accessToken, setAccessToken] = useState("");
  const [showMain, setShowMain] = useState(false);
  console.log(showMain);
  const location = useLocation();
  const navigate = useNavigate();

  const getNaverToken = () => {
    const code = location.search.split("=")[1].split("&")[0];

    // 인가 코드 서버로 전송
    axios
      .post(`http://52.78.168.151:3000/naver`, {
        code: code,
      })
      .then((res) => {
        const token = res.data.access_token;
        setCookie("myToken", token);
        setAccessToken(token);
        if (token) {
          setShowMain(true);
        }
        // 받아온 토큰으로 유저 정보 조회
        axios
          .post(`http://52.78.168.151:3000/member`, {
            token,
          })
          .then((res) => {
            const user_email = res.data.response.email;
            const user_id = res.data.response.id;
            const user_name = res.data.response.name;

            axios
              .post(`http://52.78.168.151:3000/parsing`, {
                user_email,
                user_id,
                user_name,
              })
              .then((res) => {
                navigate("/main");
              });
          })

          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
  };
  console.log(accessToken);
  const naverLogout = () => {
    axios.get(
      `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=0wSIvykcfvmOTk3Dz4fS&client_secret=oQne0wSuP7&access_token=${accessToken}&service_provider=NAVER`
    );
  };

  useEffect(() => {
    getNaverToken();
  }, []);

  return (
    <div>
      네이버 콜백페이지입니다
      <button onClick={naverLogout}>로그아웃</button>
    </div>
  );
};

export default NaverLoginCallBack;
