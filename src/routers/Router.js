import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Main from "../pages/Main/Main";
import Board from "../pages/Board";
import Calender from "../pages/Calendar/Calendar";
import Message from "../pages/Message/Message";
import NaverLoginCallBack from "../elements/introMain/NaverLoginCallBack";
import KakaoLoginCallback from "../elements/introMain/KakaoLoginCallBack";

const Router = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main/" element={<Main />} />
        <Route path="/main/:id" element={<Main />} />
        <Route path="/main/:id/board" element={<Board />} />
        <Route path="/main/:id/calendar" element={<Calender />} />
        <Route path="/main/:id/message" element={<Message />} />{" "}
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
    </div>
  );
};

export default Router;
