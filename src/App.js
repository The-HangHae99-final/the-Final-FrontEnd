import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";
import NaverLoginCallBack from "./elements/introMain/NaverLoginCallBack";
import KakaoLoginCallback from "./elements/introMain/KakaoLoginCallBack";
import { getCookie } from "./shared/cookie";
import { useDispatch, useSelector } from "react-redux";

// pages & components
import Main from "./pages/Main/Main";
import Board from "./pages/Board";
import Message from "./pages/Message/Message";
import Calender from "./pages/Calendar/Calendar";
import Storage from "./pages/Storage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Modal from "./components/Modal";
import { login } from "./redux/userReducer";

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const isLoggedIn = user.isLoggedIn;
  const handleLogin = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
    setIsSignupModalOpen(false);
  };

  const handleSignup = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
    setIsLoginModalOpen(false);
  };

  // loadUsser func.

  const ls = localStorage.getItem("myToken");

  // useEffect(() => {
  //   const loadUser = () => {
  //     try {

  //       // user 값이 없다면 아무것도 리턴하지 않음
  //       if (!user) return;

  //       // user 값이 있다면 dispatch로 로그인 상태를 true로 업데이트
  //       dispatch(login({ ...user, isLoggedIn: true }));
  //       return <div>로그인 됬을 때 보여질 것들</div>
  //     } catch (e) {
  //       console.log("local storage is not working");
  //     }
  //   };
  //   loadUser();
  // }, []);

  console.log(user.isLoggedIn);

  return (
    <div>
      <GlobalStyle />
      <Routes>
        {ls ? (
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
