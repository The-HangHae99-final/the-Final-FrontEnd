import React from "react";
import { InputUnstyled } from "@mui/base";
import UserAvatar from "../../elements/UserAvatar";
import styles from "./Main.module.css";

const Main = () => {
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

        <main className={styles.mainStyle}>
          <div className={styles.sideCalender}>사이드달력</div>
          <div className={styles.mainCalender}>메인달력</div>
        </main>
      </div>
    </div>
  );
};

export default Main;
