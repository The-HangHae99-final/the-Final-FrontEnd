import React, { useState } from "react";
import UserAvatar from "../../elements/UserAvatar";
import styles from "../../pages/Main/Main.module.css";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
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
            {/* <button onClick={handleLogin}>로그인</button>
            <button onClick={handleSignup}>회원가입</button> */}
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
      </header>
    </>
  );
};

export default Header;
