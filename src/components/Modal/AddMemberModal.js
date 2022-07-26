import React from "react";
import styled from "styled-components";
import ModalPortal from "../../elements/Portal/ModalPortal";

const AddMemberModal = ({ newMember, setNewMember, onClose, addNewMember }) => {
  return (
    <ModalPortal>
      <WorkspaceModalBg>
        <AddMemberModalStyle>
          <div className="workspace-create-box-wrap">
            <div className="workspace-name">Add New Member</div>
            <div className="input-wrap">
              <input
                type="text"
                onChange={(e) =>
                  setNewMember(() => ({
                    ...newMember,
                    userEmail: e.target.value,
                  }))
                }
                value={newMember.userEmail || ""}
                className="create-box_input"
                placeholder="새로운 팀원을 추가해주세요."
                name="workSpaceName"
              />
            </div>
            <div className="active-buttons">
              <button className="active-button cancel" onClick={onClose}>
                취소하기
              </button>
              <button className="active-button submit" onClick={addNewMember}>
                추가하기
              </button>
            </div>
          </div>
        </AddMemberModalStyle>
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
  backdrop-filter: blur(10px);
  z-index: 999;
`;

const AddMemberModalStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  .workspace-create-box-wrap {
    width: 541px;
    height: 228px;
    display: flex;
    background: #ffffff;
    flex-direction: column;
    justify-content: center;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 30px 100px;
  }

  .workspace-name {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.02em;
    color: #7d8bdb;
    margin-bottom: 20px;
  }

  .input-wrap {
    display: flex;
    margin-bottom: 25px;
    align-items: center;
    width: 100%;
    position: relative;
    margin-bottom: 30px;
  }

  .create-box_input {
    border: none;
    padding: 15px;
    width: 100%;
    border-radius: 5px;
    outline: none;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #353841;

    ::placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.02em;
      color: #cbcbd7;
    }
  }

  .active-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;

    & > .active-button {
      all: unset;
      padding: 10px 0px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #ffffff;
      border-radius: 5px;
      cursor: pointer;
    }

    & > .cancel {
      background: #c1c9cf;
      width: 42%;
    }
    & > .submit {
      background: #7d8bdb;
      width: 58%;
    }
  }
`;

const WorkspaceModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 541px;
  height: 228px;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 30px 100px;
`;

export default AddMemberModal;
