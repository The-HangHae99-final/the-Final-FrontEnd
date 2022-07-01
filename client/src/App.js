import React, { useState } from "react";
import Login from "./components/Login";
import GlobalStyle from "./styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <GlobalStyle />
      <Login />
    </div>
  );
};

export default App;
