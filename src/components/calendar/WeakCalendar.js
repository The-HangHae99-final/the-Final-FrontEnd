import React, { useEffect, useState } from "react";

const getAlldate = (today, lastDayInThisMonth) => {
  // **일주일 날짜 가져오기**
  // 1. 일주일 날짜를 넣을 배열을 만들기
  // 2. 오늘 날짜에서 +6일 까지 보여주기
  // 3. 마지막날에 닿으면 today를 1로 초기화 시키기
  // 4. 그게 아니면 그냥 +1일 +2일 ... +6일 한 날짜를 배열에 더하기

  // 오늘(today)이 달의 마지막날(lastDayInThisMonth)보다 커졌을 때 today를 1로 초기화
  // 예) 오늘이 28일이고 마지막 날짜는 31일인 상황 가정
  // i = 1 )  28
  // i = 2 )  29
  // i = 3 )  30
  // i = 4 )  31
  // i = 5 )  32 => 1 (1로 변환!)
  // i = 6 )  2
  // [28,29,30,31,32 => 1, 2] 이런 식!

  let dates = [];
  dates[0] = today;
  for (let i = 1; i <= 6; i++) {
    today++;

    if (today > lastDayInThisMonth) {
      today = 1;
      // +1일을 한 값이 i가 6이 될 때까지 뒤에 추가된다
      dates[i] = today;
    } else {
      dates[i] = today;
    }
  }
  //  오늘 기준 일주일의 날짜가 담긴 배열을 리턴한다
  return dates;
};

const WeakCalendar = () => {
  const [dayList, setDayList] = useState();
  console.log("dayList: ", dayList);

  const now = new Date();
  const todayWeak = now.getDay(); // 오늘 요일을 나타낸 숫자
  const today = now.getDate(); // 오늘 날짜
  const month = now.getMonth();

  const lastDayInThisMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate(); // 이번 달 마지막 날짜

  useEffect(() => {
    setDayList(getAlldate(today, lastDayInThisMonth));
  }, []);

  return <div>WeakCalendar</div>;
};

export default WeakCalendar;
