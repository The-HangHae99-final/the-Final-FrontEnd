import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../redux/userReducer";
import axios from "axios";
import { getItemFromLs } from "../utils/localStorage";
import Header from "../components/Header/Header";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import UserAvatar from "../elements/UserAvatar";
import Divider from "../elements/Divider";

const PublicMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // const params = useParams();
  // const currentParams = params.workSpaceName;
  const [selected, setSelected] = useState(false);
  console.log("selected: ", selected);

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

  const handleSelectedPage = () => {
    setSelected(true);
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
          <Divider borderColor="red" />
          <ul className="workspaces-list">
            <li className="workspace-source">
              <UserAvatar width="20px" height="20px" />
              물리학 중간 3조
            </li>
            <li className="workspace-source">
              <UserAvatar width="20px" height="20px" />
              물리학 중간 3조
            </li>
            <li className="workspace-source">
              <UserAvatar width="20px" height="20px" />
              물리학 중간 3조
            </li>
            <li className="workspace-source">
              <UserAvatar width="20px" height="20px" />
              물리학 중간 3조
            </li>
            <li className="workspace-source">
              <UserAvatar width="20px" height="20px" />
              물리학 중간 3조
            </li>
            <li className="workspace-source">
              <UserAvatar width="20px" height="20px" />
              물리학 중간 3조
            </li>
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
        <Header invitation={user.invitation} />
        <main className="main-container">
          {/* {isLoading ? (
            <Spinner />
          ) : (
            <> */}
          <div className="private-workspace_header">
            <h1 className="private-workspace_title">물리학 중간 3조</h1>
            <ul className="private-workspace_navbar">
              <li
                className="private-workspace_navbar-item btn-16 selected"
                onClick={handleSelectedPage}
              >
                BOARD
              </li>
              <li className="private-workspace_navbar-item btn-16">CALENDAR</li>
              <li className="private-workspace_navbar-item btn-16">TALK</li>
            </ul>
          </div>
          <div className="private-workspace_main">
            <Outlet />
          </div>
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
  min-width: 24%;
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
  width: 76%;
  flex-direction: column;
  padding: 16px 24px;

  .main-container {
    width: 100%;
    box-sizing: border-box;

    .private-workspace_header {
      width: 100%;
    }

    .private-workspace_title {
      font-size: 32px;
      margin-bottom: 12px;
    }

    .private-workspace_navbar {
      display: flex;
      gap: 20px;
    }

    .private-workspace_navbar-item {
      min-height: 48px;
      padding: 4px 12px;
      text-align: center;
      line-height: 48px;
      cursor: pointer;
      transition: all 0.3s ease;
      outline: none;
    }

    .private-workspace_navbar-item.selected {
      border-bottom: 5px solid #8698fc;
      color: #8698fc;
    }

    .private-workspace_main {
      width: 100%;
      height: 100%;
      background-color: red;
      margin-top: 30px;
    }
  }
`;
export default PublicMain;

// <RightSide>
//   <Header invitation={user.invitation} />
//   <main className="mainStyle">
//     {isLoading ? null : (
//       // <Spinner />
//       <>
//         {appstate === APP_USER_STATE.USER ? (
//           <ScreenForUser />
//         ) : (
//           <ScreenForNewbie setAppState={setAppState} />
//         )}
//         {/* 홈버튼 누르면 빈 화면 출력
//         => Params 값의 유무에 따라 Outlet 렌더링 해야할까? */}
//       </>
//     )}
//   </main>
// </RightSide>
