import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "../elements/Spinner";

// 페이지
import Main from "../pages/Main/Main";
import Board from "../pages/Board";
import Calender from "../pages/Calendar/Calendar";
import Message from "../pages/Message/Message";
import NaverLoginCallBack from "../elements/introMain/NaverLoginCallBack";
import KakaoLoginCallback from "../elements/introMain/KakaoLoginCallBack";
import PrivateMain from "../components/PrivateMain";
import PublicMain from "../components/PublicMain";
import JoinRouter from "./JoinRouter";
import { SignIn } from "../components/SignIn/SignIn.js";
import Signup from "../components/SignIn/Signup";
import { useMediaQuery } from "react-responsive";
import { ToastContainer } from "react-toastify";

// 로그인 후
// 1. 워크스페이스 선택 전 화면
// => /main
// 2. 워크스페이스 선택 후 해당 워크스페이스의 BOARD페이지로 이동
// => /main/123/board
// 3. 워크스페이스 선택 후 다른 페이지 이동
// => /main/123/calendar or /main/123/chat
// 해결 :

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/join" element={<JoinRouter />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/main" element={<Main />} />

        <Route path="/main/pm/*" element={<PrivateMain />}>
          <Route path="board" element={<Board />} />
          <Route path="calendar" element={<Calender />} />
          <Route path="message" element={<Message />} />
        </Route>
        {/* <Route path="/main/:workSpaceName/board" element={<Board />} />
        <Route path="/main/:workSpaceName/calendar" element={<Board />} />
        <Route path="/main/:workSpaceName/message" element={<Board />} /> */}

        <Route
          path="/api/auth/login/naver/callback"
          element={<NaverLoginCallBack />}
        />
        <Route
          path="/api/oauth/login/kakao/callback"
          element={<KakaoLoginCallback />}
        />
        <Route path="*" element={<div>There's nothing here!</div>} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default Router;
