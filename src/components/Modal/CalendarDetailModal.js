import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faComment,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const CalendarDetailModal = ({ currentDetailTask, onClose }) => {
  const { title, desc, startDate, color } = currentDetailTask;
  return (
    <CalendarDetailStyle>
      <h2 className="title">{title}</h2>
      <div className="date">
        <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
        {startDate}
      </div>
      <h3 className="desc">
        <FontAwesomeIcon icon={faComment} className="comment-icon" />
        {desc}
      </h3>
      <FontAwesomeIcon
        icon={faXmark}
        className="cancle-icon"
        onClick={onClose}
      />
    </CalendarDetailStyle>
  );
};

const CalendarDetailStyle = styled.div`
  font-size: 14px;
  position: absolute;
  bottom: 50%;
  right: 50%;
  transform: translate(50%, 50%);
  width: 20%;
  padding: 20px;
  z-index: 999;
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.3);
  background-color: white;
  display: relative;

  .title {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 15px;
  }

  .date {
    color: #808080;
    margin-bottom: 20px;

    .calendar-icon {
      margin-right: 10px;
    }
  }

  .desc {
    color: #808080;
    .comment-icon {
      margin-right: 10px;
    }
  }

  .cancle-icon {
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
  }
`;

export default CalendarDetailModal;
