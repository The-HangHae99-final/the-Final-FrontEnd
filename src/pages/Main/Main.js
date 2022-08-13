import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/userReducer";
import axios from "axios";
import { getItemFromLs } from "../../utils/localStorage";
import ScreenForNewbie from "../../components/ScreenForNewbie";
import Spinner from "../../elements/Spinner";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import UserAvatar from "../../elements/UserAvatar";
import Divider from "../../elements/Divider";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/recoil";

export const APP_USER_STATE = {
  NOT_AUTH: "로그인되지 않은 상태",
  UNKNOWN: "모름",
  NEWBIE: "워크스페이스가_없는_유저",
  USER: "워크스페이스가_있는_유저",
};

const Main = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [appstate, setAppState] = useState(APP_USER_STATE.UNKNOWN);
  const isLoading = appstate === APP_USER_STATE.UNKNOWN;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const workspaceList = userInfo.workSpaceList;
  const params = useParams();
  const currentParams = params.workSpaceName;
  const location = useLocation();
  const [selectedPage, setSelectedPage] = useState([true, false, false]);

  const handleSelectedPage = (e) => {
    const pages = ["BOARD", "CALENDAR", "TALK"];
    const index = e.target.getAttribute("index");
    // const pageNameToLowerCase = e.target.textContent.toLowerCase();
    // page의 수만큼 false로 채워진 새로운 배열을 만든다.
    let newArr = Array(pages.length).fill(false);
    // 선택된 page의 index를 이용해 해당 index의 상태를 true로 바꿔준다.
    newArr[index] = true;
    // state를 newArr로 업데이트한다
    setSelectedPage(newArr);
  };
  console.log("---------메인 렌더링!!---------");
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
            console.log("res: ", res.data);
            const wsInfoList = res.data.includedList;
            // const workSpaceFullname = wsInfoList.map((ws) => {
            //   return ws.workSpace.split("+")[1];
            // });
            // console.log("workSpaceFullname: ", workSpaceFullname);
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
                      workSpaceList: [...wsInfoList],
                      invitation: [...res.data.result],
                    })
                  );
                  setUserInfo({
                    ...userInfo,
                    workSpaceList: [...wsInfoList],
                    invitation: [...res.data.result],
                  });
                }
              })
              .catch((err) => console.log(err));
          }
        });
    } catch {
      alert(" 불러오는 도중 에러가 발생했습니다 :(");
    }
  }, []);

  useEffect(() => {}, []);

  const toGoWorkspace = (id, workspace) => {
    navigate(`/main/${id}/board`, { state: workspace });
  };

  return (
    <MainStyle>
      <LeftSide>
        <div className="workspaces-container">
          <Divider />

          <div className="workspaces-container_top">
            <h2 className="active-workspace">
              최근 활동한 팀플방
              <div className="create-workspace">
                <BookmarkAddIcon />
                New
              </div>
            </h2>
            <input
              type="text"
              placeholder="이름으로 검색하세요"
              className="find-workspaceName-input"
            />
          </div>
          <ul className="workspaces-list">
            {workspaceList &&
              workspaceList?.map((workspace, idx) => {
                return (
                  <li
                    className="workspace-source"
                    onClick={() => {
                      toGoWorkspace(workspace._id, workspace);
                    }}
                    key={idx}
                  >
                    <UserAvatar width="20px" height="20px" />
                    {workspace.workSpace.split("+")[1]}
                  </li>
                );
              })}
          </ul>
        </div>
        {/* <div className="buttons">
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
        </div> */}
      </LeftSide>

      <RightSide>
        <main className="main-container">
          {appstate === APP_USER_STATE.USER ? (
            <>
              {location.pathname === "/main" ? (
                <h1>어서오세요</h1>
              ) : (
                <>
                  <div className="private-workspace_header">
                    <h1 className="private-workspace_title">물리학 중간 3조</h1>
                    <ul className="private-workspace_navbar">
                      <Link
                        to={`/main/${params.id}/board`}
                        index={0}
                        onClick={(e) => handleSelectedPage(e)}
                        className={`list-item ${
                          selectedPage[0] ? "list-item_clicked" : ""
                        }`}
                      >
                        BOARD
                      </Link>
                      <Link
                        to={`/main/${params.id}/calendar`}
                        index={1}
                        className={`list-item ${
                          selectedPage[1] ? "list-item_clicked" : ""
                        }`}
                        onClick={(e) => handleSelectedPage(e)}
                      >
                        CALENDAR
                      </Link>
                      <Link
                        index={2}
                        to={`/main/${params.id}/talk`}
                        className={`list-item ${
                          selectedPage[2] ? "list-item_clicked" : ""
                        }`}
                        onClick={(e) => handleSelectedPage(e)}
                      >
                        TALK
                      </Link>
                    </ul>
                  </div>
                  <Outlet />
                </>
              )}
            </>
          ) : (
            <ScreenForNewbie setAppState={setAppState} />
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
`;

const LeftSide = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 18%;
  padding: 24px;
  background: #e0e2e1;

  .workspaces-container {
    width: 100%;
  }

  .workspaces-container_top {
    .active-workspace {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      font-weight: 600;

      .create-workspace {
        display: Flex;
        align-items: center;
        padding: 4px 12px;
        font-size: 12px;
        line-height: 20px;
        background-color: #238636;
        color: var(--white);
        box-shadow: 0 0 transparent, 0 0 transparent;
        border-radius: 5px;
        font-size: 12px;
        cursor: pointer;

        :hover {
          background-color: #2ea043;
        }
      }
    }
  }

  .find-workspaceName-input {
    all: unset;
    width: 100%;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    box-shadow: 0 0 transparent;
    margin-bottom: 30px;
    border: 1px px solid #30363d;
    border-radius: 6px;
    border: 1px solid #30363d;
    border-radius: 6px;
    box-sizing: border-box;
  }

  .workspaces-list {
    list-style: none;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    gap: 14px;

    .workspace-source {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: #8698fc;
      padding: 12px 16px;
      cursor: pointer;
      border-radius: 5px;

      :hover {
        background-color: #8698fccc;
      }
    }
  }
`;

const RightSide = styled.div`
  display: flex;
  width: 82%;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;

  .main-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .private-workspace_header {
      width: 100%;
      height: 12%;
    }

    .private-workspace_title {
      font-size: 28px;
      margin-bottom: 12px;
    }

    .private-workspace_navbar {
      display: flex;
      gap: 25px;
      margin-left: 10px;
    }

    .list-item {
      font-size: 14px;
      min-height: 24px;
      padding: 4px 12px;
      text-align: center;
      line-height: 24px;
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
      border-bottom: 6px solid transparent;
      text-decoration: none;
      color: black;
      font-weight: 600;
    }

    .list-item_clicked {
      border-bottom: 6px solid #8698fc;
      transform: scale(1.1);
      color: #8698fc;
    }

    .private-workspace_main {
      width: 100%;
      height: 88%;
    }
  }
`;
export default Main;
