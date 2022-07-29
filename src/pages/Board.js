// Board 페이지 입니다
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getItemFromLs } from "../utils/localStorage";
import styled from "styled-components";
import BoardCard from "../components/Card/BoardCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Icon
import createBtn from "../public/img/createBtn.png";
import textD from "../public/img/D.png";
import label from "../public/img/label.png";
import leftArrpw from "../public/img/left-arrow.png";
import rightArrow from "../public/img/right-arrow.png";
import { Human03 } from "../elements/humanIcon";
import { useOutletContext } from "react-router-dom";

function CreateBox({
  handleSubmit,
  handleChange,
  showCreateBox,
  titleCharacter,
  handleLabelClick,
}) {
  return (
    <CreateBoxStyle onSubmit={handleSubmit}>
      <div className="create-box_title">
        <input
          type="text"
          name="title"
          placeholder="해야 할 일정이 있나요?"
          onChange={handleChange}
          maxLength="20"
        />
        <span> {titleCharacter}/20</span>
      </div>
      <div className="create-box_label">
        <div className="labelIcon-wrap">
          <img src={label} alt="label" className="labelIcon" />
        </div>

        <div className="label-wrap">
          <div className="label" onClick={handleLabelClick}>
            꽤나중요
          </div>
          <div className="label" onClick={handleLabelClick}>
            안중요
          </div>
          <div className="label" onClick={handleLabelClick}>
            상당히중요
          </div>
          <div className="label" onClick={handleLabelClick}>
            살짝중요
          </div>
          <div className="label" onClick={handleLabelClick}>
            종종중요
          </div>
        </div>
        {/* <div className="arrow-btns">
          <button className="arrow-btn prev">
            <img src={leftArrpw} alt="leftArrpw" />
          </button>
          <button className="arrow-btn next">
            <img src={rightArrow} alt="rightArrow" />
          </button>
        </div> */}
      </div>
      <textarea
        type="text"
        name="desc"
        className="create-box_desc"
        placeholder="설명을 적어주세요"
        onChange={handleChange}
        rows="4"
      />
      <button type="submit" className="submitBtn">
        <span>일정 공유하기</span>
      </button>
    </CreateBoxStyle>
  );
}

const Board = () => {
  const { currentParams } = useOutletContext();

  const [data, setData] = useState({
    title: "",
    desc: "",
    label: "",
    assignees: "",
    workSpaceName: "",
    category: "todo",
  });
  const [allBoard, setAllBoard] = useState([]);
  const [todoBoardList, setTodoBoardList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const [isShown, setIsShown] = useState(false);
  const [titleCharacter, setTitleCharacter] = useState(0);
  console.log("todoBoardList: ", todoBoardList);

  // 보드 생성
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: "http://43.200.170.45/api/posts",
        data: data,
        headers: {
          Authorization: `Bearer ${getItemFromLs("myToken")}`,
        },
      });
      if (res.data.success) {
        setTodoBoardList((prevState) => [...prevState, res.data.result]);
        setIsShown(false);
      } else {
        alert("빠진게 없는지 다시 한번 확인해주세요 :)");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setData({
      ...data,
      workSpaceName: currentParams,
      assignees: getItemFromLs("userName"),
    });
  }, []);

  // 보드 삭제
  const removeBoard = (postId) => {
    if (
      window.confirm(
        "해당 게시물을 삭제하시겠습니까?\n삭제된 데이터는 복구 할 수 없습니다."
      )
    ) {
      axios
        .delete(`http://43.200.170.45/api/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        })
        .then((res) => {
          axios
            .post(
              "http://43.200.170.45/api/post/all",
              {
                workSpaceName: getItemFromLs("workspace"),
              },
              {
                headers: {
                  Authorization: `Bearer ${getItemFromLs("myToken")}`,
                },
              }
            )
            .then((res) => {
              const allBoardList = res.data.posts;
              setAllBoard(() => {
                return [...allBoardList];
              });

              // todo, in progress, done 카테고리로 나눠 state에 저장하기
              // allBoardList.map((board) => {
              //   switch (board.category) {
              //     case "todo":
              //       console.log("---todo 카테고리---");
              //       setTodoBoardList((prevState) => {
              //         return [...prevState, board];
              //       });
              //       break;
              //     case "inProgress":
              //       console.log("---inProgress 카테고리---");

              //       setInProgressList((prevState) => {
              //         return [...prevState, board];
              //       });
              //       break;
              //     case "done":
              //       console.log("---done 카테고리---");

              //       setDoneList((prevState) => {
              //         return [...prevState, board];
              //       });
              //       break;
              //     default:
              //       console.log("데이터를 불러오는데 실패했습니다.");
              //   }
              // });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLabelClick = (e) => {
    const label = e.target.innerText;
    setData({ ...data, label: label });
  };

  const showCreateBox = () => {
    setIsShown(!isShown);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(() => {
      if (e.target.name === "title") {
        setTitleCharacter(e.target.value.length);
      }
      return { ...data, [name]: value };
    });
  };

  // 전체 보드 리스트 가져오기
  useEffect(() => {
    axios
      .post(
        `http://43.200.170.45/api/posts/list`,
        {
          workSpaceName: currentParams,
        },
        {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        }
      )
      .then((res) => {
        const reverseArr = res.data.posts.reverse();
        setTodoBoardList([...reverseArr]);
      });
  }, []);

  // const allBoardList = res.data.posts;
  // console.log("allBoardList: ", allBoardList);
  // 요청 성공 시
  // setAllBoard(() => {
  //   return [...allBoardList];
  // });

  // Categorize all board data by the 3 categories
  // allBoardList.map((board) => {
  //   switch (board.category) {
  //     case "todo":
  //       console.log("---todo 카테고리---");
  //       setTodoBoardList((prevState) => {
  //         return [...prevState, board];
  //       });
  //       break;
  //     case "inProgress":
  //       console.log("---inProgress 카테고리---");

  //       setInProgressList((prevState) => {
  //         return [...inProgressList, board];
  //       });
  //       break;
  //     case "done":
  //       console.log("---done 카테고리---");
  //       setDoneList((prevState) => {
  //         return [...doneList, board];
  //       });
  //       break;
  //     default:
  //       console.log("데이터를 불러오는데 실패했습니다.");
  //   }
  // });

  const onDragEnd = (res) => {
    //드래그 하는 sourced의 index
    const sourceOrderNo = res.source.index;
    console.log("sourceOrderNo: ", sourceOrderNo);
    //드래그 해서 내려놓은 destination의 index
    const destinationOrderNo = res.destination.index;
    console.log("destinationOrderNo: ", destinationOrderNo);
  };

  return (
    <BoardStyle>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardContainer>
          <SectionWrap>
            <div className="section-top">
              <span className="section-top_title">To Do</span>
            </div>
            <div className="section-cards-screen">
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
                  <div
                    className="boards-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {todoBoardList &&
                      todoBoardList?.map((board, index) => {
                        return (
                          <Draggable
                            draggableId={index.toString()}
                            index={index}
                            key={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <BoardCard
                                  draggableId={index.toString()}
                                  board={board}
                                  removeBoard={removeBoard}
                                  index={index}
                                  key={board.postId}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </SectionWrap>
          <SectionWrap>
            <div className="section-top">
              <span className="section-top_title">In Progress</span>
            </div>
            <div className="section-cards-screen">
              <div className="section-cards-wrap">
                <Droppable droppableId="InProgress">
                  {(provided) => (
                    <div
                      className="boards-list"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {inProgressList &&
                        inProgressList.map((board, index) => {
                          return (
                            <Draggable
                              draggableId={index.toString()}
                              index={index}
                              key={board.postId}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <BoardCard
                                    draggableId={index.toString()}
                                    board={board}
                                    removeBoard={removeBoard}
                                    index={index}
                                    key={board.postId}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </SectionWrap>
          <SectionWrap>
            <div className="section-top">
              <span className="section-top_title">Done</span>
            </div>
            <div className="section-cards-wrap">
              <div className="section-cards-wrap">
                <Droppable droppableId="Done">
                  {(provided) => (
                    <div
                      className="boards-list"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {doneList &&
                        doneList.map((board, index) => {
                          return (
                            <Draggable
                              draggableId={index.toString()}
                              index={index}
                              key={board.postId}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <BoardCard
                                    draggableId={index.toString()}
                                    board={board}
                                    removeBoard={removeBoard}
                                    index={index}
                                    key={board.postId}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </SectionWrap>
          <NoteWrap>
            <div className="noteWrap-top">Note</div>
          </NoteWrap>
        </BoardContainer>
      </DragDropContext>
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
  gap: 20px;

  .boards-list {
    height: 100%;
  }

  .boards-list-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    gap: 10px;
  }
`;

const SectionWrap = styled.div`
  width: 341px;
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
  }

  .section-cards-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .create-box {
    width: 341px;
    background-color: red;
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
`;

const NoteWrap = styled.div`
  width: 15%;
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

// CreateBox style

const CreateBoxStyle = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px 25px 22px 25px;
  background: #ffffff;
  border: 1px solid #ecedf1;
  border-radius: 5px;

  .create-box_title {
    padding: 3px 0px;
    position: relative;
    margin-bottom: 17px;

    & > input {
      all: unset;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #353841;
      width: 100%;
      border-bottom: 1px solid #ecedf1;

      ::placeholder {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #cbcbd7;
      }
    }

    & > span {
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      color: #7a858e;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .create-box_label {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    & > .labelIcon-wrap {
      width: 8%;
      margin-right: 12px;
      .labelIcon {
        width: 17px;
        height: 20.58px;
      }
    }

    & > .label-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      width: 92%;
      overflow: scroll;
      overflow: auto;
      white-space: nowrap;

      ::-webkit-scrollbar {
        display: none;
      }
      ::scroll-behavior {
        scroll-behavior: smooth;
      }

      .label {
        text-align: center;
        padding: 5px 8px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #353841;
        width: 90px;
        background: rgba(247, 247, 247, 0.5);
        border: 1px solid #ecedf1;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }

      .label:hover {
        background-color: #7d8bdb;
      }
    }

    & > .arrow-btns {
      display: Flex;

      .arrow-btn {
        all: unset;
        cursor: pointer;
      }
    }
  }

  .create-box_desc {
    background: rgba(247, 247, 247, 0.5);
    border: 1px solid #ecedf1;
    border-radius: 5px;
    width: 100%;
    resize: none;
    padding: 6px 15px;
    margin-bottom: 15px;

    :focus {
      outline: none;
    }

    ::placeholder {
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      letter-spacing: -0.02em;
      color: #cbcbd7;
    }
  }

  .submitBtn {
    all: unset;
    padding: 15px 0px;
    background: #889aff;
    border-radius: 5px;
    text-align: center;

    & > span {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #ffffff;
    }
  }
`;

// const BoardStyle = styled.div`
//   width: 100%;
// `;
// const BoardStyle = styled.div`
//   width: 100%;
// `;

export default Board;
