import React, { useState } from "react";
import styles from "./Main.module.css";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleLogin = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleSignup = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
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
        <Header />
        {/* <header className={styles.header}>
          <form className={styles.inputWrap}>
            <input
              type="text"
              placeholder="search"
              className={styles.searchInput}
            />
            <div className={styles.searchIcon}></div>
          </form>
          <div className={styles.menuItems}>
            <div className={styles.menuBtns}>
              <button className={styles.menuBtn}></button>
              <button className={styles.menuBtn}></button>
              <button onClick={handleLogin}>로그인</button>
              <button onClick={handleSignup}>회원가입</button>
            </div>
            <div className={styles.aboutUser}>
              <div className={styles.userAvatar}>
                <UserAvatar size="big" />
              </div>
              <div className={styles.userMetaInfo}>
                <span className={styles.greeting}>Hi!</span>
                <div className={styles.userName}>김규림님!</div>
              </div>
            </div>
          </div>
        </header> */}

        <main className={styles.mainStyle}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
