import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";
import NaverLoginCallBack from "./elements/introMain/NaverLoginCallBack";
import KakaoLoginCallback from "./elements/introMain/KakaoLoginCallBack";
import { getCookie } from "./shared/cookie";
import { useSelector } from "react-redux";
import Modal from "./components/Modal";

// pages
import Main from "./pages/Main/Main";
import Board from "./pages/Board";
import Message from "./pages/Message/Message";
import Calender from "./pages/Calender";
import Storage from "./pages/Storage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const user = useSelector((state) => state.user.value);

  const handleLogin = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
    setIsSignupModalOpen(false);
  };
  console.log(user.isLoggedIn);
  const handleSignup = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
    setIsLoginModalOpen(false);
  };

  return (
    <div>
      <GlobalStyle />
      <Routes>
        {user.isLoggedIn ? (
          <>
            <Route
              path="/"
              element={
                <Main
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleLogin}
                  handleSignup={handleSignup}
                  isLoginModalOpen={isLoginModalOpen}
                  isSignupModalOpen={isSignupModalOpen}
                />
              }
            >
              <Route path="board" element={<Board />} />
              <Route path="calender" element={<Calender />} />
              <Route path="message" element={<Message />} />
              <Route path="storage" element={<Storage />} />
            </Route>
          </>
        ) : (
          <Route
            path="/"
            element={
              <Main
                isLoggedIn={isLoggedIn}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                isLoginModalOpen={isLoginModalOpen}
                isSignupModalOpen={isSignupModalOpen}
              />
            }
          >
            <Route
              path="auth/login/callback"
              element={<NaverLoginCallBack />}
            />
            <Route
              path="auth/login/kakao/callback"
              element={<KakaoLoginCallback />}
            />
          </Route>
        )}
      </Routes>
    </div>
  );
};

export default App;
