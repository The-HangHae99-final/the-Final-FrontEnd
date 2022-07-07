import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { setCookie } from "../../shared/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userReducer";

const KakaoLoginCallback = () => {
  const [userInfo, setUserInfo] = useState({
    user_email: "",
    user_id: "",
    user_name: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getKakaoToken = () => {
    const code = location.search.split("=")[1];
    // 인가 코드 서버로 전송
    axios
      .post(`http://13.125.169.225:3001/auth/login/kakao/callback`, {
        code: code,
      })
      .then((res) => {
        const token = res.data;
        console.log("token: ", token);
        axios
          .post(`http://13.125.169.225:3001/kakao/member`, {
            token,
          })
          .then((res) => {
            console.log(`member req : ${res}`);
            const user_email = res.data.kakao_account.email;
            const user_id = res.data.id;
            const user_name = res.data.kakao_account.profile.nickname;
            dispatch(
              login({ user_name, user_email, user_id, isLoggedIn: true })
            );

            axios
              .post(`http://13.125.169.225:3001/kakao/parsing`, {
                user_email,
                user_id,
                user_name,
              })
              .then((res) => {
                localStorage.setItem("myToken", token);
                alert("카카오로 로그인 완료!");
                navigate("/");
              });
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getKakaoToken();
  }, []);

  return <div>카카오 콜백페이지 입니다.</div>;
};

export default KakaoLoginCallback;
