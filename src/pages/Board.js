// Board 페이지 입니다

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getItemFromLs } from "../components/localStorage";
import styled from "styled-components";
import BoardCard from "../components/BoardCard";

const Board = () => {
  const [data, setDatas] = useState({
    title: "",
    content: "",
    category: "",
    workSpaceName: "",
  });

  const [workSpaceName, setWorkSpaceName] = useState({ workSpaceName: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hihi");
    axios({
      method: "post",
      url: "http://13.209.3.168:3001/api/post/workSpaceName",
      data: data,
      headers: {
        Authorization: `Bearer ${getItemFromLs("myToken")}`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setDatas({ ...data, workSpaceName: getItemFromLs("workspace") });
  }, []);

  // useEffect(() => {
  //   axios({
  //     method: "post",
  //     url: "http://13.209.3.168:3001/api/post/workSpaceName/all",
  //     data: { workSpaceName: `${getItemFromLs("workspace")}` },
  //     headers: {
  //       Authorization: `Bearer ${getItemFromLs("myToken")}`,
  //     },
  //   })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <BoardStyle>
      <BoardContainer>
        <SectionWrap>
          <div className="section-top">
            <span className="section-top_title">To Do</span>
          </div>
          <div className="section-cards-wrap">
            <BoardCard />
          </div>
        </SectionWrap>
        <SectionWrap>
          <div className="section-top">
            <span className="section-top_title">In Progress</span>
          </div>
          <div className="section-cards-wrap">
            <BoardCard />
          </div>
        </SectionWrap>
        <SectionWrap>
          <div className="section-top">
            <span className="section-top_title">Done</span>
          </div>
          <div className="section-cards-wrap">
            <BoardCard />
            <BoardCard />
            <BoardCard />
          </div>
        </SectionWrap>
        <NoteWrap>
          <div className="noteWrap-top">Note</div>
        </NoteWrap>
      </BoardContainer>
    </BoardStyle>
  );
};

const BoardStyle = styled.div`
  width: 100%;
`;

const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: Flex;
  flex-wrap: nowrap;
  gap: 20px;
`;

const SectionWrap = styled.div`
  min-width: 341px;
  height: 100%;

  .section-top {
    height: 50px;
    background: rgba(187, 196, 246, 0.2);
    border: 1px solid #7d8bdb;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .section-top_title {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    text-align: center;
    color: #7d8bdb;
  }

  .section-cards-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
const NoteWrap = styled.div`
  width: 100%;
  background-color: red;
  background: #ffffff;
  border: 1px solid #7d8bdb;
  border-radius: 5px;
  .noteWrap-top {
    border-radius: 5px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    color: #7d8bdb;
  }
`;
// const BoardStyle = styled.div`
//   width: 100%;
// `;
// const BoardStyle = styled.div`
//   width: 100%;
// `;
// const BoardStyle = styled.div`
//   width: 100%;
// `;

export default Board;
