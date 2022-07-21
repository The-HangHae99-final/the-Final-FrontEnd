import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import UserProfile from "../elements/UserProfile";
import { getItemFromLs } from "../utils/localStorage";
import { useSelector } from "react-redux";
import ScrollToBottom, {
  useScrollToBottom,
  useSticky,
} from "react-scroll-to-bottom";
import topArrow from "../public/img/top-arrow.png";
import camera from "../public/img/camera.png";

const BubbleBox = ({ roomName, messageList, setMessageList, socket }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const username = getItemFromLs("userName");
  const bottomRef = useRef(null);
  const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();
  const sendMessage = async () => {
    scrollToBottom();
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
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    // 서버에서 클라로 전송할 데이터 있을 시 그 데이터를 받아 차곡차곡 쌓는다
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  // 새로운 메시지로 자동 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <BubbleBoxStyle>
      <ScrollToBottom className="message-container">
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
        <div ref={bottomRef} />
      </ScrollToBottom>

      {/* 채팅 화면의 인풋 섹션*/}
      <Inputwrap>
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
        />
        <ButtonsWrap>
          <button className="submit-button submit-button_file">
            <img src={camera} alt="camera" className="camera" />
          </button>
          <button
            className="submit-button submit-button_text"
            onClick={sendMessage}
          >
            <img src={topArrow} alt="topArrow" className="topArrow" />
          </button>
        </ButtonsWrap>
      </Inputwrap>
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
    padding: 30px 42px 30px 55px;
  }

  .react-scroll-to-bottom--css-tmgdc-1n7m0yu {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0px;
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

const Inputwrap = styled.div`
  width: 100%;
  height: 100px;
  background-color: #f8f8f9;
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

const ButtonsWrap = styled.div`
  display: flex;
  gap: 22px;
  position: absolute;
  top: 47%;
  right: 75px;
  transform: translateY(-50%);

  .submit-button {
    all: unset;
    height: 30px;
    cursor: pointer;
    padding: 5px;
  }

  .camera {
    width: 20px;
    height: 18.64px;
  }

  .topArrow {
    width: 30px;
    height: 30px;
  }
`;

export default BubbleBox;
