import React, { useEffect, useRef, useState } from "react";
import UserAvatar from "../../elements/UserAvatar";
import styles from "../../pages/Main/main.module.css";
import { useSelector } from "react-redux";
import styled from "styled-components";
import vector from "../../public/img/Vector1.png";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [userInfo, seruserInfo] = useState({});
  const user = useSelector((state) => state.user.value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    seruserInfo({ ...user });
  }, [user]);
  return (
    <>
      <HeaderStyle>
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

              {/* show dropdown */}
              <UsernameWrap className="usernameWrap">
                <div className="username">{userInfo.user_name}님</div>
                <div
                  className={`vector-img-wrap ${
                    openDropdown ? "toBottom" : "toTop"
                  }`}
                  onClick={() => setOpenDropdown(!openDropdown)}
                >
                  <img src={vector} alt="vector" className="vector-img"></img>
                </div>
              </UsernameWrap>
            </div>
          </AboutUser>
        </div>
        <nav
          ref={dropdownRef}
          className={`menu ${openDropdown ? "active" : "inactive"}`}
        >
          <ul>
            <li className="nav-item">
              <div className="li-header">
                <h3 className="li-header-title">내 계정</h3>
                <span className="edit_account">| 편집하기</span>
              </div>
              <div className="nav_email">{userInfo.user_email}</div>
            </li>
            <li className="nav-item">
              <div className="li-header">
                <h3 li-header-title>내 워크스페이스</h3>
                <span className="edit_account">| 편집하기</span>
              </div>
              <WorkspaceList>
                <li className="workspace-item">
                  <div className="workspace_avatar"></div>
                  <div className="workspace_name">항해99 1조</div>
                </li>
                <li className="workspace-item">
                  <div className="workspace_avatar"></div>
                  <div className="workspace_name">7기 디자이너</div>
                </li>
              </WorkspaceList>
            </li>
            <li className="nav-item">
              <div className="li-header li-header_grey">워크스페이스 추가</div>
            </li>
            <li className="nav-item">
              <div className="li-header li-header_grey">로그아웃</div>
            </li>
          </ul>
        </nav>
      </HeaderStyle>
      {/* <ModalPortal>
        {modalOn && <Modal text="login" onClose={handleModal} />}
      </ModalPortal> */}
    </>
  );
};

const HeaderStyle = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-end;
  padding: 15px 0px;
  position: relative;

  .menu {
    width: 271px;
    background-color: #ffffff;
    position: absolute;
    top: 80px;
    right: 0px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  }

  .menu.active {
    opacity: 1;
    visibility: visible;
  }

  .nav-item {
    padding: 20px 25px;
    border: 1px solid #ecedf1;
  }

  .li-header {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  .li-header_grey {
    color: #7a858e;
    cursor: pointer;
  }

  .li-header-title {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -2%;
  }

  .edit_account {
    line-height: 24px;
    letter-spacing: -2%;
    color: #cbcbd7;
    margin-left: 4px;
    cursor: pointer;
  }

  .nav_email {
    font-size: 16px;
    line-height: 24px;
    color: #7a858e;
    font-weight: 400;
  }
`;

const WorkspaceList = styled.ul`
  display: Flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  .workspace-item {
    display: Flex;
    align-items: center;
  }

  .workspace_avatar {
    width: 40px;
    height: 40px;
    background-color: aquamarine;
    border-radius: 50%;
    margin-right: 20px;
  }

  .workspace_name {
    cursor: pointer;
  }
`;

const AboutUser = styled.div`
  width: 140px;
  margin-left: 42px;
  display: flex;
  align-items: center;

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

  .vector-img-wrap {
    padding: 4px;
    display: Flex;
    align-items: center;
  }

  .username {
    margin-right: 6px;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: -2%;
    line-height: 21px;
  }

  .vector-img-wrap .vector-img {
    width: 15px;
    height: 10px;
    cursor: pointer;
    padding: 2px 2px;
  }

  .toTop {
    transform: rotate(180deg);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  }

  .toBottom {
    transform: rotate(0deg);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  }
`;

// const HeaderStyle = styled.div``;
// const UserName = styled.div``;
// const UserName = styled.div``;
// const UserName = styled.div``;
// const UserName = styled.div``;
// const UserName = styled.div``;
// const UserName = styled.div``;

export default Header;
