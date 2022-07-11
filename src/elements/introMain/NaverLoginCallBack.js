import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getCookie, setCookie } from "../../shared/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userReducer";
import { setItemToLs } from "../../components/localStorage";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas({ ...data, [name]: value });
  };

  const getNaverToken = () => {
    const code = location.search.split("=")[1].split("&")[0];

    // 인가 코드 서버로 전송
    axios
      .post(`http://52.78.168.151:3001/naver`, {
        code: code,
      })
      .then((res) => {
        const token = res.data.access_token;

        if (token) {
        }
        // 받아온 토큰으로 유저 정보 조회
        axios
          .post(`http://13.125.169.225/member`, {
            token,
          })
          .then((res) => {
            const user_email = res.data.response.email;
            const user_id = res.data.response.id;
            const user_name = res.data.response.name;
            dispatch(
              login({ user_name, user_email, user_id, isLoggedIn: true })
            );
            axios
              .post(`http://13.125.169.225/parsing`, {
                user_email,
                user_id,
                user_name,
              })
              .then((res) => {
                setItemToLs("myToken", token);
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
