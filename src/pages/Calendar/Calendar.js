// Calendar 페이지입니다

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";
import moment from "moment";

// file
import BigCalendar from "../../components/Calendar/BigCalendar";
import SmallCalendar from "../../components/Calendar/SmallCalendar";
import ModalPortal from "../../elements/Portal/ModalPortal";
import CalendarModal from "../../components/Modal/CalendarModal";
import { getItemFromLs } from "../../utils/localStorage";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const Calender = () => {
  const [modalOn, setModalOn] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const today = moment();

  // const monthTitle = document.querySelector(".react-datepicker__current-month");
  // console.log(monthTitle.);

  const { currentParams } = useOutletContext();

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
    color: "#7EA0E3",
    workSpaceName: "",
  });
  console.log("taskContents: ", taskContents);

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

  // 전체 개인 일정 조회 + 달력에 그리기
  // 1. startDate + (endDate에서 startDate와의 차이 일 수 ) using by add();
  // 2.
  const fetchMyTasks = () => {
    axios
      .get(`https://teamnote.shop/api/tasks/all/lists`, {
        headers: {
          Authorization: `Bearer ${getItemFromLs("myToken")}`,
        },
      })
      .then((res) => console.log(res));
  };

  // 전체 팀 일정 조회
  const fetchTeamTasks = () => {
    // axios({
    //   method: "post",
    //   url: "https://teamnote.shop/api/team-tasks/lists",
    //  {
    //     workSpaceName: currentParams,
    //   },
    //   headers: {
    //     Authorization: `Bearer ${getItemFromLs("myToken")}`,
    //   },
    // })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    axios
      .post(
        "https://teamnote.shop/api/team-tasks/lists",
        {
          workSpaceName: currentParams,
        },
        {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        }
      )
      .then((res) => console.log(res));
  };

  useEffect(() => {
    setTaskContents({
      ...taskContents,
      workSpaceName: currentParams,
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
      cursor: pointer;
    }
  }

  .rightSection {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }

  .react-datepicker__navigation {
    display: none;
  }
`;

export default Calender;
