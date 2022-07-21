import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import UserProfile from "../elements/UserProfile";
import { getItemFromLs } from "../utils/localStorage";
import { useSelector } from "react-redux";

const BubbleBox = ({ roomName, messageList, setMessageList, socket }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const username = getItemFromLs("userName");
  const scrollRef = useRef(null);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      // 접속한 방 이름, 유저이름, 작성한 메시지, 시간을 담은 data 객체
      const messageData = {
        room: roomName,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      // 소켓 명령어와 함께 메시지 데이터를 보낸다
      socket.emit("send_message", messageData);
      setCurrentMessage("");
      setMessageList((list) => [...list, messageData]);
    }
  };

  return (
    <>
      {messageList.length >= 1 ? (
        <>
          {messageList.map((message, idx) => {
            if (message.author === username) {
              return (
                <RightBubble className="RightBubble" ref={scrollRef} key={idx}>
                  <BubbleContent className="BubbleContent">
                    <SendTimeforRightBubble className="SendTime">
                      {message.time}
                    </SendTimeforRightBubble>
                    <YourMessage bg={"#EEF1FF"} className="YourMessage">
                      {message.message}
                    </YourMessage>
                  </BubbleContent>
                </RightBubble>
              );
            } else {
              return (
                <LeftBubble className="LeftBubble" ref={scrollRef} key={idx}>
                  <UserProfile marginRight="10px" toTop="-15px" />
                  <ContentBox className="ContentBox">
                    <YourName className="YourName">{message.author}</YourName>
                    <BubbleContent className="BubbleContent">
                      <YourMessage bg={"#F8F8F9"} className="YourMessage">
                        {message.message}
                      </YourMessage>
                      <SendTimeforLeftBubble className="SendTime">
                        {message.time}
                      </SendTimeforLeftBubble>
                    </BubbleContent>
                  </ContentBox>
                </LeftBubble>
              );
            }
          })}
        </>
      ) : null}

      {/* 채팅 화면의 인풋 섹션*/}
      <Inputwrap>
        <div className="emogi-button"></div>
        <div className="file-submit-button"></div>
        <input
          className="chat-input"
          type="text"
          value={currentMessage || ""}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        ></input>
        <button className="submit-button" onClick={sendMessage}>
          보내기
        </button>
      </Inputwrap>
    </>
    // <div>채팅을 시작해보세요!</div>
  );
};

const LeftBubble = styled.div`
  display: flex;
  align-self: flex-start;
`;

const BubbleContent = styled.div`
  display: Flex;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const YourName = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #353841;
`;

const YourMessage = styled.div`
  max-width: 726px;
  background-color: ${(props) =>
    props.bg === "#F8F8F9" ? "#F8F8F9" : "#EEF1FF"};
  border-radius: 5px;
  padding: 13px 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #353841;
`;
const SendTimeforLeftBubble = styled.div`
  align-self: flex-end;
  margin-left: 6px;
`;

const SendTimeforRightBubble = styled.div`
  align-self: flex-end;
  margin-right: 6px;
`;

const RightBubble = styled.div`
  align-self: flex-end;
`;

const Inputwrap = styled.div`
  width: 100%;
  height: 100px;
  background-color: red;
  /* background-color: #f8f8f9; */
  border: 1px solid #ecedf1;
  border-radius: 0px 0px 5px 5px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 22px 50px 28px 50px;
  z-index: 1;

  .chat-input {
    padding: 13px 20px;
    background: #ffffff;
    border: 1px solid #ecedf1;
    border-radius: 5px;
    width: 100%;
    outline: none;
    border: none;
    overflow: auto;
    z-index: -1;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: #353841;
  }
`;

// const ContentBox = styled.div`
// `;

export default BubbleBox;
