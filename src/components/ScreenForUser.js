import React, { useEffect, useMemo, useState } from "react";
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
import thunder from "../public/img/thunder.png";
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
import { getMemberList } from "../redux/workSpaceReducer";

const PrivateMain = () => {
  const params = useParams();
  const hasParams = params.workSpaceName;

  return (
    <PrivateMainStyle>
      <MainHeader className="MainHeader">
        <div className="main-header-workspace-name">
          <h1>워크 스페이스를 선택해주세요</h1>
        </div>
        <button className="main-header-addBtn">
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
                <div className="notification-list notification-list_none-params">
                  <img
                    src={commentWhite}
                    alt="commentWhite"
                    className="commentWhite"
                  />
                  <div className="alarm top13">
                    팀원들에게
                    <br /> 알릴 내용이 있나요?
                  </div>
                </div>
                <div className="input-wrap">
                  <input
                    type="text"
                    className="notice-input"
                    placeholder="팀원들에게 알릴 내용이 있나요?"
                    disabled
                  />
                  <img
                    src={submitVector}
                    alt="submitVector"
                    className="submitVector"
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
                <NoticeScreenTime>
                  <div className="alarm">서비스 준비 중 입니다.</div>
                </NoticeScreenTime>
                <NoticeScreenTime>
                  <div className="alarm">서비스 준비 중 입니다.</div>
                </NoticeScreenTime>
                <NoticeScreenTime>
                  <div className="alarm">서비스 준비 중 입니다.</div>
                </NoticeScreenTime>
              </TimeTaskingScreen>
            </div>
          </LeftTop>

          <WeekCalendar />
        </PrivateMainLeft>
        <PrivateMainRight>
          {/* 컨택트 컨테이너 */}
          <ContactWrap>
            <div className="right-wrap-title contact-title">Contact</div>
            <div className="contact-screen">
              <img
                src={commentWhite}
                alt="commentWhite"
                className="commentWhite"
              />
              <div className="alarm">
                함께 하는 팀원의 활동상태를 볼 수 있어요
              </div>
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
    </PrivateMainStyle>
  );
};

const PrivateMainStyle = styled.div`
  width: 100%;
  box-sizing: border-box;
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
  width: 100%;
  height: 100%;
  display: Flex;
  justify-content: space-between;
  gap: 20px;
`;

const MainHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;

  .main-header-workspace-name {
    font-weight: 400;
    font-size: 30px;
    line-height: 45px;
    color: #353841;
  }

  .main-header-addBtn {
    all: unset;
    background: #7d8bdb;
    opacity: 0.5;
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
  gap: 10px;
  overflow: scroll;
`;

const NoticeScreenTime = styled.div`
  display: flex;
  background: #ffffff;
  border: 1px solid #ecedf1;
  border-radius: 5px;
  padding: 9px 24px;
  height: 137px;

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
  width: 68%;
  height: 100%;
  display: Flex;
  flex-direction: column;
  gap: 20px;
`;

const LeftTop = styled.div`
  display: Flex;
  gap: 20px;

  .notice-wrap {
    width: 300px;
    height: 476px;
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
    width: 100%;
    height: 476px;
  }
`;

const NoticeScreen = styled.div`
  border: 1px solid #ecedf1;
  border-radius: 5px;
  height: 89%;
  position: relative;
  background: #ffffff;
  border: 1px solid #ecedf1;

  .notice-screen-main {
    background-color: red;
  }

  .notification-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 10px;
  }

  .notification-item {
    padding: 13px 15px 13px 17px;
    background: #f8f8f9;
    border: 1px solid #7d8bdb;
    border-radius: 20px;
    height: 86px;
    position: relative;
    width: 83%;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #353841;
    position: relative;
  }

  .input-wrap {
    width: 86%;
    height: 52px;
    margin: auto;
    position: absolute;
    bottom: 10px;
    left: 47%;
    transform: translateX(-50%);
  }

  .notice-input {
    background: #ecedf1;
    border: 1px solid #ecedf1;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    outline: none;
    padding: 0px;
    border: none;
    padding: 0 0 0 22px;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: #353841;

    ::placeholder {
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      letter-spacing: -0.02em;
      color: #cbcbd7;
    }
  }

  .commentWhite {
    width: 34px;
    height: 32px;
  }

  .submitVector {
    position: absolute;
    right: -10px;
    top: 10px;
    cursor: pointer;
  }
`;

const PrivateMainRight = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactWrap = styled.div`
  padding: 20px 30px;
  height: 314px;
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
    align-items: center;
    justify-content: center;
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
  background: #ffffff;
  border: 1px solid #ecedf1;
  border-radius: 5px;
  .note-screen {
    width: 100%;
    height: 319px;
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
    margin-top: 13px;
  }

  .note-arrow {
    cursor: pointer;
  }
`;
export default PrivateMain;
