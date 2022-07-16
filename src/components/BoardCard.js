import React from "react";
import styled from "styled-components";
import human from "../public/img/human1.png";

const BoardCard = () => {
  return (
    <BoardCardStyle>
      <div className="card_title">캘린더 뷰 제작</div>
      <div className="card_content">07.16까지 끝내기</div>
      <div className="card_author">
        <div className="author-info-wrap">
          <div className="author_text">일정 등록자</div>
          <div className="author_name">김하연</div>
        </div>
        <img src={human} alt="human" />
      </div>
    </BoardCardStyle>
  );
};

export default BoardCard;

const BoardCardStyle = styled.div`
  width: 100%;
  height: 201px;
  border: 1px solid #ecedf1;
  background: #ffffff;
  border-radius: 5px;
`;

// const BoardStyle = styled.div`
//   width: 100%;
// `;

// const BoardStyle = styled.div`
//   width: 100%;
// `;
// const BoardStyle = styled.div`
//   width: 100%;
// `;const BoardStyle = styled.div`
// width: 100%;
// `;

{
  /* <form onSubmit={handleSubmit}>
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
  </form> */
}
