import React from "react";
import styled from "styled-components";
import ModalPortal from "../../elements/Portal/ModalPortal";

const AddMemberModal = ({ handleChange, getNewMember, onClose }) => {
  return (
    <ModalPortal>
      <AddMemberModalStyle>
        <form onSubmit={getNewMember}>
          <h1>멤버 추가하기</h1>
          <input type="text" onChange={handleChange} />
          <button type="submit">추가하기</button>
        </form>
        <button onClick={onClose}>닫기</button>
      </AddMemberModalStyle>
    </ModalPortal>
  );
};

const AddMemberModalStyle = styled.div`
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
  z-index: 999;
`;

export default AddMemberModal;
