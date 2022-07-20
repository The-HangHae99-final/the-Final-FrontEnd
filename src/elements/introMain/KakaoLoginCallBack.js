import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userReducer";
import { getItemFromLs, setItemToLs } from "../../components/localStorage";
import Spinner from "../../components/Spinner";
import loginbg from "../../public/img/loginBg.png";
import styled from "styled-components";

const KakaoLoginCallback = () => {
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getKakaoToken = () => {
    const code = location.search.split("=")[1];

    // 인가 코드 서버로 전송
    axios
      .post(`https://0jun.shop/api/auth/login/kakao/callback`, {
        code: code,
      })

      .then((res) => {
        console.log(res);
        const token = res.data;
        // 서버가 받아온 유저 정보 조회
        axios
          .post(
            `https://0jun.shop/api/kakao/member`,
            {
              token,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            const user_email = res.data.kakao_account.email;
            const user_id = res.data.id;
            const user_name = res.data.kakao_account.profile.nickname;
            dispatch(
              login({ user_name, user_email, user_id, isLoggedIn: true })
            );

            axios
              .post(
                `https://0jun.shop/api/kakao/parsing`,
                {
                  user_email,
                  user_name,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((res) => {
                const newToken = res.data.token;
                setItemToLs("myToken", newToken);
                setItemToLs("userName", user_name);
                setItemToLs("userEmail", user_email);
                setLoading(false);
                navigate("/main");
              });
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getKakaoToken();
    setLoading(true);
  }, []);

  return <LoginBackGround>{loading && <Spinner />}</LoginBackGround>;
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

export default KakaoLoginCallback;
