import React, { useState } from "react";
import Login from "./components/Login";
import GlobalStyle from "./styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import NaverLoginCallBack from "./elements/introMain/NaverLoginCallBack";
import KakaoLoginCallback from "./elements/introMain/KakaoLoginCallBack";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <GlobalStyle />
      <Login />
      <Routes>
        <Route path="/" element={<div>홈 화면입니다</div>} />
        <Route path="/main" element={<Main />} />
        <Route path="/auth/login/callback" element={<NaverLoginCallBack />} />
        <Route
          path="/auth/login/kakao/callback"
          element={<KakaoLoginCallback />}
        />
      </Routes>
    </div>
  );
};

export default App;
