// modules
import React, { useEffect, useMemo, useState } from "react";
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
import ScreenForNewbie from "./components/ScreenForNewbie";
import Spinner from "./elements/Spinner";
// import isLogin from "./utils/isLogin";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import axios from "axios";
import { getItemFromLs } from "./utils/localStorage";
import isLogin from "./utils/isLogin";
import PublicMain from "./components/PublicMain";

export const APP_USER_STATE = {
  NOT_AUTH: "로그인되지 않은 상태",
  UNKNOWN: "모름",
  NEWBIE: "워크스페이스가_없는_유저",
  USER: "워크스페이스가_있는_유저",
};

const App = () => {
  console.log("렌더링");
  const user = useSelector((state) => state.user.value);
  const [appState, setAppState] = useState(APP_USER_STATE.UNKNOWN);
  const isLoggedIn = appState === APP_USER_STATE.NOT_AUTH;
  const isLoading = appState === APP_USER_STATE.UNKNOWN;
  const isNewbieUser = appState === APP_USER_STATE.NEWBIE;

  // lessUpdateAppstate();
  // const isNewbieUser = useMemo(() => {
  //   return appState === APP_USER_STATE.NEWBIE;
  // }, [user?.workSpaceList]);

  console.log("isNewbieUser: ", isNewbieUser);
  console.log("user: ", user);

  // 유저 값이 업데이트 되야만 isnewbieUser를 바꿔준다.
  //

  useEffect(() => {
    setTimeout(() => {
      setAppState(() => {
        if (!user) return;
        return user.workSpaceList.length === 0
          ? APP_USER_STATE.NEWBIE
          : APP_USER_STATE.USER;
      });
    }, 2000);
  }, [user, user?.workSpaceList]);

  console.log("appState: ", appState);
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/main"
          element={
            isLoading ? <Spinner /> : <Main isNewbieUser={isNewbieUser}></Main>
          }
        />
        <Route patj="/main/:id/*" element={<Main />}>
          {/* <Route path="board" element={<Board />} />
          <Route path="calendar" element={<Calender />} />
          <Route path="message" element={<Message />} /> */}
        </Route>
        <Route
          path="/api/auth/login/naver/callback"
          element={<NaverLoginCallBack />}
        />
        <Route
          path="/api/oauth/login/kakao/callback"
          element={<KakaoLoginCallback />}
        />
        {/* <Route path="/board" element={<Board />} />
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
    </Route> */}
      </Routes>
    </div>
  );
};

export default App;

// <div>
//   <GlobalStyle />
//   <Routes>
//     <Route path="/" element={<Login />} />
//     <Route path="/signup" element={<Signup />} />
//     <Route
//       path="/main"
//       element={
//         isLoading ? <Spinner /> : <Main isNewbieUser={isNewbieUser} />
//       }
//     >
//       <Route path="message" element={<Message />} />
//       <Route path="board" element={<Board />} />
//       <Route path="calendar" element={<Calender />} />
//     </Route>
//     {/* <Route path="/main" element={<PrivateMain />}>
//     </Route> */}
//     <Route path="*" element={<div>No one here..</div>} />
{
  /* <AuthRoute path="/main" element={<Main />}/> */
}
{
  /* {isLogin() ? (
          <Route
            path="/main"
            element={
              <Main />
              // isLoading ? (
              //   <Spinner />
              // ) : (
              //   <PrivateRoute
              //     setAppState={setAppState}
              //     isNewbieUser={isNewbieUser}
              //     component={<Main />}
              //   />
              // )
            }
          />
        ) : (
          <Route path="/main" element={<Spinner />} />
        )} */
}
{
  /* // <Navigate to="/login"></Navigate> */
}
{
  /* <Route path="/" element={<Login />} />
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
        </Route> */
}
//   </Routes>
// </div>

// switch (appState) {
//   case APP_USER_STATE.NOT_AUTH:
//     break;
//   case APP_USER_STATE.UNKNOWN:
//     <Spinner />;
//     break;
//   case APP_USER_STATE.NEWBIE:
//     <ScreenForNewbie />;
//     break;
//   case APP_USER_STATE.USER:
//   default:
//     return (
//       <div>
//         <GlobalStyle />
//         <Route
//           path="/main"
//           element={
//             isLoading ? (
//               <Spinner />
//             ) : (
//               <Main isNewbieUser={isNewbieUser} />
//               // <PrivateRoute isNewbieUser={isNewbieUser} component={<Main appState={appState}/> } />
//             )
//           }
//         />
//       </div>
//     )
// }
