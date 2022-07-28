import Header from "./Header/Header";
import { Link, Outlet, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import boardIcon from "../public/img/image27.png";
import calendarIcon from "../public/img/image25.png";
import chatIcon from "../public/img/image26.png";
import ScreenForNewbie from "./ScreenForNewbie";
import ScreenForUser from "../components/ScreenForUser";
import logo from "../public/img/Main/logo_white.png";

import axios from "axios";
import { getItemFromLs, setItemToLs } from "../utils/localStorage";
import Spinner from "../elements/Spinner";
import { getUserInfo } from "../redux/userReducer";

export const APP_USER_STATE = {
  NOT_AUTH: "로그인되지 않은 상태",
  UNKNOWN: "모름",
  NEWBIE: "워크스페이스가_없는_유저",
  USER: "워크스페이스가_있는_유저",
};

const Main = () => {
  const [appstate, setAppState] = useState(APP_USER_STATE.UNKNOWN);
  const isLoading = appstate === APP_USER_STATE.UNKNOWN;
  const [openNewbieModal, setOpenNewbieModal] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const workSpace = useSelector((state) => state.workSpace.value);
  const dispatch = useDispatch();
  const params = useParams();
  const currentParams = params.workSpaceName;

  // 소속된 워크스페이스 전체 조회
  useEffect(() => {
    try {
      axios
        .get("http://43.200.170.45/api/members/spaceLists", {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            const wsInfoList = res.data.includedList;
            const workSpaceFullname = wsInfoList.map((ws) => {
              return ws.workSpace;
            });
            if (wsInfoList.length === 0) {
              setAppState(APP_USER_STATE.NEWBIE);
              setOpenNewbieModal(true);
            } else {
              setAppState(APP_USER_STATE.USER);
            }

            axios
              .get(`http://43.200.170.45/api/members/inviting`, {
                headers: {
                  Authorization: `Bearer ${getItemFromLs("myToken")}`,
                },
              })
              .then((res) => {
                if (res.data.success) {
                  dispatch(
                    getUserInfo({
                      workSpaceList: [...workSpaceFullname],
                      invitation: [...res.data.result],
                    })
                  );
                }
              })
              .catch((err) => console.log(err));
          }
        });
    } catch {
      alert(" 불러오는 도중 에러가 발생했습니다 :(");
    }
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
              {appstate === APP_USER_STATE.USER ? (
                <ScreenForUser />
              ) : (
                <ScreenForNewbie />
              )}
              {/* 홈버튼 누르면 빈 화면 출력
              => Params 값의 유무에 따라 Outlet 렌더링 해야할까? */}
            </>
          )}
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
  display: flex;

  .mainStyle {
    width: 100%;
    height: 100%;
    background-color: #ecedf1;
    padding: 20px;
    display: flex;
    gap: 20px;
  }
`;

export default Main;
