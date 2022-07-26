import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import Main from "../pages/Main/Main";
import Board from "../pages/Board";
import Calender from "../pages/Calendar/Calendar";
import Message from "../pages/Message/Message";
import NaverLoginCallBack from "../elements/introMain/NaverLoginCallBack";
import KakaoLoginCallback from "../elements/introMain/KakaoLoginCallBack";
import Login from "../components/Login";
import PrivateMain from "../components/PrivateMain";
import ScreenForNewbie from "../components/ScreenForNewbie";
import Spinner from "../elements/Spinner";

const Router = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create" element={<ScreenForNewbie />} />

          <Route path="/main" element={<Main />} />
          <Route path="/main/:workSpaceName/*" element={<Main />}>
            <Route path="" element={<PrivateMain />} />
            <Route path="board" element={<Board />} />
            <Route path="calendar" element={<Calender />} />
            <Route path="message" element={<Message />} />
          </Route>

          <Route
            path="/api/auth/login/naver/callback/*"
            element={<NaverLoginCallBack />}
          />
          <Route
            path="/api/oauth/login/kakao/callback/*"
            element={<KakaoLoginCallback />}
          />
          <Route path="*" element={<div>There's nothing here!</div>} />
        </Routes>
      )}
    </>
  );
};

export default Router;
