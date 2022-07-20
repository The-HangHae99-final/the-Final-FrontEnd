// Calendar 페이지입니다

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";

// file
import BigCalendar from "../../components/BigCalendar";
import SmallCalendar from "../../components/SmallCalendar";
import ModalPortal from "../../elements/Portal/ModalPortal";
import CalendarModal from "../../components/Modal/CalendarModal";
import { getItemFromLs } from "../../components/localStorage";
import axios from "axios";

const Calender = () => {
  const [modalOn, setModalOn] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleModal = (e) => {
    setModalOn(() => {
      setModalTitle(e.target.title);
      return !modalOn;
    });
  };

  const [taskContents, setTaskContents] = useState({
    startDate: "",
    endDate: "",
    title: "",
    desc: "",
    color: "#FFFF",
    workSpaceName: "",
  });

  const handleTaskInfoChange = (e) => {
    const { value, name } = e.target;
    setTaskContents({ ...taskContents, [name]: value });
  };

  const handleTaskDateChage = (startDate, endDate) => {
    setTaskContents({
      ...taskContents,
      startDate: startDate,
      endDate: endDate,
    });
  };

  // 전체 개인 일정 조회
  const fetchMyTasks = () => {
    axios({
      method: "get",
      url: "http://52.79.251.110:3001/api/mytask",
      headers: {
        Authorization: `Bearer ${getItemFromLs("myToken")}`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // 전체 팀 일정 조회
  const fetchTeamTasks = () => {
    axios({
      method: "post",
      url: "http://52.79.251.110:3001/api/task/team/workSpaceName/all",
      data: {
        workSpaceName: `${getItemFromLs("workspace")}`,
      },
      headers: {
        Authorization: `Bearer ${getItemFromLs("myToken")}`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setTaskContents({
      ...taskContents,
      workSpaceName: `${getItemFromLs("workspace")}`,
    });
  }, []);

  return (
    <CalenderStyle className="calenderStyle">
      <div className="leftSection">
        {/* 작은 달력 */}
        <SmallCalendar />

        {/* My Calendar */}
        <div className="myCalender-box">
          <div className="teamchat-box">
            <div className="box-header">
              <div className="box-title" onClick={fetchMyTasks}>
                My calendar
              </div>
            </div>
            <ul className="calender-list-my">
              <li className="calender-item">
                <div className="diffcolor blue"></div>
                <span className="daily-title">Contents design</span>
              </li>
              <li className="calender-item">
                <div className="diffcolor red"></div>
                <span className="daily-title">Product design</span>
              </li>
              <div
                className="add-button-container"
                title="My calendar"
                onClick={handleModal}
              >
                <button className="add-button">
                  <div>+</div>
                </button>
                <span>Add</span>
              </div>
            </ul>
          </div>
        </div>

        {/* Team calendar */}
        <div className="teamCalender">
          <div className="teamchat-box">
            <div className="box-header">
              <div className="box-title" onClick={fetchTeamTasks}>
                Team calendar
              </div>
            </div>
            <ul className="calender-list calender-list-team">
              <li className="calender-item">
                <div className="diffcolor yellow"></div>
                <span className="daily-title">Meeting</span>
              </li>
              <li className="calender-item">
                <div className="diffcolor red"></div>
                <span className="daily-title">Event</span>
              </li>
              <div
                className="add-button-container"
                onClick={handleModal}
                title="Team calendar"
              >
                <button className="add-button">
                  <div>+</div>
                </button>
                <span>Add</span>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="rightSection">
        {/* 큰 달력 */}
        <BigCalendar />
      </div>
      <ModalPortal>
        {modalOn && (
          <CalendarModal
            onClose={handleModal}
            modalTitle={modalTitle}
            taskContents={taskContents}
            setTaskContents={setTaskContents}
            handleTaskInfoChange={handleTaskInfoChange}
            handleTaskDateChage={handleTaskDateChage}
          />
        )}
      </ModalPortal>
    </CalenderStyle>
  );
};

const CalenderStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;

  .leftSection {
    width: 280px;
    height: 100%;
    padding: 30px 20px;
    background-color: #ffffff;

    .myCalender-box {
      margin-top: 25px;
      height: 191px;
    }

    .calender-item {
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      color: #353841;
      padding: 13px 10px;
      display: Flex;
    }

    .diffcolor {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .diffcolor.yellow {
      background: #f4d687;
    }

    .diffcolor.red {
      background: #e37e7e;
    }

    .diffcolor.blue {
      background: #7ea0e3;
    }

    .add-button-container {
      padding: 13px 10px;
      display: flex;
      align-items: center;
      color: #7a858e;
      opacity: 0.7;
      cursor: pointer;
    }

    .add-button {
      all: unset;
      border-radius: 50%;
      margin-right: 10px;
      opacity: 0.7;
      border: 1px solid #7a858e;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        height: 100%;
        display: Flex;
        align-items: center;
        transform: translateY(3%);
      }
    }

    .box-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 24px;
    }

    .box-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #7d8bdb;
    }
  }

  .rightSection {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
`;

export default Calender;
