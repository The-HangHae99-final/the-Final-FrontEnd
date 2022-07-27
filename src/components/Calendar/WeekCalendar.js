import React, { useEffect, useState } from "react";
import styled from "styled-components";

const WeekCalendar = () => {
  const [weekData, setweekData] = useState({
    date: "",
    week: [],
  });
  const { date, week } = weekData;

  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const M = new Date();
  const month = M.getMonth();
  const currentMonth = monthNames[month];

  const makeWeekArr = (date) => {
    let day = date.getDay();
    let week = [];
    for (let i = 0; i < 7; i++) {
      let newDate = new Date(date.valueOf() + 86400000 * (i - day));
      week.push([i, newDate]);
    }
    return week;
  };

  useEffect(() => {
    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let week = makeWeekArr(date);
    setweekData({ date, week });
  }, []);

  return (
    <WeekCalendarStyle>
      <div className="weekCalendar-container">
        <div className="calendar-header">
          <div className="header-month">{currentMonth}</div>
        </div>
        <div className="calendar-main">
          <ul className="week">
            {week.map((day, idx) => {
              const d = JSON.stringify(day[1]).split("T")[0].split("-")[2];
              return (
                <li
                  key={idx}
                  className={
                    "date-wrap" +
                    (day[0] === 0 || day[0] === 6 ? " date-weekend" : "")
                  }
                >
                  <div className="date">{d}</div>
                  <div className="date-content"></div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </WeekCalendarStyle>
  );
};

const WeekCalendarStyle = styled.div`
  height: 33%;
  padding: 20px 30px;
  box-sizing: border-box;
  background: #ffffff;

  .header-month {
    font-weight: 600;
    font-size: 22px;
    line-height: 33px;
    margin-bottom: 13px;
    color: #7d8bdb;
  }

  .weekCalendar-container {
    height: 100%;
  }

  .calendar-main {
    height: 100%;
  }

  .week {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    height: 100%;
    width: 100%;
  }

  .date-wrap {
    display: Flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  .date-weekend {
    width: 43px;
  }

  .date {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #353841;
    text-align: center;
  }

  .date-content {
    background: #ffffff;
    border: 1px solid #ecedf1;
    height: 100%;
  }
`;

export default WeekCalendar;
