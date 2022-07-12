import React from "react";
import styled from "styled-components";
import ModalPortal from "../elements/Portal/ModalPortal";

const CalendarModal = ({ onClose, modalTitle }) => {
  return (
    <ModalPortal>
      <CalendarModalBg>
        <CalendarModalStyle>
          <h3>{modalTitle}</h3>
          <form>
            <div className="modal-buttons">
              <button onClick={onClose}>취소하기</button>
              <button>등록하기</button>
            </div>
          </form>
        </CalendarModalStyle>
      </CalendarModalBg>
    </ModalPortal>
  );
};

const CalendarModalBg = styled.div`
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

const CalendarModalStyle = styled.div`
  width: 381px;
  height: 586px;
  background: #ffffff;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.19);
`;

export default CalendarModal;
