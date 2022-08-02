import React from "react";
import styled from "styled-components";
import { Human04 } from "../../elements/humanIcon";
import edit from "../..//public/img/edit.png";
import remove from "../../public/img/remove.png";
import labelActive from "../../public/img/label-active.png";
import drag from "../../public/img/drag.png";

const BoardCard = ({ task }) => {
  const { title, desc, label, assignees, postId } = task;

  return (
    <BoardCardStyle>
      <div className="card_title">{task.title}</div>
      <div className="label-wrap">
        <div className="labelIcon-wrap">
          <img src={labelActive} alt="labelActive" className="labelActive" />
        </div>
        <div className="card_label">{label}</div>
      </div>

      <div className="card_desc">{desc}</div>

      <div className="divider"></div>

      <div className="author-info-wrap">
        <div className="author_content_text">
          <div className="author_text">일정 등록자</div>
          <div className="author_name">{task.assignees}</div>
        </div>
        <Human04 size="50px" />
      </div>

      <div className="card-action-buttons">
        <div className="action_edit">
          <img src={edit} alt="edit" onClick={() => {}} />
        </div>
        <div className="action_delete">
          <img src={remove} alt="remove" />
        </div>
      </div>

      <div className="dragIcon-wrap">
        <img src={drag} alt="drag" className="drag" />
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
  padding: 20px 30px 25px 20px;
  position: relative;

  .card_title {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #353841;
  }

  .label-wrap {
    display: Flex;
    align-items: center;
    margin-bottom: 10px;
    & > .labelIcon-wrap {
      width: 17px;
      height: 20.58px;
      margin-right: 12px;
      .labelActive {
        width: 17px;
        height: 20.58px;
      }
    }
    & > .card_label {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.02em;
      color: #353841;
    }
  }

  .card_desc {
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: #353841;
    padding: 5px 15px;
    background: rgba(247, 247, 247, 0.5);
    border: 1px solid #ecedf1;
    border-radius: 5px;
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: #ecedf1;
    margin-top: 8px;
    margin-bottom: 10px;
  }

  .author-info-wrap {
    display: flex;
    align-items: center;
    gap: 14px;
    position: absolute;
    right: 30px;

    & > .author_content_text {
      display: flex;
      flex-direction: column;

      .author_text {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.02em;
        color: #7a858e;
      }

      .author_name {
        font-weight: 500;
        font-size: 16px;
        line-height: 23px;
        text-align: right;
        letter-spacing: -0.02em;
        color: #353841;
      }
    }
  }

  .card-action-buttons {
    display: Flex;
    gap: 4px;
    position: absolute;
    bottom: 25px;
    left: 20px;

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

  .dragIcon-wrap {
    width: 12px;
    height: 21px;
    position: absolute;
    top: 32px;
    right: 20px;
    cursor: pointer;

    .drag {
      width: 100%;
      height: 100%;
    }
  }
`;
