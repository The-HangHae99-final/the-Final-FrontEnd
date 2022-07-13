import React, { useState } from "react";
import styles from "./main.module.css";
import Header from "../../components/Header/Header";
import { Outlet, useParams } from "react-router-dom";
import LoginModal from "../../elements/LoginModal";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  console.log(id);
  if (id) {
  }

  return (
    <div className={styles.main}>
      <div className={styles.leftSide}>
        <div className={styles.logo} onClick={() => navigate(`/main/${id}`)}>
          {" "}
        </div>
        <div className={styles.buttons}>
          <div className={styles.buttonWrap}>
            <div
              onClick={() => navigate(`/main/${id}/board`)}
              className={styles.btn}
            ></div>
            <span>Board</span>
          </div>
          <div className={styles.buttonWrap}>
            <div
              className={styles.btn}
              onClick={() => navigate(`/main/${id}/calendar`)}
            ></div>
            <span>Calendar</span>
          </div>
          <div className={styles.buttonWrap}>
            <div
              className={styles.btn}
              onClick={() => navigate(`/main/${id}/message`)}
            ></div>
            <span>Message</span>
          </div>
        </div>
      </div>

      <div className={styles.rightSide}>
        <Header />
        <main className={styles.mainStyle}>
          {id !== "undefined" ? (
            <Outlet />
          ) : (
            <div>워크 스페이스에 입장해주세요!</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Main;
