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
import ResponsiveLayout from "../Layout/responsive.layout";
import { ToastContainer } from "react-toastify";

const Router = () => {
  return (
    <ResponsiveLayout>
      <Routes>
        <Route path="/join" element={<JoinRouter />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/main" element={<PublicMain />} />
        <Route path="/main/:workSpaceName/*" element={<Main />}>
          <Route path="" element={<PrivateMain />} />
          <Route path="board" element={<Board />} />
          <Route path="calendar" element={<Calender />} />
          <Route path="message" element={<Message />} />
        </Route>

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
    </ResponsiveLayout>
  );
};

export default Router;
