import styles from "./main.module.css";
import Header from "../../components/Header/Header";
import { Outlet, useParams } from "react-router-dom";
import LoginModal from "../../elements/LoginModal";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import PrivateMain from "../../components/PrivateMain";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkSpaceList } from "../../redux/userReducer";

import boardIcon from "../../public/img/image27.png";
import calendarIcon from "../../public/img/image25.png";
import chatIcon from "../../public/img/image26.png";
import ScreenForNewbie from "../../components/ScreenForNewbie";
import ScreenForUser from "../../components/ScreenForUser";

import axios from "axios";
import { getItemFromLs } from "../../utils/localStorage";

const Main = ({ isNewbieUser }) => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const REQUIRED_ID = id === undefined;
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [workSpaceList, setWorkSpaceList] = useState([]);

  const [workspaceName, setWorkspaceName] = useState("");
  console.log("workspaceName: ", workspaceName);
  const [modalOn, setModalOn] = useState(false);
  console.log("modalOn: ", modalOn);

  const handleWorkSpaceName = (e) => {
    setWorkspaceName(e.target.value);
  };

  //워크스페이스 추가
  const addNewWorkSpace = (e) => {
    axios
      .post(
        "https://0jun.shop/api/work-spaces",
        { name: workspaceName },
        {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setWorkspaceName("");
        setModalOn(!modalOn);
        alert("새로운 워크스페이스가 만들어졌어요");
      });
  };
  console.log("modalOn: ", modalOn);

  // 소속된 워크스페이스 전체 조회
  useEffect(() => {
    try {
      axios
        .get("https://0jun.shop/api/work-spaces/lists", {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        })
        .then((res) => {
          console.log("res: ", res);
          if (res.data.success) {
            const wsInfoList = res.data.includedList;
            const wsList = wsInfoList.map((ws) => ws.name);
            setWorkSpaceList([...wsList]);
            dispatch(
              getWorkSpaceList({
                ...user,
                workSpaceList: [...wsList],
              })
            );
          }
        });
    } catch {
      alert(" 불러오는 도중 에러가 발생했습니다 :(");
    }
  }, []);

  return (
    <MainStyle>
      <LeftSide>
        <div
          className="logo"
          onClick={() => {
            navigate(`/main`);
          }}
        ></div>
        <div className="buttons">
          <div className="buttonWrap">
            <div
              onClick={() => {
                navigate(`/main/${id}/board`);
              }}
              className="page-navigate-button"
            >
              <img src={boardIcon} alt="boardcon" className="boardcon" />
            </div>
          </div>
          <div className="buttonWrap">
            <a className="page-navigate-button" href={`/main/${id}/calendar`}>
              <img
                src={calendarIcon}
                alt="calendarIcon"
                className="calendarIcon"
              />
            </a>
          </div>
          <div className="buttonWrap">
            <div className="page-navigate-button" href={`/main/${id}/calendar`}>
              <img src={chatIcon} alt="chatIcon" className="chatIcon" />
            </div>
          </div>
        </div>
      </LeftSide>

      <RightSide>
        <Header
          workSpaceList={workSpaceList}
          addNewWorkSpace={addNewWorkSpace}
          workspaceName={workspaceName}
          setWorkspaceName={setWorkspaceName}
          handleWorkSpaceName={handleWorkSpaceName}
          modalOn={modalOn}
          setModalOn={setModalOn}
        />
        <main className="mainStyle">
          {isNewbieUser ? (
            <ScreenForNewbie />
          ) : (
            <>
              <ScreenForUser REQUIRED_ID={REQUIRED_ID} />
              {/* <Outlet /> */}
            </>
          )}
        </main>
      </RightSide>
    </MainStyle>
  );
};

const MainStyle = styled.div`
  height: 100vh;
  display: flex;
`;

const LeftSide = styled.div`
  background-color: #889aff;
  height: 100%;
  width: 80px;
  min-width: 80px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
  box-sizing: border-box;

  .page-navigate-button {
    cursor: pointer;
  }

  .boardcon {
    width: 28px;
    height: 33px;
  }

  .calendarIcon {
    width: 32px;
    height: 35px;
  }

  .chatIcon {
    width: 34px;
    height: 34px;
  }

  .logo {
    width: 60px;
    height: 60px;
    background-color: white;
    border-radius: 50%;
  }

  .buttons {
    margin-top: 121px;
    display: Flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 48px;
  }

  .buttonWrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    position: relative;
    transition: all 0.2s ease;
    cursor: pointer;

    :hover {
      background: #687cec;
    }

    :hover.buttonWrap::before {
      content: "";
      width: 10px;
      height: 100%;
      background: #4357c9;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

const RightSide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ecedf1;
  padding: 20px 20px 0px 20px;
  display: flex;
  overflow: hidden;

  .mainStyle {
    width: 100%;
    height: 100%;
    background-color: #ecedf1;
    padding: 20px;
    display: flex;
    gap: 20px;
    overflow: hidden;
  }
`;
// const SectionWrap = styled.div``;
// const SectionWrap = styled.div``;
// const SectionWrap = styled.div``;
// const SectionWrap = styled.div``;
// const SectionWrap = styled.div``;

export default Main;
