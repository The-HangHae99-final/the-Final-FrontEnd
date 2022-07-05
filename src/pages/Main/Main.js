import React, { useState } from "react";
import styles from "./Main.module.css";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import LoginModal from "../../elements/LoginModal";

const Main = ({
  isLoggedIn,
  handleLogin,
  handleSignup,
  isLoginModalOpen,
  isSignupModalOpen,
}) => {
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };
  return (
    <div className={styles.main}>
      <div className={styles.leftSide}>
        <div className={styles.logo}></div>
        <div className={styles.buttons}>
          <div className={styles.buttonWrap}>
            <div className={styles.btn}></div>
            <span>Board</span>
          </div>
          <div className={styles.buttonWrap}>
            <div className={styles.btn}></div>
            <span>Calender</span>
          </div>
          <div className={styles.buttonWrap}>
            <div className={styles.btn}></div>
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
      {isLoginModalOpen && (
        <LoginModal
          text="Login"
          isLoginModalOpen={isLoginModalOpen}
          isSignupModalOpen={isSignupModalOpen}
        />
      )}
      {isSignupModalOpen && (
        <LoginModal
          text="Signup"
          isLoginModalOpen={isLoginModalOpen}
          isSignupModalOpen={isSignupModalOpen}
        />
      )}
    </div>
  );
};

export default Main;
