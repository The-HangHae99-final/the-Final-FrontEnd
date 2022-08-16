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
import { useRecoilState, useRecoilValue } from "recoil";
import { currentWorkspaceState, userState } from "../../recoil/recoil";
import ModalPortal from "../../elements/Portal/ModalPortal";
import WorkspaceModal from "../../components/Modal/WorkspaceModal";
import useMountTransition from "../../utils/useMountTransition";
import AddMemberModal from "../../components/Modal/AddMemberModal";

// 아이콘
import addMemberIcon from "../../public/img/addMemberIcon.png";

export const APP_USER_STATE = {
  NOT_AUTH: "로그인되지 않은 상태",
  UNKNOWN: "모름",
  NEWBIE: "워크스페이스가_없는_유저",
  USER: "워크스페이스가_있는_유저",
};

const Main = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [currentWorkspace, setCurrentWorkspace] = useRecoilState(
    currentWorkspaceState
  );
  const [appstate, setAppState] = useState(APP_USER_STATE.UNKNOWN);
  const [modalOn, setModalOn] = useState(false);
  const [workSpaceName, setWorkSpaceName] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [selectedPage, setSelectedPage] = useState([true, false, false]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [newMember, setNewMember] = useState({
    workSpaceName: "",
    userEmail: "",
  });
  const hasTransitionedIn = useMountTransition(isMounted, 1500);
  const isLoading = appstate === APP_USER_STATE.UNKNOWN;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const workspaceList = userInfo.workSpaceList;
  const params = useParams();
  const location = useLocation();
  const currentWs = useRecoilValue(currentWorkspaceState);

  // 선택된 페이지 상태 유지
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

  useEffect(() => {
    if (location.pathname.includes("board")) {
      setSelectedPage([true, false, false]);
    }
  }, [location, location.pathname]);

  // 소속된 워크스페이스 리스트 조회
  useEffect(() => {
    try {
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

  //워크스페이스 생성
  const addNewWorkSpace = (e) => {
    axios
      .post(
        "https://teamnote.shop/api/work-spaces",
        { workSpaceName: `${getItemFromLs("userEmail")}+${workSpaceName}` },
        {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("res: ", res);
        setUserInfo({
          ...userInfo,
          workSpaceList: [...userInfo.workSpaceList, res.data.addedOwner],
        });
        setModalOn(false);
        setWorkSpaceName("");
        setIsMounted(true);
        setTimeout(() => {
          setIsMounted(false);
        }, 2500);
      });
  };

  const toGoWorkspace = (id, workspace) => {
    navigate(`/main/${id}/board`, { state: workspace });
  };

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const handleWorkSpaceName = (e) => {
    setWorkSpaceName(e.target.value);
  };

  // 새로운 멤버 초대
  const addNewMember = () => {
    axios({
      method: "post",
      url: "http://43.200.170.45/api/members/inviting",
      data: newMember,
      headers: {
        Authorization: `Bearer ${getItemFromLs("myToken")}`,
      },
    })
      .then((res) => {
        console.log("res: ", res);
        if (res.data.success) {
          alert(`${newMember.userEmail}님에게 초대메시지를 보냈습니다`);
          setModalOn(false);
        } else {
          alert(`${res.data.errorMessage}`);
        }
      })
      .catch((err) => alert(`${err.response.data.errorMessage}`));
  };

  const handleAddMemberModal = () => {
    setNewMember({ ...newMember, workSpaceName: currentWorkspace });
    setModalOn(!modalOn);
  };

  const closeModal = (e) => {
    setModalOn(!modalOn);
  };

  return (
    <MainStyle>
      <LeftSide>
        <div className="workspaces-container">
          <Divider />
          <div className="workspaces-container_top">
            <h2 className="active-workspace">
              최근 활동한 팀플방
              <div className="create-workspace" onClick={handleModal}>
                <BookmarkAddIcon />
                New
              </div>
            </h2>
            <input
              type="text"
              placeholder="이름으로 검색하세요"
              className="find-workspaceName-input"
              value={searchKeyword || ""}
              // onChange={onChangeSearch}
              // onKeyPress={onKeyDownSearch}
            />
          </div>
          <ul className="workspaces-list">
            {workspaceList &&
              workspaceList?.map((workspace, idx) => {
                const workspaceName = workspace.workSpace.split("+")[1];
                return (
                  <li
                    className="workspace-source"
                    onClick={() => {
                      toGoWorkspace(workspace._id, workspace);
                      setCurrentWorkspace(workspace.workSpace);
                    }}
                    key={idx}
                  >
                    <UserAvatar width="20px" height="20px" />
                    {workspaceName}
                  </li>
                );
              })}
          </ul>
        </div>
      </LeftSide>

      <RightSide>
        <main className="main-container">
          {appstate === APP_USER_STATE.USER ? (
            <>
              {location.pathname === "/main" ? (
                <h1>어서오세요</h1>
              ) : (
                <>
                  <div className="main-header">
                    <div className="private-workspace_header">
                      <h1 className="private-workspace_title">
                        {currentWorkspace.split("+")[1]}
                      </h1>
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
                    <button
                      className="main-header-addBtn"
                      onClick={handleAddMemberModal}
                    >
                      <img
                        src={addMemberIcon}
                        alt="addMemberIcon"
                        className="addBtn-img"
                      />
                      <span className="addBtn-name">멤버 추가하기</span>
                    </button>
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
      <ModalPortal>
        {modalOn && (
          <WorkspaceModal
            onClose={handleModal}
            addNewWorkSpace={addNewWorkSpace}
            workSpaceName={workSpaceName}
            handleWorkSpaceName={handleWorkSpaceName}
          />
        )}
      </ModalPortal>
      <ModalPortal>
        {modalOn && (
          <AddMemberModal
            newMember={newMember}
            setNewMember={setNewMember}
            onClose={closeModal}
            addNewMember={addNewMember}
          />
        )}
      </ModalPortal>
      {hasTransitionedIn || isMounted ? (
        <SuccessModalBox>
          <div
            className={`success-modal ${hasTransitionedIn && "in"} ${
              isMounted && "visible"
            }`}
          >
            새로운 워크스페이스가 개설되었습니다!
          </div>
        </SuccessModalBox>
      ) : null}
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
    max-height: 450px;
    overflow: scroll;
    padding: 0px 4px;

    ::-webkit-scrollbar {
      display: none;
    }

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

    .main-header {
      display: flex;
    }

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

  .main-header-addBtn {
    all: unset;
    background: #7d8bdb;
    min-width: 152px;
    height: 52px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    :hover {
      background-color: #7d8bdbe0;
    }
  }
  .addBtn-img {
    width: 25px;
    height: 20px;
    margin-right: 15px;
  }
  .addBtn-name {
    font-weight: 500;
    font-size: 12px;
    line-height: 23px;
    text-align: center;
    color: #ffffff;
  }
`;

const SuccessModalBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;

  .success-modal {
    padding: 15px 20px;
    height: 3.7rem;
    background: #889aff;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.02em;
    color: #ffffff;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .success-modal.in.visible {
    opacity: 1;
  }
`;
export default Main;
