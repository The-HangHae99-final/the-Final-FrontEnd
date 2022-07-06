import { Calendar, DateRangePicker, DateRange } from "react-date-range";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const Calender = () => {
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // useEffect(() => {
  //   axios
  //     .get("http://52.78.168.151:3001/task")
  //     .then((res) => console.log(res))
  //     .catch((error) => console.log(error));
  // });

  const handleSelect = (ranges) => {
    setSelectionRange([
      {
        startDate: ranges["selection"].startDate,
        endDate: ranges["selection"].endDate,
        key: ranges["selection"].key,
      },
    ]);
  };
  console.log(selectionRange);

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        ranges={selectionRange}
        moveRangeOnFirstSelection={false}
        onChange={handleSelect}
      />
      <div>Start Date : {selectionRange[0].startDate.toString()}</div>
      <br />
      <div>End Date : {selectionRange[0].endDate.toString()}</div>
    </div>
  );
};

export default Calender;
