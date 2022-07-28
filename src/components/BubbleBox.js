import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import UserProfile from "../elements/UserProfile";
import { getItemFromLs } from "../utils/localStorage";
import topArrow from "../public/img/top-arrow.png";
import camera from "../public/img/camera.png";

const BubbleBox = ({ roomName, messageList, setMessageList, socket }) => {
  console.log("messageList: ", messageList);
  const [currentMessage, setCurrentMessage] = useState("");
  const username = getItemFromLs("userName");
  const bottomRef = useRef(null);

  useEffect(() => {
    // 서버에서 클라로 전송할 데이터 있을 시 그 데이터를 받아 차곡차곡 쌓는다
    socket.on("receive_message", (data) => {
      console.log("data: ", data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    // 채팅 목록이 업데이트 될 때마다 스크롤을 내린다
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <BubbleBoxStyle>
      <div className="message-container">
        {messageList.length >= 1 ? (
          <>
            {messageList.map((message, idx) => {
              if (message.author === username) {
                return (
                  <div className="bubble bubble_right" key={idx}>
                    <BubbleContent className="ubbleContent">
                      <SendTimeforRightBubble className="created-time created-time-right">
                        {message.time}
                      </SendTimeforRightBubble>
                      <div
                        bg={"#EEF1FF"}
                        className="bubble_msg bubble_msg-right"
                      >
                        {message.message}
                      </div>
                    </BubbleContent>
                  </div>
                );
              } else {
                return (
                  <div className="bubble bubble_left" key={idx}>
                    <UserProfile marginRight="10px" toTop="-15px" />
                    <ContentBox className="ContentBox">
                      <YourName className="YourName">{message.author}</YourName>
                      <BubbleContent className="BubbleContent">
                        <div
                          bg={"#F8F8F9"}
                          className="bubble_msg bubble_msg-left"
                        >
                          {message.message}
                        </div>
                        <SendTimeforLeftBubble className="created-time created-time-left">
                          {message.time}
                        </SendTimeforLeftBubble>
                      </BubbleContent>
                    </ContentBox>
                  </div>
                );
              }
            })}
          </>
        ) : (
          <div>채팅을 시작해보세요!</div>
        )}
      </div>
      <div ref={bottomRef} />
    </BubbleBoxStyle>
  );
};

const BubbleBoxStyle = styled.div`
  height: 86%;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  .message-container {
    padding: 15px 48px 70px 48px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .bubble {
    width: 100%;
    display: flex;
  }

  .bubble_msg {
    max-width: 726px;
    background-color: ${(props) =>
      props.bg === "#F8F8F9" ? "#F8F8F9" : "#EEF1FF"};
    padding: 13px 20px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: #353841;
  }

  .bubble.bubble_right {
    justify-content: flex-end;
  }

  .bubble.bubble_left {
    justify-content: flex-start;
  }

  .bubble_msg {
    font-size: 16px;
    line-height: 24px;
    text-align: right;
    letter-spacing: -0.02em;
    color: #353841;
  }

  .bubble_msg-right {
    border-radius: 20px 0px 20px 20px;
    background: #eef1ff;
  }

  .bubble_msg-left {
    border-radius: 0px 20px 20px 20px;
    background: #f8f8f9;
  }

  .created-time {
    align-self: flex-end;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    text-align: right;
    letter-spacing: -0.02em;
    color: #7a858e;
  }

  .created-time-right {
    margin-right: 6px;
  }

  .created-time-left {
    margin-left: 6px;
  }
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

const SendTimeforLeftBubble = styled.div`
  align-self: flex-end;
  margin-left: 6px;
`;

const SendTimeforRightBubble = styled.div`
  align-self: flex-end;
`;

export default BubbleBox;
