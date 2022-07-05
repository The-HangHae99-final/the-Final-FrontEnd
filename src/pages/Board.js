import React, { useState } from "react";
import { useSelector } from "react-redux";

const Board = () => {
  const [data, setDatas] = useState({
    title: "",
    content: "",
    category: "",
  });

  const user = useSelector((state) => state.uses.value);
  console.log("data: ", data);
  console.log("user: ", user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas({ ...data, [name]: value });
  };

  return (
    <div>
      <form>
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
