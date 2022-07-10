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
import Calender from "./pages/Calendar/Calendar";
import Storage from "./pages/Storage";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const user = useSelector((state) => state.user.value);

  const handleLogin = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
    setIsSignupModalOpen(false);
  };

  const handleSignup = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
    setIsLoginModalOpen(false);
  };
  console.log(user.isLoggedIn);
  return (
    <div>
      <GlobalStyle />
      <Routes>
        {user.isLoggedIn ? (
          <>
            <Route
              path="/main"
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
              <Route path="calendar" element={<Calender />} />
              <Route path="message" element={<Message />} />
              <Route path="storage" element={<Storage />} />
            </Route>
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <Login />
                // <Main
                //   isLoggedIn={isLoggedIn}
                //   handleLogin={handleLogin}
                //   handleSignup={handleSignup}
                //   isLoginModalOpen={isLoginModalOpen}
                //   isSignupModalOpen={isSignupModalOpen}
                // />
              }
            />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
      {/* <Route
          path="auth/login/callback"
          element={<NaverLoginCallBack />}
        />
        <Route
          path="auth/login/kakao/callback"
          element={<KakaoLoginCallback />}
        /> */}
    </div>
  );
};

export default App;
