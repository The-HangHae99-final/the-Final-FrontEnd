import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const NaverLoginCallBack = () => {
  // const location = useLocation();

  // const getNaverToken = () => {
  //   const location = window.location.href.split("=")[1];
  //   console.log(location);
  //   const loca = location.split("&")[0];
  //   const header = {
  //     Authorization: loca,
  //   };
  //   console.log(header);
  //   fetch("http://52.78.168.151:3000/naver/information", {
  //     method: "get",
  //     headers: header,
  //   }).then((res) => console.log(res));
  // };

  // const getNaverToken = () => {
  //   if (!location.hash) {
  //     return;
  //   }
  //   const token = location.hash.split("=")[1].split("&")[0];
  //   const state = location.hash.split("=")[2].split("&")[0];

  //   axios
  //     .post(
  //       "http://52.78.168.151:3000/naver/information",
  //       {
  //         token,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //       console.log(res.json());
  //       //서버측에서 로직이 완료되면 홈으로 보내준다
  //       window.location.replace("/main");
  //     })
  //     .catch((error) => console.log(error));
  // };

  const location = useLocation();

  const getNaverToken = () => {
    const code = location.search.split("=")[1].split("&")[0];
    const state = location.search.split("=")[2].split("&")[0];
    // const res = axios({
    //   method: "POST",
    //   url: `http://52.78.168.151:3000/naver?code=${code}`,
    // }).then((res) => console.log(res));

    axios
      .post(`http://52.78.168.151:3000/naver`, {
        code: code,
        state: state,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNaverToken();
  }, []);

  return <div>축하합니다 로그인!</div>;
};

export default NaverLoginCallBack;
