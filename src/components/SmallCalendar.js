import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const SmallCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <SmallCalendarSytle>
      <DatePicker selected={startDate} inline />
    </SmallCalendarSytle>
  );
};

const SmallCalendarSytle = styled.div`
  .react-datepicker__day--today {
    background-color: #7d8bdb;
    border-radius: 50%;
    opacity: 0.5;
    color: white;
    font-weight: 400;
  }
`;

export default SmallCalendar;
