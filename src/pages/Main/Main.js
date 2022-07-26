import styles from "./main.module.css";
import Header from "../../components/Header/Header";
import { Link, Outlet, useParams } from "react-router-dom";
import LoginModal from "../../elements/LoginModal";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import PrivateMain from "../../components/PrivateMain";
import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/userReducer";
import { Routes, Route } from "react-router-dom";

import boardIcon from "../../public/img/image27.png";
import calendarIcon from "../../public/img/image25.png";
import chatIcon from "../../public/img/image26.png";
import ScreenForNewbie from "../../components/ScreenForNewbie";
import ScreenForUser from "../../components/ScreenForUser";
import Message from "../Message/Message";
import Board from "../Board";
import Calender from "../Calendar/Calendar";
import logo from "../../public/img/Main/logo_white.png";

import axios from "axios";
import { getItemFromLs, setItemToLs } from "../../utils/localStorage";
import Spinner from "../../elements/Spinner";

const APP_USER_STATE = {
  NOT_AUTH: "로그인되지 않은 상태",
  UNKNOWN: "모름",
  NEWBIE: "워크스페이스가_없는_유저",
  USER: "워크스페이스가_있는_유저",
};

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workSpaceList, setWorkSpaceList] = useState([]);

  const navigate = useNavigate();
  const params = useParams();
  // const REQUIRED_ID = id === undefined;
  const user = useSelector((state) => state.user.value);
  const workSpace = useSelector((state) => state.workSpace.value);
  const dispatch = useDispatch();

  // 소속된 워크스페이스 전체 조회
  useEffect(() => {
    try {
      axios
        .get("https://0jun.shop/api/members/spaceLists", {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        })
        .then((res) => {
          console.log("res: ", res);
          if (res.data.success) {
            const wsInfoList = res.data.includedList;
            const wsList = wsInfoList.map((ws) => ws.workSpace);
            console.log("wsList: ", wsList);
            dispatch(
              getUserInfo({
                ...user,
                workSpaceList: [...wsList],
                loaded: true,
              })
            );
          }
        });
    } catch {
      alert(" 불러오는 도중 에러가 발생했습니다 :(");
    }
  }, []);

  useEffect(() => {
    setItemToLs("workSpace", workSpace.current_workSpace);
  }, [workSpace]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <MainStyle>
      <LeftSide>
        <Link to="/main">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="buttons">
          <div className="buttonWrap">
            <div
              onClick={() => {
                navigate(`/main/${workSpace.current_workSpace}/board`);
              }}
              className="page-navigate-button"
            >
              <img src={boardIcon} alt="boardcon" className="boardcon" />
            </div>
          </div>
          <div className="buttonWrap">
            <div
              className="page-navigate-button"
              onClick={() =>
                navigate(`/main/${workSpace.current_workSpace}/calendar`)
              }
            >
              <img
                src={calendarIcon}
                alt="calendarIcon"
                className="calendarIcon"
              />
            </div>
          </div>
          <div className="buttonWrap">
            <div
              className="page-navigate-button"
              onClick={() =>
                navigate(`/main/${workSpace.current_workSpace}/message`)
              }
            >
              <img src={chatIcon} alt="chatIcon" className="chatIcon" />
            </div>
          </div>
        </div>
      </LeftSide>

      <RightSide>
        <Header />
        <main className="mainStyle">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <Outlet />
            </>
          )}
          {/* {isNewbieUser ? (
            <ScreenForNewbie
              // onClose={handleModal}
              addNewWorkSpace={addNewWorkSpace}
              workspaceName={workspaceName}
              setWorkspaceName={setWorkspaceName}
              handleWorkSpaceName={handleWorkSpaceName}
              modalOn={modalOn}
              setModalOn={setModalOn}
            />
          ) : (
            <>
              <PrivateMain />
              <Routes>
                <Route path="board" element={<Board />} />
                <Route path="calendar" element={<Calender />} />
                <Route path="message" element={<Message />} />
              </Routes>
            </>
          )} */}
        </main>
      </RightSide>
    </MainStyle>
  );
};

const MainStyle = styled.div`
  height: 100vh;
  display: flex;
`;

const LeftSide = styled.div`
  background-color: #889aff;
  height: 100%;
  width: 80px;
  min-width: 80px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
  box-sizing: border-box;

  .page-navigate-button {
    cursor: pointer;
  }

  .boardcon {
    width: 28px;
    height: 33px;
  }

  .calendarIcon {
    width: 32px;
    height: 35px;
  }

  .chatIcon {
    width: 34px;
    height: 34px;
  }

  .logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .buttons {
    margin-top: 121px;
    display: Flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 48px;
  }

  .buttonWrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    position: relative;
    transition: all 0.2s ease;
    cursor: pointer;

    :hover {
      background: #687cec;
    }

    :hover.buttonWrap::before {
      content: "";
      width: 10px;
      height: 100%;
      background: #4357c9;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

const RightSide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ecedf1;
  padding: 20px 20px 0px 20px;
  display: flex;
  overflow: hidden;

  .mainStyle {
    width: 100%;
    height: 100%;
    background-color: #ecedf1;
    padding: 20px;
    display: flex;
    gap: 20px;
    overflow: hidden;
  }
`;

export default Main;
