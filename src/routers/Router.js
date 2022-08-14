import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Spinner from "../elements/Spinner";

// 페이지
import Main from "../pages/Main/Main";
import Board from "../pages/Board";
import Calender from "../pages/Calendar/Calendar";
import Message from "../pages/Message/Message";
import NaverLoginCallBack from "../elements/introMain/NaverLoginCallBack";
import KakaoLoginCallback from "../elements/introMain/KakaoLoginCallBack";
import PrivateMain from "../components/PrivateMain";
import JoinRouter from "./JoinRouter";
import { SignIn } from "../components/SignIn/SignIn.js";
import Signup from "../components/SignIn/Signup";
import { useMediaQuery } from "react-responsive";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header/Header";
import Aside from "../components/Aside";
import { getItemFromLs } from "../utils/localStorage";
import isLogin from "../utils/isLogin";

// 로그인 후
// 1. 워크스페이스 선택 전 화면
// => /main
// 2. 워크스페이스 선택 후 해당 워크스페이스의 BOARD페이지로 이동
// => /main/123/board
// 3. 워크스페이스 선택 후 다른 페이지 이동
// => /main/123/calendar or /main/123/chat

// * 로그인 전에 /main 입력 시 처리
console.log("isLogin(): ", isLogin());

const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/join" element={<JoinRouter />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route
          path="/main"
          element={isLogin() ? <Main /> : <Navigate to="/join/signin" />}
        ></Route>
        <Route path="/main/:id/*" element={<Main />}>
          <Route path="board" element={<Board />} />
          <Route path="calendar" element={<Calender />} />
          <Route path="talk" element={<Message />} />
        </Route>

        <Route
          path="/api/auth/login/naver/callback"
          element={<NaverLoginCallBack />}
        />
        <Route
          path="/api/oauth/login/kakao/callback"
          element={<KakaoLoginCallback />}
        />
        <Route path="*" element={<Navigate to="/join/signin" />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default Router;
