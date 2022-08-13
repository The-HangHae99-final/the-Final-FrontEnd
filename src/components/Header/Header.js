import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  getItemFromLs,
  removeItemFromLs,
  resetItemFromLs,
  setItemToLs,
} from "../../utils/localStorage";
import Mask_basic from "../../public/img/avatar/Mask_basic.png";
import { Button } from "@mui/material";
import logo from "../../public/img/Login/logo-colored.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Icon, SvgIcon } from "@mui/material";

// module
import UserAvatar from "../../elements/UserAvatar";
import vector from "../../public/img/Vector1.png";
import sunIcon from "../../public/img/sun.png";
import bellIcon from "../../public/img/bell.png";
import ModalPortal from "../../elements/Portal/ModalPortal";
import WorkspaceModal from "../Modal/WorkspaceModal";
import { getUserInfo, userLogout } from "../../redux/userReducer";
import { getWorkSpaceData } from "../../redux/workSpaceReducer";
import reset from "../../redux/workSpaceReducer";
import NotificationModal from "../Modal/NotificationModal";
import useMountTransition from "../../utils/useMointTransition";
import MyProfileModal from "../Modal/MyProfileModal";
import * as common from "../../elements/toast";
import Board from "../../pages/Board";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../recoil/recoil";

const Header = ({ invitation }) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  console.log("userInfo: ", userInfo);
  const [workSpaceName, setWorkSpaceName] = useState("");
  const [modalOn, setModalOn] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const hasTransitionedIn = useMountTransition(isMounted, 1500);
  const [currentSocket, setCurrentSocket] = useState(null);
  const dropdownRef = useRef(null);
  const username = getItemFromLs("userName");
  const userEmail = getItemFromLs("userEmail");
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.value);
  const workspaceList = userInfo.workSpaceList;
  const dispatch = useDispatch();
  const location = useLocation();

  const [openMyProfileModal, setOpenMyProfileModal] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
    setOpenDropdown(false);
  };

  const closeNoti = () => {
    setOpenNoti(false);
  };

  const logout = () => {
    resetItemFromLs();
    common.successNotify("로그아웃 되었습니다.");
    navigate("/join/signin");
  };

  const handleDrowdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleWorkSpaceName = (e) => {
    setWorkSpaceName(e.target.value);
  };

  // const handleChange = (e) => {
  //   if (workspaceName.length >= 10) {
  //     setWorkSpaceNameMessage("10글자 이내로 지어주세요!");
  //   }
  //   setWorkSpaceNameMessage("");
  //   setWorkspaceName(e.target.value);
  // };

  //워크스페이스 생성
  const addNewWorkSpace = (e) => {
    axios
      .post(
        "https://teamnote.shop/api/work-spaces",
        { workSpaceName: `${getItemFromLs("userEmail")}+${workSpaceName}` },
        {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("res: ", res);
        setUserInfo({
          ...userInfo,
          workSpaceList: [...userInfo.workSpaceList, res.data.addedOwner],
        });
        setModalOn(false);
        setWorkSpaceName("");
        setIsMounted(true);
        setTimeout(() => {
          setIsMounted(false);
        }, 2500);
      });
  };

  const openNotiModal = () => {
    setOpenNoti(true);
  };

  const showMyProfileModal = () => {
    setOpenMyProfileModal(true);
  };

  const toNotion = () => {
    window.location.href =
      "https://sprout-dress-47a.notion.site/1f35cba8fca540b5ab8e09b73f014cab";
  };

  return (
    <>
      {location.pathname.includes("main") ? (
        <HeaderStyle>
          <div className="toggle-bar">
            <MenuIcon fontSize="large" />
          </div>
          <div className="spacer"></div>
          <Link to="/main" className="logo-wrap">
            <img src={logo} alt="logo" className="logo" />
          </Link>

          <img
            src={user.profile_image_url ? user.profile_image_url : Mask_basic}
            className="user-avatar_mobile"
            alt="user_avatar"
            style={{ width: "34px", height: "34px" }}
          />

          <div className="menuItems">
            <Button
              variant="outlined"
              onClick={toNotion}
              style={{ marginRight: "25px", color: "#7D8BD" }}
            >
              Guide
            </Button>

            <div className="menuBtns">
              <button className="menuBtn">
                <img src={sunIcon} alt="sun icon" />
              </button>
              <button className="menuBtn" onClick={openNotiModal}>
                <img src={bellIcon} alt="sun icon" />
                {invitation?.length >= 1 && (
                  <span className="badge">{invitation?.length}</span>
                )}
              </button>
              {openNoti && <NotificationModal onClose={closeNoti} />}
            </div>
            <AboutUser>
              <img
                src={
                  user.profile_image_url ? user.profile_image_url : Mask_basic
                }
                className="user-avatar"
                alt="user_avatar"
                style={{ width: "34px", height: "34px" }}
              />
              {/* <UserAvatar size="big" width={50} height={50} /> */}

              <div className="userMetaInfo">
                <span className="greeting">Hi!</span>

                {/* show dropdown */}
                <UsernameWrap className="usernameWrap">
                  <div className="username">{username}님</div>
                  <div
                    className={`vector-img-wrap ${
                      openDropdown ? "toBottom" : "toTop"
                    }`}
                    onClick={handleDrowdown}
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
                  <span className="edit_account" onClick={showMyProfileModal}>
                    | 편집하기
                  </span>
                </div>
                <div className="nav_email">{userEmail}</div>
              </li>
              <li className="nav-item">
                <div className="li-header">
                  <h3 className="li-header-title">내 워크스페이스</h3>
                  <span className="edit_account">| 편집하기</span>
                </div>
                <WorkspaceList>
                  {workspaceList &&
                    workspaceList?.map((item, idx) => {
                      const workspaceId = item?._id;
                      const workspaceName = item?.workSpace?.split("+");
                      return (
                        <li
                          key={idx}
                          className="workspace-item"
                          onClick={() => {
                            setOpenDropdown(false);
                            // dispatch(
                            //   getWorkSpaceData({
                            //     ...workspace,
                            //   })
                            // );
                            navigate(`/main/${item._id}/board`, {
                              state: {
                                workspaceName: item.workSpace,
                                workspaceId,
                              },
                            });
                          }}
                        >
                          <div className="workspace_avatar">
                            {workspaceName[1][0]}
                          </div>
                          <div className="current_workSpace">
                            {workspaceName[1]}
                          </div>
                        </li>
                      );
                    })}
                </WorkspaceList>
              </li>
              <li className="nav-item">
                <div className="li-header li-header_grey" onClick={handleModal}>
                  워크스페이스 추가
                </div>
              </li>
              <li className="nav-item">
                <div className="li-header li-header_grey" onClick={logout}>
                  로그아웃
                </div>
              </li>
            </ul>
          </nav>
          <ModalPortal>
            {modalOn && (
              <WorkspaceModal
                onClose={handleModal}
                addNewWorkSpace={addNewWorkSpace}
                workSpaceName={workSpaceName}
                setWorkSpaceName={setWorkSpaceName}
                handleWorkSpaceName={handleWorkSpaceName}
                modalOn={modalOn}
                setModalOn={setModalOn}
              />
            )}
          </ModalPortal>
          <ModalPortal>
            {openMyProfileModal && (
              <MyProfileModal
                onClose={handleModal}
                openMyProfileModal={openMyProfileModal}
                setOpenMyProfileModal={setOpenMyProfileModal}
              />
            )}
          </ModalPortal>
          {hasTransitionedIn || isMounted ? (
            <SuccessModalBox>
              <div
                className={`success-modal ${hasTransitionedIn && "in"} ${
                  isMounted && "visible"
                }`}
              >
                새로운 워크스페이스가 개설되었습니다!
              </div>
            </SuccessModalBox>
          ) : null}
        </HeaderStyle>
      ) : null}
    </>
  );
};

const HeaderStyle = styled.div`
  padding: 12px 24px;
  width: 100vw;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  position: relative;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: #bac9ff;
  .css-1rwt2y5-MuiButtonBase-root-MuiButton-root {
    color: #7d8bdb;
    /* transition: all 0.2s ease; */
    animation: motion 0.4s ease 0s infinite alternate;

    @keyframes motion {
      0% {
      }
      100% {
        transform: translateY(5px);
      }
    }
  }

  .logo {
    width: 40px;
  }

  .menuBtns {
    display: flex;
    align-items: center;
    gap: 25px;
    position: relative;

    .badge {
      position: absolute;
      top: -10px;
      right: -10px;
      padding: 5px 10px;
      border-radius: 50%;
      background: red;
      color: white;
      animation: MoveUpDown 1s linear infinite;
    }

    @keyframes MoveUpDown {
      0%,
      100% {
        transform: translateY(2px);
      }
      50% {
        transform: translateY(-2px);
      }
    }
  }

  .menuBtn {
    all: unset;
    width: 29px;
    height: 29px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .menuItems {
    display: flex;
    align-items: center;
    margin-left: 205px;
  }

  .menu {
    width: 271px;
    background-color: #ffffff;
    position: absolute;
    top: 80px;
    right: 0px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    border: 1px solid #ecedf1;
    box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .menu.active {
    opacity: 1;
    visibility: visible;
  }

  .nav-item {
    padding: 20px 25px 15px 25px;
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
    height: 24px;
    color: #7a858e;
    font-weight: 400;
  }

  .toggle-bar {
    display: none;
  }

  .spacer {
    display: none;
  }

  .user-avatar_mobile {
    display: none;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    .menuItems {
      display: none;
    }

    .toggle-bar {
      display: block;
      position: absolute;
      left: 10px;
      cursor: pointer;
    }

    .spacer {
      display: block;
    }

    .user-avatar_mobile {
      display: block;
      position: absolute;
      right: 10px;
    }
  }
`;

const WorkspaceList = styled.ul`
  display: Flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  height: 300px;
  overflow: scroll;
  scroll-behavior: smooth;
  .workspace-item {
    display: Flex;
    align-items: center;
  }

  .workspace_avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
    background: #f8f8f9;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.02em;
    color: #7d8bdb;
  }

  .current_workSpace {
    cursor: pointer;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.02em;
    color: #353841;
  }
`;

const AboutUser = styled.div`
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

const SuccessModalBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;

  .success-modal {
    padding: 15px 20px;
    height: 3.7rem;
    background: #889aff;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.02em;
    color: #ffffff;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .success-modal.in.visible {
    opacity: 1;
  }
`;

export default Header;
