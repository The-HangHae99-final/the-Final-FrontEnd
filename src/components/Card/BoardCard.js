import React from "react";
import styled from "styled-components";
import { Human04 } from "../../elements/humanIcon";
import edit from "../..//public/img/edit.png";
import remove from "../../public/img/remove.png";

const BoardCard = ({ board, removeBoard }) => {
  const { title, desc, label, assignees, postId } = board;
  return (
    <BoardCardStyle>
      <div className="card_title">{title}</div>
      <div className="card_desc">{desc}</div>
      <div className="card_author">
        <div className="card_label">{label}</div>
        <div className="card-action-buttons">
          <div className="action_edit">
            <img src={edit} alt="edit" />
          </div>
          <div className="action_delete" onClick={() => removeBoard(postId)}>
            <img src={remove} alt="remove" />
          </div>
        </div>
        <div className="author-info-wrap">
          <div className="author_text">일정 등록자</div>
          <div className="author_name">{assignees}</div>
        </div>
        <Human04 size="50px" />
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

  .card-action-buttons {
    display: Flex;
    gap: 4px;

    & > .action_edit,
    & > .action_delete {
      width: 29px;
      height: 29px;
      background: rgba(247, 247, 247, 0.5);
      border: 1px solid #ecedf1;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    & > .action_edit img,
    & > .action_delete img {
      width: 100%;
    }

    .action_edit img {
      width: 14px;
      height: 15px;
    }

    .action_delete img {
      width: 15.35px;
      height: 17.06px;
    }
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
// `;const BoardStyle = styled.div`
// width: 100%;
// `;
