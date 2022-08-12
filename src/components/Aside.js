import React from "react";
import { useSelector } from "react-redux";
import UserAvatar from "../elements/UserAvatar";
import styled from "styled-components";

const Aside = () => {
  const user = useSelector((state) => state.user.value);
  const workspaceList = user.workSpaceList;

  return (
    <LeftSide>
      <div className="workspaces-container">
        {/* <Divider /> */}

        <div className="workspaces-container_top">
          <h2 className="active-workspace">
            최근 활동한 팀플방
            <div className="create-workspace">
              {/* <BookmarkAddIcon /> */}
              New
            </div>
          </h2>
          <input
            type="text"
            placeholder="이름으로 검색하세요"
            className="find-workspaceName-input"
          />
        </div>
        <ul className="workspaces-list">
          {workspaceList?.map((workspace) => {
            return (
              <li className="workspace-source">
                <UserAvatar width="20px" height="20px" />
                {workspace}
              </li>
            );
          })}
        </ul>
      </div>
      {/* <div className="buttons">
      <div className="buttonWrap">
        <div
          onClick={() => {
            navigate(`/main/${currentParams}/board`);
          }}
          className="page-navigate-button"
        >
          <img
            src={boardIcon}
            alt="boardcon"
            className="side-btn boardcon"
          />
        </div>
      </div>
      <div className="buttonWrap">
        <div
          className="page-navigate-button"
          onClick={() => navigate(`/main/${currentParams}/calendar`)}
        >
          <img
            src={calendarIcon}
            alt="calendarIcon"
            className="calendarIcon side-btn"
          />
        </div>
      </div>
      <div className="buttonWrap">
        <div
          className="page-navigate-button"
          onClick={() => navigate(`/main/${currentParams}/message`)}
        >
          <img
            src={chatIcon}
            alt="chatIcon"
            className="chatIcon side-btn"
          />
        </div>
      </div>
    </div> */}
    </LeftSide>
  );
};

const LeftSide = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-width: 300px;
  padding: 24px;
  background: #e0e2e1;

  .workspaces-container {
    width: 100%;
  }

  .workspaces-container_top {
    .active-workspace {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      font-weight: 600;

      .create-workspace {
        display: Flex;
        align-items: center;
        padding: 4px 12px;
        font-size: 12px;
        line-height: 20px;
        background-color: #238636;
        color: var(--white);
        box-shadow: 0 0 transparent, 0 0 transparent;
        border-radius: 5px;
        font-size: 12px;
        cursor: pointer;

        :hover {
          background-color: #2ea043;
        }
      }
    }
  }

  .find-workspaceName-input {
    all: unset;
    width: 100%;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    box-shadow: 0 0 transparent;
    margin-bottom: 30px;
    border: 1px px solid #30363d;
    border-radius: 6px;
    border: 1px solid #30363d;
    border-radius: 6px;
    box-sizing: border-box;
  }

  .workspaces-list {
    list-style: none;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    gap: 14px;

    .workspace-source {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: #8698fc;
      padding: 12px 16px;
      cursor: pointer;
      border-radius: 5px;

      :hover {
        background-color: #8698fccc;
      }
    }
  }
`;

export default Aside;
