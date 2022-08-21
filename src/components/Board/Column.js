import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import BoardCard from "../Card/BoardCard";

import createBtn from "../../public/img/createBtn.png";

const Column = ({
  column,
  tasks,
  createBox,
  isShown,
  handleSubmit,
  handleChange,
  showCreateBox,
  titleCharacter,
  handleLabelClick,
  activeLabel,
}) => {
  return (
    <SectionWrap>
      <div className="section-top">
        <span className="section-top_title">{column.title}</span>
      </div>
      <div className="section-cards-screen">
        <div className="section-cards-wrap">
          {column.title === "TO-DO" && (
            <>
              {isShown ? (
                createBox(
                  handleSubmit,
                  handleChange,
                  titleCharacter,
                  handleLabelClick,
                  activeLabel
                )
              ) : (
                <div className="create-box">
                  <div className="createBtn-wrap">
                    <img
                      src={createBtn}
                      alt="createBtn"
                      className="createBtn"
                      onClick={showCreateBox}
                    />
                  </div>
                  <div className="createBtn-title">일정을 추가 해보세요</div>
                </div>
              )}
            </>
          )}
        </div>
        <Droppable droppableId={column.id}>
          {(droppableProvided, droppableSnapshot) => (
            <ul
              className="boards-list"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {tasks?.map((task, index) => {
                return (
                  <Draggable
                    key={task.postId}
                    draggableId={`${task.postId}`}
                    index={index}
                  >
                    {(draggableProvided, draggableSnapshot) => (
                      <li
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <div>
                          <BoardCard task={task} />
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
      {/* <div className="section-cards-screen">
      <div className="section-cards-wrap">
        {isShown ? (
          <CreateBox
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            showCreateBox={showCreateBox}
            titleCharacter={titleCharacter}
            handleLabelClick={handleLabelClick}
          />
        ) : (
          <div className="create-box">
            <div className="createBtn-wrap">
              <img
                src={createBtn}
                alt="createBtn"
                className="createBtn"
                onClick={showCreateBox}
              />
            </div>
            <div className="createBtn-title">일정을 추가 해보세요</div>
          </div>
        )}
      </div>
      <Droppable droppableId="Todo">
        {(provided) => (
          <ul
            className="boards-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todoList &&
              todoList?.map((board, index) => {
                return (
                  <Draggable
                    draggableId={index.toString()}
                    index={index}
                    key={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <BoardCard
                          board={board}
                          removeBoard={removeBoard}
                          index={index}
                          key={index}
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div> */}
    </SectionWrap>
  );
};

const SectionWrap = styled.div`
  width: 26%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  .section-top {
    height: 50px;
    background: #ffffff;
    border: 1px solid #d5d8da;
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

  .section-cards-screen {
    overflow: scroll;
    height: 100%;

    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }

  .section-cards-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .create-box {
    width: 100%;
    padding: 25px 0px 19px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    border: 1px solid #ecedf1;
    border-radius: 5px;
    gap: 3px;
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #cbcbd7;
  }

  .createBtn {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .boards-list {
    height: 500px;
  }
`;

export default Column;
