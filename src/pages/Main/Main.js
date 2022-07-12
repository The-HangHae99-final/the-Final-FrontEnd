import React, { useState } from "react";
import styles from "./main.module.css";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import LoginModal from "../../elements/LoginModal";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <div className={styles.leftSide}>
        <div className={styles.logo} onClick={() => navigate("/main")}>
          {" "}
        </div>
        <div className={styles.buttons}>
          <div className={styles.buttonWrap}>
            <div
              onClick={() => navigate("/main/board")}
              className={styles.btn}
            ></div>
            <span>Board</span>
          </div>
          <div className={styles.buttonWrap}>
            <div
              className={styles.btn}
              onClick={() => navigate("/main/calendar")}
            ></div>
            <span>Calendar</span>
          </div>
          <div className={styles.buttonWrap}>
            <div
              className={styles.btn}
              onClick={() => navigate("/main/message")}
            ></div>
            <span>Message</span>
          </div>
        </div>
      </div>

      <div className={styles.rightSide}>
        <Header />

        <main className={styles.mainStyle}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
