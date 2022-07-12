// Calendar 페이지입니다

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";

// file
import BigCalendar from "../../components/BigCalendar";
import SmallCalendar from "../../components/SmallCalendar";

const Calender = () => {
  return (
    <CalenderStyle className="calenderStyle">
      <div className="leftSection">
        {/* 작은 달력 */}
        <SmallCalendar />

        {/* My Calendar */}
        <div className="myCalender-box">
          <div className="teamchat-box">
            <div className="box-header">
              <div className="box-title">My calendar</div>
              <button></button>
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
              <div className="add-button-container">
                <button className="add-button">+</button>
                <span>Add</span>
              </div>
            </ul>
          </div>
        </div>

        {/* Team calendar */}
        <div className="teamCalender">
          <div className="teamchat-box">
            <div className="box-header">
              <div className="box-title">Team calendar</div>
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
              <div className="add-button-container">
                <button className="add-button">+</button>
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
    }

    .add-button {
      cursor: pointer;
      margin-right: 10px;
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
