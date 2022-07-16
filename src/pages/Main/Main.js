import React, { useState } from "react";
import styles from "./main.module.css";
import Header from "../../components/Header/Header";
import { Outlet, useParams } from "react-router-dom";
import LoginModal from "../../elements/LoginModal";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import PrivateMain from "../../components/PrivateMain";
import styled from "styled-components";

import boardIcon from "../../public/img/image27.png";
import calendarIcon from "../../public/img/image25.png";
import chatIcon from "../../public/img/image26.png";

const Main = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  return (
    <MainStyle className={styles.main}>
      <LeftSide className={styles.leftSide}>
        <div
          className={styles.logo}
          onClick={() => {
            id !== "undefined"
              ? navigate(`/main`)
              : navigate(`/main/${id}/private`);
          }}
        ></div>
        <div className={styles.buttons}>
          <div className={styles.buttonWrap}>
            <div
              onClick={() => {
                navigate(`/main/${id}/board`);
              }}
              className="page-navigate-button"
            >
              <img src={boardIcon} alt="boardcon" className="boardcon" />
            </div>
          </div>
          <div className={styles.buttonWrap}>
            <div
              className="page-navigate-button"
              onClick={() => navigate(`/main/${id}/calendar`)}
            >
              <img
                src={calendarIcon}
                alt="calendarIcon"
                className="calendarIcon"
              />
            </div>
          </div>
          <div className={styles.buttonWrap}>
            <div
              className="page-navigate-button"
              onClick={() => navigate(`/main/${id}/message`)}
            >
              <img src={chatIcon} alt="chatIcon" className="chatIcon" />
            </div>
          </div>
        </div>
      </LeftSide>

      <RightSide className={styles.rightSide}>
        <Header />
        <main className={styles.mainStyle}>
          {id !== "undefined" ? (
            <>
              <Outlet />
            </>
          ) : (
            <div>워크 스페이스에 입장해주세요!</div>
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
  padding: 10px 0px;
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
`;

const RightSide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
// const SectionWrap = styled.div``;
// const SectionWrap = styled.div``;
// const SectionWrap = styled.div``;
// const SectionWrap = styled.div``;
// const SectionWrap = styled.div``;

export default Main;
