// modules
import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";

// page, components, elements
import Main from "./pages/Main/Main";
import Board from "./pages/Board";
import Message from "./pages/Message/Message";
import Calender from "./pages/Calendar/Calendar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NaverLoginCallBack from "./elements/introMain/NaverLoginCallBack";
import KakaoLoginCallback from "./elements/introMain/KakaoLoginCallBack";
import PrivateMain from "./components/PrivateMain";
import PrivateRoute from "./components/PrivateRoute";
import { getItemFromLs } from "./components/localStorage";
import ScreenForNewbie from "./components/ScreenForNewbie";

const App = () => {
  const [restriced, setRestriced] = useState(false);
  const hasWorkspace = getItemFromLs("workspace");
  const access = getItemFromLs("myToken");

  return (
    <div>
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        {/* <Route
          path="/main"
          element={
            <PrivateRoute
              component={<ScreenForNewbie />}
            />
          }
        /> */}
        <Route path="/board" element={<Board />} />
        <Route path="/calendar" element={<Calender />} />
        <Route path="/message" element={<Message />} />
        <Route
          path="/api/auth/login/naver/callback"
          element={<NaverLoginCallBack />}
        />
        <Route path="/oauth/kakao/callback" element={<KakaoLoginCallback />} />
        <Route path="/main/:id" element={<Main />}>
          <Route path="newbie" element={<ScreenForNewbie />} />
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
