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
import { keys } from "@mui/system";
import Column from "../components/Board/Column";
import { useLocation } from "react-router";
import { useRecoilValue } from "recoil";
import { currentWorkspaceState } from "../recoil/recoil";

function createBox(
  handleSubmit,
  handleChange,
  titleCharacter,
  handleLabelClick
) {
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
            공지사항
          </div>
          <div className="label" onClick={handleLabelClick}>
            업무자료
          </div>
          <div className="label" onClick={handleLabelClick}>
            일정공유
          </div>
          <div className="label" onClick={handleLabelClick}>
            회의록
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
  const { state } = useLocation();
  const currentWorkspaceName = state?.workSpace?.split("+")[1];
  const currntWorkspaceId = state?.workspaceId;
  const currentWs = useRecoilValue(currentWorkspaceState);
  const [data, setData] = useState({
    title: "",
    desc: "",
    label: "",
    assignees: "",
    workSpaceName: "",
    category: "todo",
  });

  const [todoList, setTodoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [initState, setInitState] = useState(initialData);
  const [isShown, setIsShown] = useState(false);
  const [titleCharacter, setTitleCharacter] = useState(0);
  // 보드 생성
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: "https://teamnote.shop/api/posts",
        data: data,
        headers: {
          Authorization: `Bearer ${getItemFromLs("myToken")}`,
        },
      });
      if (res.data.success) {
        console.log("res: ", res);
        const task = res.data.result;
        let newObject = {};
        newObject[task.postId] = task;
        setInitState({
          ...initState,
          tasks: { ...initState.tasks, ...newObject },
          columns: {
            ...initState.columns,
            "column-1": {
              id: "column-1",
              title: "TO-DO",
              taskIds: [...initState.columns["column-1"].taskIds, task.postId],
            },
          },
        });
        setIsShown(false);
      } else {
        alert("빠진게 없는지 다시 한번 확인해주세요 :)");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 화면 렌더링 시 자동으로 workspace 의 이름과 할당자(본인이름)을 업데이트
  useEffect(() => {
    setData({
      ...data,
      workSpaceName: currentWs,
      assignees: getItemFromLs("userName"),
    });
  }, [state?.workSpace, currentWs]);

  // 보드 삭제
  const removeBoard = (postId) => {
    if (
      window.confirm(
        "해당 게시물을 삭제하시겠습니까?\n삭제된 데이터는 복구 할 수 없습니다."
      )
    ) {
      axios
        .delete(`https://teamnote.shop/api/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        })
        .then((res) => {
          axios
            .post(
              "https://teamnote.shop/api/post/all",
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
              // setAllBoard(() => {
              //   return [...allBoardList];
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
    try {
      async function fetchBoards() {
        const res = await axios.get(
          `https://teamnote.shop/api/posts/list/${currntWorkspaceId}+${currentWorkspaceName}`,
          {
            headers: {
              Authorization: `Bearer ${getItemFromLs("myToken")}`,
            },
          }
        );
        // 서버에서 받아온 데이터(배열)
        console.log("res: ", res);
        const boards = res.data.posts;

        const newObject = {};

        boards.forEach((task) => {
          return (newObject[task.postId] = task);
        });

        setInitState({
          ...initState,
          tasks: { ...newObject },
          columns: {
            ...initState.columns,
            "column-1": {
              id: "column-1",
              title: "TO-DO",
              taskIds: [...initState.columns["column-1"].taskIds],
            },
          },
        });
      }
      fetchBoards();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newtaskIds = Array.from(sourceCol.taskIds);
    const [removed] = newtaskIds.splice(startIndex, 1);
    newtaskIds.splice(endIndex, 0, removed);

    const newColumn = {
      ...sourceCol,
      taskIds: newtaskIds,
    };

    return newColumn;
  };

  const onDragEnd = (result) => {
    console.log("result: ", result);
    const { source, destination } = result;

    // If 유저가 정해지지 않은 영역에 드랍 할 떄
    if (!destination) return;

    // If 유저가 제자리에 드래그앤드랍을 다시 되돌릴 떄
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If 유저가 같은 column에 다른 위치에 드랍 할 떄
    const sourceCol = initState.columns[source.droppableId];
    console.log("sourceCol: ", sourceCol);

    const destinationCol = initState.columns[destination.droppableId];
    console.log("destinationCol: ", destinationCol);

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...initState,
        columns: {
          ...initState.columns,
          [newColumn.id]: newColumn,
        },
      };
      setInitState(newState);
      return;
    }

    // If 유저가 다른 column에 드랍할 떄
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...initState,
      columns: {
        ...initState.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setInitState(newState);
  };

  return (
    <BoardStyle>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardContainer>
          {initState.columnOrder.map((columnId) => {
            const column = initState.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => initState.tasks[taskId]
            );
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                state={initState}
                createBox={createBox}
                isShown={isShown}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                showCreateBox={showCreateBox}
                titleCharacter={titleCharacter}
                handleLabelClick={handleLabelClick}
              />
            );
          })}
          <NoteWrap>
            <div className="noteWrap-top">Note</div>
          </NoteWrap>
        </BoardContainer>
      </DragDropContext>
    </BoardStyle>
  );
};

const initialData = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "TO-DO",
      taskIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "IN-PROGRESS",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "COMPLETED",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"],
};

const BoardStyle = styled.div`
  width: 100%;
  height: 88%;
  margin-top: 20px;
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

const NoteWrap = styled.div`
  background: #ffffff;
  border: 1px solid #7d8bdb;
  border-radius: 5px;
  flex-grow: 1;

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
    cursor: pointer;

    & > span {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #ffffff;
    }
  }
`;

export default Board;
