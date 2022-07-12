import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styled from "styled-components";

const BigCalendar = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <BigCalendarStyle>
      <DatePicker inline />
    </BigCalendarStyle>
  );
};

const BigCalendarStyle = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 40px 0px 40px;
  > div {
    height: 100%;
  }

  .react-datepicker {
    width: 100%;
    height: 100%;
    font-size: 16px;
  }

  .react-datepicker__month-container {
    width: 100%;
    height: 100%;
  }

  /* 월 년도 헤더 섹션*/
  .react-datepicker__current-month {
    display: Flex;
    justify-content: flex-start;
    font-weight: 600;
    font-size: 34px !important;
    line-height: 36px !important;
    margin-bottom: 28px;
  }

  /* 일 전체 컨테이너 박스 */
  .react-datepicker__month {
    margin: 0;
    height: calc(100% - 100px);
    display: Flex;
    flex-direction: column;
    justify-content: space-around;
    border-left: 1px solid rgb(187, 196, 246, 0.3);
    border-top: 1px solid rgb(187, 196, 246, 0.3);
  }

  /* 한 주 컨테이너 박스 */
  .react-datepicker__week {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  /* 요일 이름 컨테이너 박스 */
  .react-datepicker__day-names {
    display: Flex;
    justify-content: space-around;
    border-top: 1px solid rgb(187, 196, 246, 0.3);
    border-left: 1px solid rgb(187, 196, 246, 0.3);
    border-bottom: 1px solid rgb(187, 196, 246, 0.3);
  }

  .react-datepicker__day-name {
    margin: 0px;
    padding: 3px 0px;
    width: 100%;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #7d8bdb;
    border-right: 1px solid rgb(187, 196, 246, 0.3);
  }

  /* 일 별 컨테이너 박스 */
  .react-datepicker__day {
    margin: 0;
    border-radius: 0px;
    width: 100%;
    text-align: start;
    padding: 10px;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.02em;
    color: #7a858e;
    border-right: 1px solid rgb(187, 196, 246, 0.3);
    border-bottom: 1px solid rgb(187, 196, 246, 0.3);
  }

  .react-datepicker__day--weekend {
    color: #e37e7e;
    width: 100%;
  }

  /* 해당 달이 아닌 일 */
  .react-datepicker__day--outside-month {
    color: #dcdce8;
  }
`;

export default BigCalendar;
