import React, { useEffect, useMemo, useState, useRef } from "react";
import styled, { css } from "styled-components";
import AddMemberModal from "./Modal/AddMemberModal";
import ModalPortal from "../elements/Portal/ModalPortal";
import axios from "axios";
import { getItemFromLs, setItemToLs } from "../utils/localStorage";
import { Outlet, useParams, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../redux/userReducer";
import WeekCalendar from "./Calendar/WeekCalendar";

// 이미지
import { Human03, Human04 } from "../elements/humanIcon";
import thunder from "../public/img/Main/thunder.png";
import addMemberIcon from "../public/img/addMemberIcon.png";
import submitVector from "../public/img/submitVector.png";
import human01 from "../public/img/human01.png";
import human02 from "../public/img/human02.png";
import goldCrown from "../public/img/goldCrown.png";
import commentIcon from "../public/img/commentIcon.png";
import Ellipse106 from "../public/img/Ellipse106.png";
import leftArrow from "../public/img/left-arrow.png";
import rightArrow from "../public/img/right-arrow.png";
import commentWhite from "../public/img/Main/comment-white.png";
import edit from "../public/img/edit.png";
// import delete from "../public/img/Main/delete.png";
import { getMemberList } from "../redux/workSpaceReducer";

const PrivateMain = () => {
  const [newMember, setNewMember] = useState({
    workSpaceName: "",
    userEmail: "",
  });
  const { currentParams } = useOutletContext();
  const [modalOn, setModalOn] = useState(false);
  const [notification, setNotification] = useState({
    content: "",
    workSpaceName: currentParams,
  });
  const [notificationList, setNotificationList] = useState([]);
  console.log("notificationList: ", notificationList);
  const params = useParams();
  const hasParams = params.workSpaceName;
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const workspace = useSelector((state) => state.workSpace.value);
  const memberList = workspace.member_list;

  const handleNotice = (e) => {
    setNotification({ ...notification, content: e.target.value });
  };

  // 공지 등록
  const registerNotification = () => {
    axios
      .post(
        "https://teamnote.shop/api/boards",
        {
          content: notification.content,
          workSpaceName: notification.workSpaceName,
        },
        {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        }
      )
      .then((res) => {
        setNotification({ ...notification, content: "" });
        setNotificationList([...notificationList, res.data.result]);
      });
  };

  useEffect(() => {
    // 공지 목록이 업데이트 될 때마다 스크롤을 내린다
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [notificationList]);

  // 공지 조회
  useEffect(() => {
    axios
      .get(`https://teamnote.shop/api/boards/${currentParams}`, {
        headers: {
          Authorization: `Bearer ${getItemFromLs("myToken")}`,
        },
      })
      .then((res) => setNotificationList([...res.data.boards.reverse()]));
  }, [currentParams]);

  const handleAddMemberModal = () => {
    setModalOn(!modalOn);
  };

  const closeModal = (e) => {
    setModalOn(!modalOn);
  };

  // 초대장 보내기
  const addNewMember = () => {
    axios({
      method: "post",
      url: "https://teamnote.shop/api/members/inviting",
      data: newMember,
      headers: {
        Authorization: `Bearer ${getItemFromLs("myToken")}`,
      },
    })
      .then((res) => {
        if (res.data.success) {
          alert(`${newMember.userEmail}님에게 초대메시지를 보냈습니다`);
          setModalOn(false);
          setNewMember({ ...newMember, userEmail: "" });
        } else {
          alert(`${res.message}`);
        }
      })
      .catch((err) => alert(`${err}`));
  };

  // 워크스페이스 바꾸면 바로 새 멤버 생성을 위한 데이터 업데이트
  useEffect(() => {
    setNewMember({
      ...newMember,
      workSpaceName: workspace.current_workSpace,
    });
  }, [workspace, workspace?.current_workSpace]);

  // 해당 워크스페이스에 속한 유저 관리
  useEffect(() => {
    axios
      .get(`https://teamnote.shop/api/members/lists/${currentParams}`, {
        headers: {
          Authorization: `Bearer ${getItemFromLs("myToken")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          dispatch(
            getMemberList({ ...workspace, member_list: [...res.data.result] })
          );
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <PrivateMainStyle>
      <MainHeader className="MainHeader">
        <div className="main-header-workspace-name">
          {currentParams.split("+")[1]}
          <div className="edit-wrap">
            <img src={edit} alt="edit" className="edit" />
          </div>
        </div>
        <button className="main-header-addBtn" onClick={handleAddMemberModal}>
          <img src={addMemberIcon} alt="addMemberIcon" className="addBtn-img" />
          <span className="addBtn-name">멤버 추가하기</span>
        </button>
      </MainHeader>
      <PrivateMainContainer>
        <PrivateMainLeft>
          <LeftTop>
            {/* 공지 컨테이너 */}
            <div className="notice-wrap">
              <div className="wrap-header">
                <img src={thunder} alt="thunder" className="thunder-icon" />
                <h3 className="main-wrap-title">공지사항</h3>
              </div>
              <NoticeScreen>
                <ul className="notification-list notification-list_has-params">
                  {notificationList &&
                    notificationList?.map((noti, idx) => {
                      return (
                        <>
                          {noti.userName === getItemFromLs("userName") ? (
                            <li
                              className="notification-item notification-item_mine"
                              key={idx}
                              ref={inputRef}
                            >
                              <div className="notification-content">
                                {noti.content}
                              </div>
                              <div className="user-info user-info_me">
                                <span className="me">나</span>
                                <Human03 size={40} />
                              </div>
                            </li>
                          ) : (
                            <li
                              className="notification-item notification-item_yours"
                              ref={inputRef}
                              key={idx}
                            >
                              <div className="notification-content">
                                {noti.content}
                              </div>
                              <div className="user-info user-info_you">
                                <Human04 size={40} />
                                <span className="you">{noti.userName}</span>
                              </div>
                            </li>
                          )}
                        </>
                      );
                    })}
                </ul>
                {/* <div className="notification-list notification-list_none-params">
                    <div className="alarm top13">
                      팀원들에게
                      <br /> 알릴 내용이 있나요?
                    </div>
                  </div> */}
                <div className="input-wrap">
                  <input
                    type="text"
                    className="notice-input"
                    onChange={handleNotice}
                    value={notification.content}
                    onKeyPress={(e) => {
                      console.log(e.key);
                      e.key === "Enter" && registerNotification();
                    }}
                  />
                  <img
                    src={submitVector}
                    alt="submitVector"
                    className="submitVector"
                    onClick={registerNotification}
                  />
                </div>
              </NoticeScreen>
            </div>

            {/* 타임 랭킹 컨테이너 */}
            <div className="time_tasking-wrap">
              <div className="wrap-header">
                <img src={thunder} alt="thunder" className="thunder-icon" />
                <h3 className="main-wrap-title">타임 랭킹</h3>
              </div>
              <TimeTaskingScreen>
                {!hasParams ? (
                  <>
                    <NoticeScreenTime>
                      <div className="time-ranking-card">
                        <div className="time-ranking-profile">
                          <img
                            src={goldCrown}
                            alt="goldCrown"
                            className="crown"
                          />
                          <img
                            src={human01}
                            alt="human01"
                            className="human01"
                          />
                          <div className="time-ranking_name">김하연</div>
                        </div>
                        <div className="time-ranking-text">
                          일주일 동안 24:53 : 45 시간만큼 접속했어요!
                        </div>
                      </div>
                    </NoticeScreenTime>
                    <NoticeScreenTime>
                      <div className="time-ranking-card">
                        <div className="time-ranking-profile">
                          <img
                            src={goldCrown}
                            alt="goldCrown"
                            className="crown"
                          />
                          <img
                            src={human01}
                            alt="human01"
                            className="human01"
                          />
                          <div className="time-ranking_name">김하연</div>
                        </div>
                        <div className="time-ranking-text">
                          일주일 동안 24:53 : 45 시간만큼 접속했어요!
                        </div>
                      </div>
                    </NoticeScreenTime>
                  </>
                ) : (
                  <>
                    <NoticeScreenTime hasParams={hasParams}>
                      <div className="alarm">준비 중 입니다</div>
                      {/* <div className="alarm">준비 중 입니다</div> */}
                    </NoticeScreenTime>
                    <NoticeScreenTime hasParams={hasParams}>
                      <div className="alarm">준비 중 입니다</div>
                    </NoticeScreenTime>
                    <NoticeScreenTime hasParams={hasParams}>
                      <div className="alarm">준비 중 입니다</div>
                    </NoticeScreenTime>
                  </>
                )}
              </TimeTaskingScreen>
            </div>
          </LeftTop>

          <WeekCalendar />
        </PrivateMainLeft>

        <PrivateMainRight>
          {/* 컨택트 컨테이너 */}
          <ContactWrap>
            <div className="right-wrap-title contact-title">Contact</div>
            <div className="contact-screen" hasparams="false">
              {hasParams ? (
                <>
                  {memberList &&
                    memberList?.map((member, idx) => {
                      return (
                        <div className="contact-card" key={idx}>
                          <div className="contact-card_profile">
                            <div className="profile">
                              <img
                                src={human02}
                                alt="human02"
                                className="human02"
                              />
                              <img
                                src={Ellipse106}
                                alt="Ellipse106"
                                className="online"
                              />
                            </div>
                            <div className="contact-card_name">
                              {member.memberName}
                            </div>
                          </div>
                          <div className="contact-card_toChat">
                            <span className="contact-card_text">
                              다이렉트 채팅하기
                            </span>
                            <img
                              src={commentIcon}
                              alt="commentIcon"
                              className="commentIcon"
                            />
                          </div>
                        </div>
                      );
                    })}
                </>
              ) : (
                <>
                  <img
                    src={commentWhite}
                    alt="commentWhite"
                    className="commentWhite"
                  />
                  <div className="alarm">
                    함께 하는 팀원의 활동상태를 볼 수 있어요
                  </div>
                </>
              )}
            </div>
          </ContactWrap>
          {/* 메모 컨테이너 */}
          <MemoWrap>
            <div className="right-wrap-title memo-title">Note</div>
            <div className="note-screen"></div>
            <div className="note-navi-buttons">
              <img
                src={leftArrow}
                alt="leftArrow"
                className="note-arrow leftArrow"
              />
              <span className="note-category-title">Team</span>
              <img
                src={rightArrow}
                alt="rightArrow"
                className="note-arrow rightArrow"
              />
            </div>
          </MemoWrap>
        </PrivateMainRight>
      </PrivateMainContainer>
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
    </PrivateMainStyle>
  );
};

const PrivateMainStyle = styled.div`
  width: 100%;
  padding: 20px;
  height: calc(100vh - 80px);

  .right-wrap-title {
    font-weight: 600;
    font-size: 22px;
    line-height: 33px;
    color: #7d8bdb;
  }
  .contact-title {
    margin-bottom: 20px;
  }
  .memo-title {
    margin-bottom: 13px;
  }

  .alarm {
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #cbcbd7;
  }

  .top13 {
    transform: translateY(-13px);
  }
`;

const PrivateMainContainer = styled.div`
  display: Flex;
  gap: 20px;
  width: 100%;
  height: 90%;
`;

const MainHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;

  .main-header-workspace-name {
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 3rem;
    color: #353841;
    display: flex;
    align-items: center;
  }

  .edit-wrap {
    width: 35px;
    height: 35px;
    background: rgba(247, 247, 247, 0.5);
    border: 1px solid #ecedf1;
    border-radius: 50%;
    padding: 9px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .edit {
    width: 100%;
    height: 100%;
  }

  .main-header-addBtn {
    all: unset;
    background: #7d8bdb;
    min-width: 252px;
    height: 57px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .addBtn-img {
    width: 25px;
    height: 20px;
    margin-right: 15px;
  }

  .addBtn-name {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #ffffff;
  }
`;

const TimeTaskingScreen = styled.div`
  height: 91%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  gap: 10px;
`;

const NoticeScreenTime = styled.div`
  display: flex;
  background: #ffffff;
  border: 1px solid #ecedf1;
  border-radius: 5px;
  padding: 9px 24px;
  height: 137px;
  width: 100%;

  ${({ hasparams }) => {
    if (!hasparams) {
      return css`
        display: flex;
        justify-content: center;
        align-items: center;
      `;
    }
  }}

  .time-ranking-card {
    display: flex;
    align-items: center;
  }

  .time-ranking-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 24px;
  }

  .crown {
    width: 30px;
    margin-bottom: 4px;
    height: 25px;
  }

  .human01 {
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }

  .time-ranking_name {
    margin-top: 6px;
  }

  .time-ranking-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
    letter-spacing: -0.02em;
    color: #353841;
  }
`;

const PrivateMainLeft = styled.div`
  height: 100%;
  display: Flex;
  flex-direction: column;
  gap: 20px;
  width: 75%;
`;

const LeftTop = styled.div`
  display: Flex;
  gap: 20px;
  height: 61%;

  .notice-wrap {
    width: 37%;
  }

  .wrap-header {
    display: Flex;
    align-items: center;
    margin-bottom: 15px;
    height: 6%;
  }

  .thunder-icon {
    width: 20px;
  }

  .main-wrap-title {
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    color: #353841;
    margin-left: 9px;
  }

  .time_tasking-wrap {
    width: 63%;
    height: 100%;
  }
`;

const NoticeScreen = styled.div`
  border: 1px solid #ecedf1;
  border-radius: 5px;
  height: 91%;
  position: relative;
  background: #ffffff;
  border: 1px solid #ecedf1;

  .notice-screen-main {
  }

  .notification-list {
    height: 78%;
    display: flex;
    flex-direction: column;
    gap: 35px;
    display: flex;
    align-items: center;
    padding: 15px 0px;
    overflow: scroll;
    position: relative;
  }

  .notification-list_has-params {
  }

  .notification-list_none-params {
    justify-content: center;
  }

  .notification-item {
    padding: 13px 15px 13px 17px;
    background: #f8f8f9;
    border: 1px solid #7d8bdb;
    border-radius: 20px;
    position: absolute;
    width: 70%;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #353841;
    position: relative;
    cursor: pointer;
  }

  .notification-item_mine {
  }

  .notification-item_yours {
  }

  .user-info {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
    text-align: right;
    letter-spacing: -0.02em;
    color: #353841;
  }

  .user-info_me {
    bottom: -25px;
    right: -15px;
  }

  .user-info_you {
    bottom: -25px;
    left: -15px;
  }

  .me,
  .you {
    position: relative;
    top: 7px;
  }

  .input-wrap {
    width: 90%;
    height: 3rem;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .notice-input {
    background: #ecedf1;
    border: 1px solid #ecedf1;
    border-radius: 5px;
    width: 91.5%;
    height: 100%;
    padding-left: 22px;
    outline: none;
  }

  .submitVector {
    position: absolute;
    right: 11px;
    top: 11px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

const PrivateMainRight = styled.div`
  width: 44%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactWrap = styled.div`
  padding: 20px 30px;
  height: 40%;
  background: #ffffff;
  border: 1px solid #ecedf1;
  border-radius: 5px;

  .contact-screen {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 221px;
    gap: 13px;
    overflow: scroll;

    ${({ hasParams }) => {
      if (hasParams) {
        return css`
          display: flex;
          justify-content: center;
          align-items: center;
        `;
      }
    }}
  }

  .contact-card {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .human02 {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .contact-card-toDirect {
    display: Flex;
    align-items: center;
    gap: 15px;
    margin-right: 27px;
    cursor: pointer;
  }

  .contact-card_profile {
    display: flex;
    align-items: center;
  }

  .profile {
    position: relative;
  }

  .online {
    position: absolute;
    bottom: 5px;
    right: -10px;
  }

  .contact-card_name {
    margin-left: 30px;
    opacity: 0.5;
  }

  .commentWhite {
    width: 34px;
    height: 32px;
  }

  .contact-card_toChat {
    display: Flex;
    align-items: center;
    gap: 15px;
  }

  .contact-card_text {
    font-size: 14px;
    line-height: 21px;
    text-align: right;
    letter-spacing: -0.02em;
    color: #7a858e;
  }

  .commentIcon {
    width: 22px;
    height: 22px;
  }
`;

const MemoWrap = styled.div`
  padding: 20px 30px 38px 30px;
  width: 100%;
  height: 60%;
  background: #ffffff;
  border: 1px solid #ecedf1;
  border-radius: 5px;

  .note-screen {
    width: 100%;
    height: 77%;
    background: linear-gradient(
      180deg,
      rgba(255, 220, 36, 0.5) 0%,
      rgba(240, 187, 0, 0.5) 100%
    );
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }

  .note-navi-buttons {
    display: Flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .note-category-title {
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    text-align: center;
    color: #353841;
  }

  .memo-title {
    line-height: 33px;
    margin-bottom: 13px;
  }

  .note-arrow {
    cursor: pointer;
  }
`;
export default PrivateMain;
