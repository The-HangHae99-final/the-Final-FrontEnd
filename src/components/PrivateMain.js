import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getItemFromLs } from "./localStorage";
import addMemberIcon from "../public/img/addMemberIcon.png";
import thunder from "../public/img/thunder.png";
import AddMemberModal from "./Modal/AddMemberModal";
import ModalPortal from "../elements/Portal/ModalPortal";
import axios from "axios";

const PrivateMain = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [newMember, setNewMember] = useState({
    workSpaceName: "",
    userEmail: "",
  });
  const [modalOn, setModalOn] = useState(false);

  const workSpaceName = getItemFromLs("workspace");

  const handleAddMember = () => {
    setModalOn(!modalOn);
  };
  console.log(modalOn);

  const handleChange = (e) => {
    setNewMember({ ...newMember, userEmail: e.target.value });
  };

  const closeModal = (e) => {
    setModalOn(!modalOn);
  };
  console.log(newMember);
  const getNewMember = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: "http://13.209.3.168:3001/api/workSpace/memberAdd/workSpaceName",
      data: newMember,
      headers: {
        Authorization: `Bearer ${getItemFromLs("myToken")}`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setNewMember({
      ...newMember,
      workSpaceName: `${getItemFromLs("workspace")}`,
    });
  }, []);

  return (
    <PrivateMainStyle>
      <MainHeader className="MainHeader">
        <h1 className="main-header-workspace-name">
          {workSpaceName ? (
            workSpaceName.split("+")[1]
          ) : (
            <h1>워크스페이스를 선택해주세요!</h1>
          )}
        </h1>
        <button className="main-header-addBtn" onClick={handleAddMember}>
          <img src={addMemberIcon} alt="addMemberIcon" className="addBtn-img" />
          <span className="addBtn-name">멤버 추가하기</span>
        </button>
      </MainHeader>
      <PrivateMainContainer>
        <PrivateMainLeft>
          <LeftTop>
            <div className="notice-wrap">
              <div className="wrap-header">
                <img src={thunder} alt="thunder" />
                <h3 className="main-wrap-title">Notice</h3>
              </div>
              <div className="notice-screen"></div>
            </div>

            <div className="time_tasking-wrap">
              <div className="wrap-header">
                <img src={thunder} alt="thunder" />
                <h3 className="main-wrap-title">Time Tasking</h3>
              </div>
            </div>
          </LeftTop>
        </PrivateMainLeft>
        <PrivateMainRight>hihi</PrivateMainRight>
      </PrivateMainContainer>
      <ModalPortal>
        {modalOn && (
          <AddMemberModal
            handleChange={handleChange}
            onClose={closeModal}
            getNewMember={getNewMember}
          />
        )}
      </ModalPortal>
    </PrivateMainStyle>
  );
};

const PrivateMainStyle = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const PrivateMainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: Flex;
  gap: 20px;
`;

const MainHeader = styled.div`
  width: 100%;
  height: 10%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;

  .main-header-workspace-name {
    font-weight: 400;
    font-size: 30px;
    line-height: 45px;
    color: #353841;
  }

  .main-header-addBtn {
    all: unset;
    background: #7d8bdb;
    min-width: 252px;
    height: 57px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .addBtn-img {
    width: 25px;
    height: 20px;
    margin-right: 15px;
  }

  .addBtn-name {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #ffffff;
  }
`;

const PrivateMainLeft = styled.div`
  max-width: 820px;
  height: 100%;
  background-color: steelblue;
`;

const LeftTop = styled.div`
  display: Flex;
  gap: 20px;

  .notice-wrap {
    width: 300px;
    height: 476px;
    background-color: tomato;
  }

  .time_tasking-wrap {
    width: 500px;
    background-color: red;
  }
`;

const PrivateMainRight = styled.div`
  width: 480px;
  background-color: teal;
`;

// const PrivateMainStyle = styled.div`
// `;
// const PrivateMainStyle = styled.div`
// `;
// const PrivateMainStyle = styled.div`
// `;
// const PrivateMainStyle = styled.div`
// `;

export default PrivateMain;
