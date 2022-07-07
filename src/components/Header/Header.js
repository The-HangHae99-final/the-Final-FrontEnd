import React, { useEffect, useState } from "react";
import UserAvatar from "../../elements/UserAvatar";
import styles from "../../pages/Main/main.module.css";
import { useDispatch } from "react-redux";
import ModalPortal from "../../elements/Portal/Portal";
import Modal from "../Modal";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Header = ({ isLoggedIn, handleLogin, handleSignup }) => {
  const [modalOn, setModalOn] = useState(false);
  const [name, setName] = useState("");
  const user = useSelector((state) => state.user.value);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    setName(user.user_name);
  }, [user]);

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
            <JoinButtons>
              {!modalOn ? (
                <>
                  <button onClick={handleModal}>로그인</button>
                  <button onClick={handleModal}>회원가입</button>
                </>
              ) : (
                <button onClick={() => console.log("로그아웃")}>
                  로그아웃
                </button>
              )}
            </JoinButtons>
          </div>
          <div className={styles.aboutUser}>
            <div className={styles.userAvatar}>
              <UserAvatar size="big" />
            </div>
            <div className={styles.userMetaInfo}>
              <span className={styles.greeting}>Hi!</span>
              <div className={styles.userName}>{name}님</div>
            </div>
          </div>
        </div>
      </header>
      <ModalPortal>
        {modalOn && <Modal text="login" onClose={handleModal} />}
      </ModalPortal>
    </>
  );
};

const JoinButtons = styled.div`
  display: flex;
  cursor: pointer;
`;

export default Header;
