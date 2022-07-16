// modules
import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";

// page, components, elements
import Main from "./pages/Main/Main";
import Board from "./pages/Board";
import Message from "./pages/Message/Message";
import Calender from "./pages/Calendar/Calendar";
import Storage from "./pages/Storage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NaverLoginCallBack from "./elements/introMain/NaverLoginCallBack";
import KakaoLoginCallback from "./elements/introMain/KakaoLoginCallBack";
import PrivateMain from "./components/PrivateMain";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path="/board" element={<Board />} />
        <Route path="/calendar" element={<Calender />} />
        <Route path="/message" element={<Message />} />
        <Route path="auth/login/callback" element={<NaverLoginCallBack />} />
        <Route
          path="auth/login/kakao/callback"
          element={<KakaoLoginCallback />}
        />
        <Route path="/main/:id" element={<Main />}>
          <Route path="private" element={<PrivateMain />} />
          <Route path="board" element={<Board />} />
          <Route path="calendar" element={<Calender />} />
          <Route path="message" element={<Message />} />
          <Route path="*" element={<div>There's nothing here!</div>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
