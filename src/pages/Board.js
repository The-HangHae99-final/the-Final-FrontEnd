// Board 페이지 입니다
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getItemFromLs } from "../components/localStorage";
import styled from "styled-components";
import BoardCard from "../components/Card/BoardCard";

// Icon
import createBtn from "../public/img/createBtn.png";
import { Human03 } from "../elements/humanIcon";
import { useLocation } from "react-router-dom";

function CreateBox({ handleSubmit, handleChange, showCreateBox }) {
  return (
    <CreateBoxStyle onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="해야 할 일정이 있나요?"
        onChange={handleChange}
      />
      <input
        type="text"
        name="desc"
        placeholder="설명을 적어주세요"
        onChange={handleChange}
      />
      <input
        type="text"
        name="label"
        placeholder="label"
        onChange={handleChange}
      />
      <button onClick={showCreateBox}>취소하기</button>
      <button type="submit">일정 공유하기</button>
      <Human03 size="50px" />
    </CreateBoxStyle>
  );
}

const Board = () => {
  const [data, setDatas] = useState({
    title: "",
    desc: "",
    label: "",
    assignees: "",
    workSpaceName: "",
  });
  console.log("data: ", data);
  const [isShown, setIsShown] = useState(false);
  const [allBoard, setAllBoard] = useState([]);

  // Delete board
  const removeBoard = (postId) => {
    if (
      window.confirm(
        "해당 게시물을 삭제하시겠습니까?\n삭제된 데이터는 복구 할 수 없습니다."
      )
    ) {
      axios
        .delete(`http://54.180.29.68/api/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            axios
              .post(
                "http://54.180.29.68/api/post/all",
                {
                  workSpaceName: getItemFromLs("workspace"),
                },
                {
                  headers: {
                    Authorization: `Bearer ${getItemFromLs("myToken")}`,
                  },
                }
              )
              .then((res) => setAllBoard(res.data.posts))
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas({ ...data, [name]: value });
  };

  const showCreateBox = () => {
    setIsShown(!isShown);
  };

  // board 생성
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://54.180.29.68/api/post",
      data: data,
      headers: {
        Authorization: `Bearer ${getItemFromLs("myToken")}`,
      },
    })
      .then((res) => {
        axios
          .post(
            "http://54.180.29.68/api/post/all",
            {
              workSpaceName: getItemFromLs("workspace"),
            },
            {
              headers: {
                Authorization: `Bearer ${getItemFromLs("myToken")}`,
              },
            }
          )
          .then((res) => setAllBoard(res.data.posts))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  console.log("allBoard: ", allBoard);
  useEffect(() => {
    setDatas({
      ...data,
      workSpaceName: getItemFromLs("workspace"),
      assignees: getItemFromLs("userName"),
    });
  }, []);

  useEffect(() => {
    axios
      .post(
        "http://54.180.29.68/api/post/all",
        {
          workSpaceName: getItemFromLs("workspace"),
        },
        {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        }
      )
      .then((res) => setAllBoard(res.data.posts))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BoardStyle>
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
            {allBoard &&
              allBoard.map((board, idx) => {
                return (
                  <BoardCard
                    key={idx}
                    board={board}
                    removeBoard={removeBoard}
                  />
                );
              })}
          </div>
        </SectionWrap>
        <SectionWrap>
          <div className="section-top">
            <span className="section-top_title">In Progress</span>
          </div>
          <div className="section-cards-wrap"></div>
        </SectionWrap>
        <SectionWrap>
          <div className="section-top">
            <span className="section-top_title">Done</span>
          </div>
          <div className="section-cards-wrap"></div>
        </SectionWrap>
        <NoteWrap>
          <div className="noteWrap-top">Note</div>
        </NoteWrap>
      </BoardContainer>
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
  flex-wrap: nowrap;
  gap: 20px;
`;

const SectionWrap = styled.div`
  min-width: 341px;
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
  }

  .section-cards-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .create-box {
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
  width: 100%;
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
  width: 100%;
  background-color: red;
  display: flex;
  flex-direction: column;
`;

// const BoardStyle = styled.div`
//   width: 100%;
// `;
// const BoardStyle = styled.div`
//   width: 100%;
// `;

export default Board;
