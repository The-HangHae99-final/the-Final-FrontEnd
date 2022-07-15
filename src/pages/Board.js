// Board 페이지 입니다

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getItemFromLs } from "../components/localStorage";
import styled from "styled-components";

const Board = () => {
  const [data, setDatas] = useState({
    title: "",
    content: "",
    category: "",
    workSpaceName: "",
  });
  console.log(data);
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

  useEffect(() => {
    axios({
      method: "post",
      url: "http://13.209.3.168:3001/api/post/workSpaceName/all",
      data: { workSpaceName: `${getItemFromLs("workspace")}` },
      headers: {
        Authorization: `Bearer ${getItemFromLs("myToken")}`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BoardStyle>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="content"
          placeholder="content"
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="category"
          onChange={handleChange}
        />
        <button type="submit">전송하기</button>
      </form>
      <div></div>
    </BoardStyle>
  );
};

const BoardStyle = styled.div`
  background-color: aqua;
  width: 100%;
`;

export default Board;
