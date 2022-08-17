import styled from "styled-components";
import { useState } from "react";

const CalendarLabel = ({ style, title, labels, onClickTitle, onClickAdd }) => {
  return (
    <CalendarLabelStyle className="myCalender-box" style={style}>
      <div className="teamchat-box">
        <div className="box-header">
          <div className="box-title">{title}</div>
        </div>
        <ul className="calender-list-my">
          {labels.map((label, idx) => {
            return (
              <li className="calender-item" key={idx}>
                <DiffColor color={label.color}></DiffColor>
                <span className="daily-title">{label.title}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </CalendarLabelStyle>
  );
};

const CalendarLabelStyle = styled.div`
  .myCalender-box {
    margin-top: 10px;
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

  .calender-item {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #353841;
    padding: 13px 10px;
    display: Flex;
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
`;

const DiffColor = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: ${({ color }) => color};
`;
export default CalendarLabel;
