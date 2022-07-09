import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getCookie, setCookie } from "../../shared/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userReducer";

const NaverLoginCallBack = () => {
  const [userInfo, setUserInfo] = useState({
    user_email: "",
    user_name: "",
    userId: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setDatas] = useState({
    title: "",
    content: "",
    category: "",
    userId: "",
  });
  console.log(data);

  const getNaverToken = () => {
    const code = location.search.split("=")[1].split("&")[0];
    console.log("-------------1------------code: ", code);

    // 인가 코드 서버로 전송
    axios
      .post(`http://52.79.82.195:3001/api/naver`, {
        code: code,
      })
      .then((res) => {
        const token = res.data.access_token;
        console.log("-------------2------------token: ", token);

        if (token) {
        }
        // 받아온 토큰으로 유저 정보 조회
        axios
          .post(`http://52.79.82.195:3001/api/member`, {
            token,
          })
          .then((res) => {
            console.log("-------------3------------res: ", res);
            const user_email = res.data.response.email;
            const user_id = res.data.response.id;
            const user_name = res.data.response.name;
            dispatch(
              login({ user_name, user_email, user_id, isLoggedIn: true })
            );
            // 파싱 할 데이터 전달
            axios
              .post(`http://52.79.82.195:3001/api/parsing`, {
                user_email,
                user_id,
                user_name,
              })
              .then((res) => {
                console.log(res);
                localStorage.setItem("myToken", token);
                alert("네이버로 로그인 완료!");
                navigate("/");
              });
          })

          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNaverToken();
  }, []);

  return <div>네이버 콜백페이지입니다</div>;
};

export default NaverLoginCallBack;
