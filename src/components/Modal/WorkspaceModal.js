import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../elements/Portal/ModalPortal";
import { getItemFromLs } from "../localStorage";

const WorkspaceModal = ({
  handleChange,
  onClose,
  workspaceName,
  addNewWorkSpace,
}) => {
  return (
    <ModalPortal>
      <WorkspaceModalBg>
        <WorkspaceModalStyle>
          <div className="workspace-name">Workspace 추가하기</div>
          <input
            type="text"
            placeholder="워크스페이스 이름"
            onChange={handleChange}
            value={workspaceName}
          />
          <button onClick={addNewWorkSpace}>완료</button>
          <button onClick={onClose}>닫기</button>
        </WorkspaceModalStyle>
      </WorkspaceModalBg>
    </ModalPortal>
  );
};

const WorkspaceModalBg = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  font-size: 50px;
`;

const WorkspaceModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .workspace-name {
    font-size: 50px;
  }
`;

export default WorkspaceModal;
