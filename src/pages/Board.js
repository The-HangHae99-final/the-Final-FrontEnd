import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getItemFromLs } from "../components/localStorage";

const Board = () => {
  const [data, setDatas] = useState({
    title: "",
    content: "",
    category: "",
    user_id: "",
  });

  const user = useSelector((state) => state.user.value);
  console.log("data: ", data);
  console.log("user: ", user.user_id);
  const userId = user.user_id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://52.78.168.151:3001/api/board/post", data, {
        headers: {
          Authorization: `Bearer ${getItemFromLs("myToken")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setDatas({ ...data, user_id: userId });
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default Board;
