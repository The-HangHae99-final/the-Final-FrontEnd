import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userReducer";
import { setItemToLs } from "../../utils/localStorage";
import Spinner from "../Spinner";
import styled from "styled-components";

const NaverLoginCallBack = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const getNaverToken = () => {
    const code = location.search.split("=")[1].split("&")[0];
    console.log("-------------1------------code: ", code);
    // 인가 코드 서버로 전송
    axios
      .post(`https://teamnote.shop/api/naver`, {
        code: code,
      })
      .then((res) => {
        console.log(res);
        const token = res.data.access_token;
        console.log("-------------2------------token: ", token);

        if (token) {
        }
        // 받아온 토큰으로 유저 정보 조회
        axios
          .post(`https://teamnote.shop/api/member`, {
            token,
          })
          .then((res) => {
            console.log("-------------3------------res: ", res);
            const user_email = res.data.response.email;
            const user_id = res.data.response.id;
            const user_name = res.data.response.name;
            dispatch(
              login({
                ...user,
                user_name,
                user_email,
                user_id,
                isLoggedIn: true,
              })
            );
            // 파싱 할 데이터 전달
            axios
              .post(`https://teamnote.shop/api/parsing`, {
                user_email,
                user_id,
                user_name,
                token,
              })
              .then((res) => {
                console.log("res: ", res);

                if (res.data.token) {
                  const newToken = res.data.token;
                  setItemToLs("myToken", newToken);
                  setItemToLs("userName", user_name);
                  setItemToLs("userEmail", user_email);
                  setLoading(false);
                  navigate("/main");
                }
              })
              .catch((err) => console.log(err));
          })

          .catch((error) => console.log(error));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNaverToken();
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
  background-size: cover;
  background-position: center;
`;

export default NaverLoginCallBack;
