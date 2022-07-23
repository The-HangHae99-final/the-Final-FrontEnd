// modules
import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWorkSpaceList } from "./redux/userReducer";

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
import { getItemFromLs } from "./utils/localStorage";
import ScreenForNewbie from "./components/ScreenForNewbie";
import Spinner from "./elements/Spinner";

const APP_USER_STATE = {
  UNKNOWN: "모름",
  NEWBIE: "워크스페이스가_없는_유저",
  USER: "워크스페이스가_있는_유저",
};

const App = () => {
  const [appState, setAppState] = useState(APP_USER_STATE.UNKNOWN);
  const user = useSelector((state) => state.user.value);

  // 뉴비인지 기존유저인지, 확인 중 상태인지에 따라 true or false
  const isLoading = appState === APP_USER_STATE.UNKNOWN;
  const isNewbieUser = appState === APP_USER_STATE.NEWBIE;

  console.log(user);
  useEffect(() => {
    setTimeout(() => {
      return setAppState(() =>
        user.workSpaceList.length ? APP_USER_STATE.USER : APP_USER_STATE.NEWBIE
      );
    }, 2000);
  }, [user?.workSpaceList?.length, appState]);

  // 접근 제한 라우팅 이슈
  // 1. Uncaught TypeError: Cannot read properties of undefined (reading 'length')

  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/main"
          element={
            isLoading ? (
              <Spinner />
            ) : (
              <Main isNewbieUser={isNewbieUser} />
              // <PrivateRoute isNewbieUser={isNewbieUser} component={<Main appState={appState}/> } />
            )
          }
        />

        <Route path="/board" element={<Board />} />
        <Route path="/calendar" element={<Calender />} />
        <Route path="/message" element={<Message />} />
        <Route
          path="/api/auth/login/naver/callback"
          element={<NaverLoginCallBack />}
        />
        <Route
          path="/api/oauth/login/kakao/callback"
          element={<KakaoLoginCallback />}
        />
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

// 워크 스페이스의 수에 변경이 일어날 때마다 user의 상태를 변경해줌

// GET으로 불러온 workspace 리스트 내에 workspace가 있는지 없지에따라 다른 화면을 보여줄 데이터
// 근데 리스트가 받아져 올 떄까지 기다렸다가 라우팅 시켜줘야함

// 문제1.
// 받아 올 떄까지 기다리는 동안 로그인 디렉션 되는 페이지(main)이 없음
// useEffect
// settimeout

// 접근1.
// useSelector에 workspaceList 값이 들어오면 true 안 들어오면 false 상태를 갖는 pending변수를 넣는다
// workspaceList를 불러올때 성공 처리로 dispatch로 workspaceList,pending을 업데이트 시켜준다.
// useSelector로부터 가져온 pending 값이 false일때는 spinner, true이면 <PrivateRoute/>를 보여주게끔 삼항연산자를 쓴다
