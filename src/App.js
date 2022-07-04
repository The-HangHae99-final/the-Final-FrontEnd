import React, { useState } from "react";
import Login from "./components/Login";
import GlobalStyle from "./styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import NaverLoginCallBack from "./elements/introMain/NaverLoginCallBack";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <GlobalStyle />
      <Login />
      <Routes>
        <Route path="/" element={<div>로그인을 합시다 뾰로롱</div>} />
        <Route path="/main" element={<Main />} />
        <Route path="/auth/login/callback" element={<NaverLoginCallBack />} />
      </Routes>
    </div>
  );
};

export default App;
