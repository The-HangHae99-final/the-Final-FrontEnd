import React, { useEffect, useState } from "react";
import UserAvatar from "../../elements/UserAvatar";
import styles from "../../pages/Main/main.module.css";
import { useDispatch } from "react-redux";
import ModalPortal from "../../elements/Portal/Portal";
import Modal from "../Modal";
import { useSelector } from "react-redux";
import styled from "styled-components";
import vector from "../../public/img/Vector1.png";

const Header = () => {
  const [name, serName] = useState("");
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    serName(user.user_name);
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
          </div>
          <AboutUser>
            <UserAvatar size="big" width={50} height={50} />
            <div className="userMetaInfo">
              <span className="greeting">Hi!</span>
              <UsernameWrap className="usernameWrap">
                <div className="username">{name}님</div>
                <div className="vector-img-wrap">
                  <img src={vector} alt="vector" className="vector-img"></img>
                </div>
              </UsernameWrap>
            </div>
          </AboutUser>
        </div>
      </header>
      {/* <ModalPortal>
        {modalOn && <Modal text="login" onClose={handleModal} />}
      </ModalPortal> */}
    </>
  );
};

const AboutUser = styled.div`
  width: 130px;
  margin-left: 42px;
  display: flex;
  align-items: center;
  background-color: red;

  & > .userMetaInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 11px;
  }

  & > .userMetaInfo .greeting {
    font-size: 24px;
    font-weight: 600;
    color: #7d8bdb;
    line-height: 36px;
  }
`;

const UsernameWrap = styled.div`
  display: flex;
  justify-content: center;
  & > .username {
    margin-right: 6px;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: -2%;
    line-height: 21px;
  }

  & > .vector-img-wrap {
    padding: 2px 2px;
  }

  & > .vector-img-wrap .vector-img {
    width: 15px;
    height: 10px;
    cursor: pointer;
    padding: 2px 2px;
  }
`;

// const UserName = styled.div``;
// const UserName = styled.div``;
// const UserName = styled.div``;
// const UserName = styled.div``;
// const UserName = styled.div``;
// const UserName = styled.div``;
// const UserName = styled.div``;

export default Header;
