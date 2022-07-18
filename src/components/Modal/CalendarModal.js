import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import ModalPortal from "../../elements/Portal/ModalPortal";
import clockIcon from "../../public/img/clockIcon.png";
import hamburger from "../../public/img/hamburger.png";
import Vector3 from "../../public/img/Vector3.png";
import { TextareaAutosize } from "@mui/base";
import ko from "date-fns/locale/ko";
import { getItemFromLs } from "../localStorage";

registerLocale("ko", ko);

const CalendarModal = ({
  onClose,
  modalTitle,
  setTaskContents,
  taskContents,
  handleTaskInfoChange,
  handleTaskDateChage,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPickers, setShowPickers] = useState(false);

  // UTC 시간 -> 한국 시간으로 변환
  const toKrTime = (date) => {
    return new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
  };

  // 개인 일정 or 팀 일정 생성 함수
  const taskSubmit = (e) => {
    e.preventDefault();
    if (modalTitle === "My calendar") {
      console.log("개인일정 요청임!");
      axios({
        method: "post",
        url: "http://54.180.29.68/api/mytask/work",
        data: taskContents,
        headers: {
          Authorization: `Bearer ${getItemFromLs("myToken")}`,
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      console.log("팀일정 요청임!");
      axios({
        method: "post",
        url: "http://54.180.29.68/api/task/team/workSpaceName",
        data: taskContents,
        headers: {
          Authorization: `Bearer ${getItemFromLs("myToken")}`,
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const showColorPickers = () => {
    setShowPickers(!showPickers);
  };

  useEffect(() => {
    const end_date_kr = toKrTime(endDate).split("T")[0];
    const start_date_kr = toKrTime(startDate).split("T")[0];
    handleTaskDateChage(start_date_kr, end_date_kr);
  }, [startDate, endDate]);

  return (
    <ModalPortal>
      <CalendarModalBg>
        <CalendarModalStyle>
          <h3 className="task-title">{modalTitle}</h3>
          {/* 캘린더 데이터 폼 */}
          <form className="task-form">
            <input
              type="text"
              placeholder="일정 이름을 입력하세요"
              className="task-name"
              name="title"
              value={taskContents.title}
              onChange={handleTaskInfoChange}
            />

            <RegisterDate>
              <img src={clockIcon} alt="clock" className="clockIcon" />
              <div className="datepickerWrap">
                <DatePickerCustom
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  value={startDate}
                  locale="ko"
                  dateFormat="yyyy-MM-dd"
                  style={{
                    border: "none",
                  }}
                  name="startDate"
                />
                <DatePickerCustom
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  value={endDate}
                  locale="ko"
                  dateFormat="yyyy-MM-dd"
                  name="endDate"
                />
              </div>
            </RegisterDate>
            <ColorPickWrap>
              <div className="color-pick_circle"></div>
              <span className="color-pick_title" name="color">
                기본 색상
              </span>
              <div className="color-pick_icon-wrap" onClick={showColorPickers}>
                <img src={Vector3} alt="Vector3" className="color-pick_icon" />
              </div>
            </ColorPickWrap>

            <TextWrap>
              <img
                src={hamburger}
                alt="hamburger"
                className="task-hamburgerIcon"
              />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="설명을 입력하세요"
                style={{
                  width: "100%",
                  resize: "none",
                  height: "114px",
                  padding: "7px 13px",
                }}
                name="desc"
                className="task-textarea"
                value={taskContents.desc}
                onChange={handleTaskInfoChange}
              />
            </TextWrap>

            <ButtonsWrap className="modal-buttons">
              <button onClick={onClose} className="task-button button_cancel">
                취소하기
              </button>

              <button
                onClick={taskSubmit}
                className="task-button button_register"
              >
                등록하기
              </button>
            </ButtonsWrap>
          </form>
        </CalendarModalStyle>
      </CalendarModalBg>
    </ModalPortal>
  );
};

const CalendarModalBg = styled.div`
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
  z-index: 999;
`;

const CalendarModalStyle = styled.div`
  width: 381px;
  background: #ffffff;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.19);
  padding: 20px;
  display: Flex;
  flex-direction: column;
  align-items: flex-start;

  .task-title {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: #7d8bdb;
  }
  .task-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .task-name {
    border: none;
    border-bottom: 1px solid #dcdce8;
    width: 100%;
    padding: 6px 0px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #353841;
  }

  .task-name::placeholder {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
    outline: none;
    color: #cbcbd7;
  }

  .task-name:focus,
  .task-textarea:focus {
    outline: none;
  }
`;

const RegisterDate = styled.div`
  margin-top: 21px;
  display: flex;

  .clockIcon {
    width: 24px;
    height: 24px;
    margin-right: 11px;
  }

  .datepickerWrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 8px;
  }

  .react-datepicker-wrapper {
    height: 20px;
  }

  .react-datepicker__input-container {
    display: Flex;
  }
`;

const DatePickerCustom = styled(DatePicker)`
  border: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: #353841;
  cursor: pointer;

  .react-datepicker__triangle::before,
  .react-datepicker__triangle::after {
    display: none;
  }
`;

const ColorPickWrap = styled.div`
  margin: 20px 0px;
  display: Flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  .color-pick_circle {
    width: 22px;
    height: 22px;
    background-color: #7ea0e3;
    border-radius: 50%;
    margin-right: 12px;
  }

  .color-pick_title {
    font-weight: 500;
    font-size: 14px;
    letter-spacing: -0.02em;
    color: #353841;
  }

  .color-pick_icon-wrap {
    padding: 2px 4px;
    cursor: pointer;
    height: 100%;
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
  }

  .color-pick_icon {
  }
`;

const TextWrap = styled.div`
  display: flex;
  .task-hamburgerIcon {
    width: 20px;
    height: 17px;
    margin-right: 13px;
  }

  .task-textarea {
    border: 1px solid #cbcbd7;
    border-radius: 5px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #353841;
  }

  .task-textarea::placeholder {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #cbcbd7;
  }
`;

const ButtonsWrap = styled.div`
  display: Flex;
  gap: 9px;
  margin-top: 26px;
  position: relative;
  bottom: 0;
  .task-button {
    height: 40px;
    border-radius: 5px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
    border: none;
    cursor: pointer;
  }

  .button_register {
    background: #7d8bdb;
    width: 196px;
  }
  .button_cancel {
    background: #c1c9cf;
    width: 136px;
  }
`;

export default CalendarModal;
