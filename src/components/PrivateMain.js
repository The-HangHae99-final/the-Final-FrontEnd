import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Outlet, Route, Routes, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../redux/userReducer";
import axios from "axios";
import { getItemFromLs } from "../utils/localStorage";
import Header from "../components/Header/Header";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import UserAvatar from "../elements/UserAvatar";
import Divider from "../elements/Divider";
import Board from "../pages/Board";
import Calender from "../pages/Calendar/Calendar";
import Message from "../pages/Message/Message";

const PrivateMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const params = useParams();
  const currentParams = params.workSpaceName;
  const workspaceList = user.workSpaceList;

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
              return ws.workSpace.split("+")[1];
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

  // 선택된 페이지 상태만 true (+classname selected 추가)
  // 나머진 모두 false(+classname selected 제거)
  const [selectedPage, setSelectedPage] = useState([]);
  const pages = ["BOARD", "CALENDAR", "TALK"];
  const handleSelectedPage = (index) => {
    // page의 수만큼 false로 채워진 새로운 배열을 만든다.
    let newArr = Array(pages.length).fill(false);
    // 선택된 page의 index를 이용해 해당 index의 상태를 true로 바꿔준다.
    newArr[index] = true;
    setSelectedPage(newArr);
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
            {workspaceList &&
              workspaceList?.map((workspace, idx) => {
                return (
                  <li className="workspace-source" key={idx}>
                    <UserAvatar width="20px" height="20px" />
                    {workspace}
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
          {/* {isLoading ? (
            <Spinner />
          ) : (
            <> */}
          <div className="private-workspace_header">
            <h1 className="private-workspace_title">물리학 중간 3조</h1>
            <ul className="private-workspace_navbar">
              {pages.map((page, idx) => {
                return (
                  <li
                    key={idx}
                    onClick={() => handleSelectedPage(idx)}
                    className={`list-item ${
                      selectedPage[idx] ? "list-item_clicked" : ""
                    }`}
                  >
                    {page}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="private-workspace_main">
            <h1>팀노트에 오실 걸 환영합니다!</h1>
            <Routes>
              <Route path=":id" element={<Board />} />
              <Route path=":id/calendar" element={<Calender />} />
              <Route path=":id/talk" element={<Message />} />
            </Routes>
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
  min-width: 300px;
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
  width: 100%;
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
export default PrivateMain;

// <PrivateMainStyle>
// <MainHeader className="MainHeader">
//   <div className="main-header-workspace-name">
//     {currentParams.split("+")[1]}
//     <div className="edit-wrap">
//       <img src={edit} alt="edit" className="edit" />
//     </div>
//   </div>
//   <button className="main-header-addBtn" onClick={handleAddMemberModal}>
//     <img src={addMemberIcon} alt="addMemberIcon" className="addBtn-img" />
//     <span className="addBtn-name">멤버 추가하기</span>
//   </button>
// </MainHeader>
// <PrivateMainContainer>
//   <PrivateMainLeft>
//     <LeftTop>
//       {/* 공지 컨테이너 */}
//       <div className="notice-wrap">
//         <div className="wrap-header">
//           <img src={thunder} alt="thunder" className="thunder-icon" />
//           <h3 className="main-wrap-title">공지사항</h3>
//         </div>
//         <NoticeScreen>
//           <ul className="notification-list notification-list_has-params">
//             {notificationList &&
//               notificationList?.map((noti, idx) => {
//                 return (
//                   <>
//                     {noti.userName === getItemFromLs("userName") ? (
//                       <li
//                         className="notification-item notification-item_mine"
//                         key={idx}
//                         ref={inputRef}
//                       >
//                         <div className="notification-content">
//                           {noti.content}
//                         </div>
//                         <div className="user-info user-info_me">
//                           <span className="me">나</span>
//                           <Human03 size={40} />
//                         </div>
//                       </li>
//                     ) : (
//                       <li
//                         className="notification-item notification-item_yours"
//                         ref={inputRef}
//                         key={idx}
//                       >
//                         <div className="notification-content">
//                           {noti.content}
//                         </div>
//                         <div className="user-info user-info_you">
//                           <Human04 size={40} />
//                           <span className="you">{noti.userName}</span>
//                         </div>
//                       </li>
//                     )}
//                   </>
//                 );
//               })}
//           </ul>
//           {/* <div className="notification-list notification-list_none-params">
//               <div className="alarm top13">
//                 팀원들에게
//                 <br /> 알릴 내용이 있나요?
//               </div>
//             </div> */}
//           <div className="input-wrap">
//             <input
//               type="text"
//               className="notice-input"
//               onChange={handleNotice}
//               value={notification.content}
//               onKeyPress={(e) => {
//                 console.log(e.key);
//                 e.key === "Enter" && registerNotification();
//               }}
//             />
//             <img
//               src={submitVector}
//               alt="submitVector"
//               className="submitVector"
//               onClick={registerNotification}
//             />
//           </div>
//         </NoticeScreen>
//       </div>

//       {/* 타임 랭킹 컨테이너 */}
//       <div className="time_tasking-wrap">
//         <div className="wrap-header">
//           <img src={thunder} alt="thunder" className="thunder-icon" />
//           <h3 className="main-wrap-title">타임 랭킹</h3>
//         </div>
//         <TimeTaskingScreen>
//           {!hasParams ? (
//             <>
//               <NoticeScreenTime>
//                 <div className="time-ranking-card">
//                   <div className="time-ranking-profile">
//                     <img
//                       src={goldCrown}
//                       alt="goldCrown"
//                       className="crown"
//                     />
//                     <img
//                       src={human01}
//                       alt="human01"
//                       className="human01"
//                     />
//                     <div className="time-ranking_name">김하연</div>
//                   </div>
//                   <div className="time-ranking-text">
//                     일주일 동안 24:53 : 45 시간만큼 접속했어요!
//                   </div>
//                 </div>
//               </NoticeScreenTime>
//               <NoticeScreenTime>
//                 <div className="time-ranking-card">
//                   <div className="time-ranking-profile">
//                     <img
//                       src={goldCrown}
//                       alt="goldCrown"
//                       className="crown"
//                     />
//                     <img
//                       src={human01}
//                       alt="human01"
//                       className="human01"
//                     />
//                     <div className="time-ranking_name">김하연</div>
//                   </div>
//                   <div className="time-ranking-text">
//                     일주일 동안 24:53 : 45 시간만큼 접속했어요!
//                   </div>
//                 </div>
//               </NoticeScreenTime>
//             </>
//           ) : (
//             <>
//               <NoticeScreenTime hasParams={hasParams}>
//                 <div className="alarm">서비스 준비 중 입니다</div>
//                 {/* <div className="alarm">준비 중 입니다</div> */}
//               </NoticeScreenTime>
//               <NoticeScreenTime hasParams={hasParams}>
//                 <div className="alarm">서비스 준비 중 입니다</div>
//               </NoticeScreenTime>
//               <NoticeScreenTime hasParams={hasParams}>
//                 <div className="alarm">서비스 준비 중 입니다</div>
//               </NoticeScreenTime>
//             </>
//           )}
//         </TimeTaskingScreen>
//       </div>
//     </LeftTop>

//     {/* <WeekCalendar /> */}
//   </PrivateMainLeft>

//   <PrivateMainRight>
//     {/* 컨택트 컨테이너 */}
//     <ContactWrap>
//       <div className="right-wrap-title contact-title">Contact</div>
//       <div className="contact-screen" hasparams="false">
//         {hasParams ? (
//           <>
//             {memberList &&
//               memberList?.map((member, idx) => {
//                 return (
//                   <div className="contact-card" key={idx}>
//                     <div className="contact-card_profile">
//                       <div className="profile">
//                         <img
//                           src={member?.profile_image}
//                           alt="human02"
//                           className="human02"
//                         />
//                       </div>
//                       <div className="contact-card_name">
//                         {member.memberName}
//                       </div>
//                     </div>
//                     <div className="contact-card_toChat">
//                       <span className="contact-card_text">
//                         다이렉트 채팅하기
//                       </span>
//                       <img
//                         src={commentIcon}
//                         alt="commentIcon"
//                         className="commentIcon"
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//           </>
//         ) : (
//           <>
//             <img
//               src={commentWhite}
//               alt="commentWhite"
//               className="commentWhite"
//             />
//             <div className="alarm">
//               함께 하는 팀원의 활동상태를 볼 수 있어요
//             </div>
//           </>
//         )}
//       </div>
//     </ContactWrap>
//   </PrivateMainRight>
// </PrivateMainContainer>
// <ModalPortal>
//   {modalOn && (
//     <AddMemberModal
//       newMember={newMember}
//       setNewMember={setNewMember}
//       onClose={closeModal}
//       addNewMember={addNewMember}
//     />
//   )}
// </ModalPortal>
// {(hasTransitionedIn || isMounted) && (
//   <Alert
//     style={{
//       position: "absolute",
//       bottom: "20px",
//       right: "20px",
//       width: "200px",
//     }}
//     severity="success"
//     color="info"
//     className={`success-modal ${hasTransitionedIn && "in"} ${
//       isMounted && "visible"
//     }`}
//   >
//     짝짝짝! 초대 메세지를 보냈습니다!
//   </Alert>
// )}
// </PrivateMainStyle>
