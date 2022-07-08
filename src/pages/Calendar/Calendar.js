// import { Calendar, DateRangePicker, DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import axios from "axios";
import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";

const Calender = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="calenderStyle">
        <div className="leftSection">
          <DatePicker selected={startDate} inline />

          <div className="myCalender-box">
            <div className="teamchat-box">
              <div className="box-header">
                <div className="box-title">My calendar</div>
                <button></button>
              </div>
              <ul className="calender-list">
                <li className="calender-item">
                  <div className="diffcolor yellow"></div>
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

          <div className="teamCalender">
            <div className="teamchat-box">
              <div className="box-header">
                <div className="box-title">Team calendar</div>
              </div>
              <div className="calender-list"></div>
            </div>
          </div>
        </div>

        <div className="rightSection"></div>
      </div>
    </>
  );
};

export default Calender;

// const [selectionRange, setSelectionRange] = useState([
//   {
//     startDate: new Date(),
//     endDate: new Date(),
//     key: "selection",
//   },
// ]);
// const [data, setData] = useState({
//   start_date: "",
//   end_date: "",
//   title: "",
//   desc: "",
// });
// const { title, desc } = data;

// const handleSelect = (ranges) => {
//   const end_date = ranges["selection"].endDate;
//   const start_date = ranges["selection"].startDate;

//   // UTC timezone 기준 -> 한국 날짜 기준
//   function toKrTime(date) {
//     return new Date(
//       date.getTime() - date.getTimezoneOffset() * 60000
//     ).toISOString();
//   }

//   const end_date_kr = toKrTime(end_date).split("T")[0];
//   const start_date_kr = toKrTime(start_date).split("T")[0];

//   setSelectionRange([
//     {
//       startDate: ranges["selection"].startDate,
//       endDate: ranges["selection"].endDate,
//       key: ranges["selection"].key,
//     },
//   ]);
//   setData({ ...data, start_date: start_date_kr, end_date: end_date_kr });
// };

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setData({ ...data, [name]: value });
// };

// const handleSubmit = (e) => {
//   e.preventDefault();

//   console.log(`데이터를 보냅니다 ${data}`);

//   axios
//     .post("http://3.39.187.40/task", data, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("myToken")}`,
//       },
//     })
//     .then((res) => console.log(res))
//     .catch((error) => console.log(error));
// };

{
  /* <DateRange
        editableDateInputs={true}
        ranges={selectionRange}
        moveRangeOnFirstSelection={false}
        onChange={handleSelect}
      />
      <div>Start Date : {selectionRange[0].startDate.toString()}</div>
      <br />
      <div>End Date : {selectionRange[0].endDate.toString()}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          name="title"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="desc"
          value={desc}
          name="desc"
          onChange={handleChange}
        />
        <button type="submit">전송하기</button>
      </form> */
}
