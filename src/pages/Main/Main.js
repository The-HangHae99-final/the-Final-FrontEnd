import React, { useState } from "react";
import styles from "./main.module.css";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import LoginModal from "../../elements/LoginModal";
import ModalPortal from "../../elements/Portal/Portal";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const Main = ({
  isLoggedIn,
  handleLogin,
  handleSignup,
  isLoginModalOpen,
  isSignupModalOpen,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <div className={styles.leftSide}>
        <div className={styles.logo}></div>
        <div className={styles.buttons}>
          <div className={styles.buttonWrap}>
            <div
              onClick={() => navigate("/board")}
              className={styles.btn}
            ></div>
            <span>Board</span>
          </div>
          <div className={styles.buttonWrap}>
            <div
              className={styles.btn}
              onClick={() => navigate("/calender")}
            ></div>
            <span>Calender</span>
          </div>
          <div className={styles.buttonWrap}>
            <div
              className={styles.btn}
              onClick={() => navigate("/message")}
            ></div>
            <span>Message</span>
          </div>
        </div>
      </div>

      <div className={styles.rightSide}>
        <Header
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
        />

        <main className={styles.mainStyle}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
