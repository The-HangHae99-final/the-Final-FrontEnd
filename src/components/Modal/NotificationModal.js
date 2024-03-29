import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../elements/Portal/ModalPortal";
import { getItemFromLs } from "../../utils/localStorage";
import { useSelector, useDispatch } from "react-redux";
import { removeInvitation } from "../../redux/userReducer";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/recoil";

const NotificationModal = ({ onClose }) => {
  const [userInfo, setUser] = useRecoilState(userState);
  const invitations = userInfo.invitation;

  // 초대 수락
  const accept = (invitee, fromThisWorkSpaceName, clickedID) => {
    axios
      .post(
        "https://teamnote.shop/api/members/inviting/accepting",
        { userEmail: invitee, workSpaceName: fromThisWorkSpaceName },
        {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        }
      )
      .then((res) => {
        const filteredInvitation = invitations.filter((item) => {
          return item._id !== clickedID;
        });
        setUser({
          ...userInfo,
          workSpaceList: [...userInfo.workSpaceList, res.data.createdMember],
          invitation: [...filteredInvitation],
        });
      })
      .catch((err) => console.log(err));
  };

  const refuse = () => {
    axios
      .delete("https://teamnote.shop/api/members/inviting", {
        headers: {
          Authorization: `Bearer ${getItemFromLs("myToken")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <NotificationModalBg>
      <WorkspaceModalStyle>
        <div className="workspace-create-box-wrap">
          <div className="workspace-name">Notification</div>
          <ul className="noti-list">
            {invitations &&
              invitations.map((item, idx) => {
                console.log("item: ", item);
                const invitee = item.userEmail;
                const fromThisWorkSpaceName = item.workSpaceName;
                const clickedID = item._id;
                return (
                  <li className="noti" key={idx}>
                    <div>
                      {item.inviter}님이 {item.workSpaceName.split("+")[1]}
                      (으)로 초대하셨습니다!
                    </div>
                    <div className="decision_button">
                      <button
                        className="decision decision_accept"
                        onClick={() =>
                          accept(invitee, fromThisWorkSpaceName, clickedID)
                        }
                      >
                        수락
                      </button>
                      <button
                        className="decision decision_refused"
                        onClick={() => refuse()}
                      >
                        거절
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
          <div className="active-buttons">
            <button className="active-button cancel" onClick={onClose}>
              뒤로가기
            </button>
          </div>
        </div>
      </WorkspaceModalStyle>
    </NotificationModalBg>
  );
};

const NotificationModalBg = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  font-size: 50px;
  backdrop-filter: blur(10px);
  z-index: 999;
`;

const WorkspaceModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 541px;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 30px 100px;

  .workspace-create-box-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .workspace-name {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.02em;
    color: #7d8bdb;
    margin-bottom: 20px;
  }

  .input-wrap {
    display: flex;
    margin-bottom: 25px;
    align-items: center;
    width: 100%;
    position: relative;
    margin-bottom: 30px;
  }

  .create-box_input {
    border: none;
    padding: 15px;
    width: 100%;
    border-radius: 5px;
    outline: none;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #353841;

    ::placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.02em;
      color: #cbcbd7;
    }
  }

  .decision_button {
    display: flex;
    gap: 10px;

    .decision {
      all: unset;
      padding: 4px 14px;
      cursor: pointer;
      color: white;
      border-radius: 5px;
    }
    .decision_accept {
      background-color: #7d8bdb;
    }

    .decision_refused {
      background-color: #c1c9cf;
    }
  }

  .active-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;

    & > .active-button {
      all: unset;
      padding: 10px 0px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #ffffff;
      border-radius: 5px;
      cursor: pointer;
    }

    & > .cancel {
      background: #c1c9cf;
      width: 42%;
    }
    & > .submit {
      background: #7d8bdb;
      width: 58%;
    }
  }

  .noti-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .noti {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
`;

export default NotificationModal;
