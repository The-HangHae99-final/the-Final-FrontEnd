import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/userReducer";
import axios from "axios";
import { getItemFromLs } from "../../utils/localStorage";
import ScreenForNewbie from "../../components/ScreenForNewbie";
import Spinner from "../../elements/Spinner";
import Header from "../../components/Header/Header";

// 이미지
import boardIcon from "../../public/img/image27.png";
import calendarIcon from "../../public/img/calendar.png";
import chatIcon from "../../public/img/comment.png";
import logo from "../../public/img/Main/logo_white.png";

export const APP_USER_STATE = {
  NOT_AUTH: "로그인되지 않은 상태",
  UNKNOWN: "모름",
  NEWBIE: "워크스페이스가_없는_유저",
  USER: "워크스페이스가_있는_유저",
};

const Main = () => {
  const [appstate, setAppState] = useState(APP_USER_STATE.UNKNOWN);
  const isLoading = appstate === APP_USER_STATE.UNKNOWN;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const params = useParams();
  const currentParams = params.workSpaceName;

  useEffect(() => {
    try {
      // 소속된 워크스페이스 리스트 조회 요청
      axios
        .get("https://teamnote.shop/api/members/spaceLists", {
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
            // 앱 상태(3가지)에 따라 조건부 렌더링
            // 1. 앱 상태가 확인 될 때까지 앱상태 UNKNOWN => spinner
            // 2. 로그인한 사용자의 워크스페이스가 비어있으면 앱상태 NEWBIE로 변경 => 신규 사용자 화면
            // 3. 로그인한 사용자의 워크스페이스가 있으면 앱상태 USER로 변경 => 기존 유저 화면
            if (wsInfoList.length === 0) {
              setAppState(APP_USER_STATE.NEWBIE);
            } else {
              setAppState(APP_USER_STATE.USER);
            }

            // 받은 초대메시지 목록 요청
            axios
              .get(`https://teamnote.shop/api/members/inviting`, {
                headers: {
                  Authorization: `Bearer ${getItemFromLs("myToken")}`,
                },
              })
              .then((res) => {
                if (res.data.success) {
                  dispatch(
                    getUserInfo({
                      ...user,
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
        <div className="buttons">
          <div className="buttonWrap">
            <div
              onClick={() => {
                navigate(`/main/${currentParams}/board`);
              }}
              className="page-navigate-button"
            >
              <img
                src={boardIcon}
                alt="boardcon"
                className="side-btn boardcon"
              />
            </div>
          </div>
          <div className="buttonWrap">
            <div
              className="page-navigate-button"
              onClick={() => navigate(`/main/${currentParams}/calendar`)}
            >
              <img
                src={calendarIcon}
                alt="calendarIcon"
                className="calendarIcon side-btn"
              />
            </div>
          </div>
          <div className="buttonWrap">
            <div
              className="page-navigate-button"
              onClick={() => navigate(`/main/${currentParams}/message`)}
            >
              <img
                src={chatIcon}
                alt="chatIcon"
                className="chatIcon side-btn"
              />
            </div>
          </div>
        </div>
      </LeftSide>

      <RightSide>
        <Header invitation={user.invitation} />
        <main className="main-container">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {appstate === APP_USER_STATE.USER ? (
                <Outlet context={{ currentParams }} />
              ) : (
                <ScreenForNewbie />
              )}
            </>
          )}
        </main>
      </RightSide>
    </MainStyle>
  );
};

const MainStyle = styled.div`
  height: 100vh;
  padding-top: 82px;
  display: flex;
  background-color: blue;
`;

const LeftSide = styled.aside`
  background-color: #889aff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 18%;

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

  .side-btn {
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;

  .main-container {
    display: flex;
    gap: 20px;
    background: #f8f8f9;
  }
`;

export default Main;
