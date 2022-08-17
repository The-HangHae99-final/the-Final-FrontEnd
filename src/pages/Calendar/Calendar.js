// Calendar 페이지입니다

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";
import moment from "moment";
import Calendar from "react-calendar";
import "./reacr-calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPerson,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

// file
import ModalPortal from "../../elements/Portal/ModalPortal";
import CalendarModal from "../../components/Modal/CalendarModal";
import CalendarLabel from "./CalendarLabel";
import { getItemFromLs } from "../../utils/localStorage";
import axios from "axios";
import { useRecoilState } from "recoil";
import { currentWorkspaceState, myTaskList } from "../../recoil/recoil";
import { useRecoilValue } from "recoil";

const Calender = () => {
  const [modalOn, setModalOn] = useState(false);
  const [value, onChange] = useState(new Date());
  const [modalTitle, setModalTitle] = useState("");
  const currentWs = useRecoilValue(currentWorkspaceState);
  const [myList, setMyList] = useRecoilState(myTaskList);
  const [taskContents, setTaskContents] = useState({
    startDate: "",
    endDate: "",
    title: "",
    desc: "",
    color: "#7EA0E3",
    workSpaceName: "",
  });
  const [openActiveBar, setOpenActiveBar] = useState(false);

  const handleActiveBar = () => {
    setOpenActiveBar(!openActiveBar);
  };

  const handleModal = (e) => {
    setModalOn(!modalOn);
    setModalTitle(e.target.title);
    setTaskContents({ ...taskContents, workSpaceName: currentWs });
  };

  const handleTaskInfoChange = (e) => {
    const { value, name } = e.target;
    setTaskContents({ ...taskContents, [name]: value });
  };

  const handleTaskDateChage = (startDate, endDate) => {
    setTaskContents({
      ...taskContents,
      startDate: startDate,
      endDate: endDate,
    });
  };

  // 전체 개인 일정 조회 + 달력에 그리기
  // 1. startDate + (endDate에서 startDate와의 차이 일 수 ) using by add();
  // 2.

  useEffect(() => {
    axios
      .get(`https://teamnote.shop/api/tasks/all/lists`, {
        headers: {
          Authorization: `Bearer ${getItemFromLs("myToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          const rows = res.data.result.rows;
          setMyList([...rows]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // 두 날짜 사이에 포함되는 리스트 출력
  const getDateList = (startDate, endDate) => {
    const result = [];
    const curDate = new Date(startDate);

    while (curDate <= new Date(endDate)) {
      const date = curDate.toISOString().split("T")[0];
      result.push(date);
      curDate.setDate(curDate.getDate() + 1);
    }
    return result;
  };
  // 전체 팀 일정 조회
  // const fetchTeamTasks = () => {
  //   // axios({
  //   //   method: "post",
  //   //   url: "https://teamnote.shop/api/team-tasks/lists",
  //   //  {
  //   //     workSpaceName: currentParams,
  //   //   },
  //   //   headers: {
  //   //     Authorization: `Bearer ${getItemFromLs("myToken")}`,
  //   //   },
  //   // })
  //   //   .then((res) => console.log(res))
  //   //   .catch((err) => console.log(err));
  //   axios
  //     .post(
  //       "https://teamnote.shop/api/team-tasks/lists",
  //       {
  //         workSpaceName: currentParams,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${getItemFromLs("myToken")}`,
  //         },
  //       }
  //     )
  //     .then((res) => console.log(res));
  // };

  // useEffect(() => {
  //   setTaskContents({
  //     ...taskContents,
  //     workSpaceName: currentParams,
  //   });
  // }, []);

  const mark = ["2022-08-17", "2022-08-18", "2022-08-19", "2022-08-28"];

  return (
    <CalenderStyle className="calenderStyle">
      <div className="leftSection">
        {/*         
        <A 
        {...{
          text,
          title
        }} 
        text={text} title={title}
        /> */}

        <div className="myCalender-box">
          <CalendarLabel
            {...{
              title: "My calendar",
              labels: [
                {
                  text: "Contents design",
                  color: "blue",
                },
                {
                  text: "Product design",
                  color: "red",
                },
                ,
              ],
              onClickAdd: handleModal,
            }}
          />
        </div>

        {/* Team calendar */}
        <div className="teamCalender">
          <CalendarLabel
            {...{
              title: "Team calendar",
              labels: [
                {
                  text: "Meeting",
                  color: "yellow",
                },
                {
                  text: "Event",
                  color: "red",
                },
                ,
              ],
              // onClickTitle: fetchTeamTasks,
              // onClickAdd: handleModal,
            }}
          />
        </div>
      </div>

      <RightSection>
        {/* 큰 달력 */}
        <Calendar
          style={{ height: 500 }}
          value={value}
          tileContent={({ date, view }) => {
            let html = [];
            const a = myList.find((item) => {
              return item.startDate === moment(date).format("YYYY-MM-DD");
            });

            if (a !== undefined) {
              console.log("a : ", a);
              html.push(<Dot color={a.color}>{a.title}</Dot>);
              return <>{html}</>;
            }
          }}
          formatDay={(locale, date) => moment(date).format("DD")}
        />

        {/* <AddButton title="My calendar" onClick={handleModal}>
          <div className="add-button">
            <div>+</div>
          </div>
        </AddButton> */}

        <ActiveBtns openActiveBar={openActiveBar}>
          {openActiveBar && (
            <div className={"add-bar" + (!openActiveBar ? "hide" : "")}>
              <motion.div
                className="addBtnWrap"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <FontAwesomeIcon icon={faPerson} className="personal" />
              </motion.div>
              <motion.div
                className="addBtnWrap"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <FontAwesomeIcon icon={faPeopleGroup} className="group" />
              </motion.div>
            </div>
          )}
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="circlePlus"
            onClick={handleActiveBar}
          />
        </ActiveBtns>
      </RightSection>
      <ModalPortal>
        {modalOn && (
          <CalendarModal
            onClose={handleModal}
            modalTitle={modalTitle}
            taskContents={taskContents}
            setTaskContents={setTaskContents}
            handleTaskInfoChange={handleTaskInfoChange}
            handleTaskDateChage={handleTaskDateChage}
          />
        )}
      </ModalPortal>
    </CalenderStyle>
  );
};

const Dot = styled.div`
  height: 18px;
  width: 100%;
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 0.8rem;
`;

const CalenderStyle = styled.div`
  width: 100%;
  height: 88%;
  display: flex;
  gap: 20px;
  box-sizing: border-box;

  .leftSection {
    width: 280px;
    height: 100%;
    padding: 30px 20px;
    background-color: #ffffff;
    box-sizing: border-box;

    .myCalender-box {
      margin-top: 10px;
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
  }
`;

const ActiveBtns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 4rem;
  bottom: 4rem;
  gap: 20px;

  .circlePlus {
    all: unset;
    display: flex;
    align-items: center;
    color: #7a858e;
    opacity: 0.7;
    width: 60px;
    height: 60px;
    cursor: pointer;
    transform: ${(props) => props.openActiveBar && "rotate(45deg)"};
  }

  .addBtnWrap {
    display: flex;
    justify-content: center;
    padding: 10px;
    background-color: #e0e2e1;
    border-radius: 50%;
    cursor: pointer;
    width: 60px;
    height: 60px;
  }
  .add-bar {
    display: flex;
    flex-direction: column;
    gap: 30px;
    animation: duration 0.2s linear;

    .personal,
    .group {
      font-size: 2.5rem;
    }

    .add-bar.hide {
      display: none;
    }

    @keyframes duration {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;
// const AddButton = styled.button`
//   all: unset;
//   display: flex;
//   align-items: center;
//   color: #7a858e;
//   opacity: 0.7;
//   width: 50px;
//   height: 50px;
//   cursor: pointer;
//   background-color: red;

//   .add-button {
//     all: unset;
//     border-radius: 50%;
//     margin-right: 10px;
//     opacity: 0.7;
//     border: 1px solid #7a858e;
//     width: 24px;
//     height: 24px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     div {
//       height: 100%;
//       display: Flex;
//       align-items: center;
//       transform: translateY(3%);
//     }
//   }
// `;

const RightSection = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

export default Calender;
