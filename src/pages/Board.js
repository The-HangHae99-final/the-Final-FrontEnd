import React, { useState } from "react";

const Board = () => {
  const [data, setDatas] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDatas({ ...data, [name]: value });
  };

  console.log(data);
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
