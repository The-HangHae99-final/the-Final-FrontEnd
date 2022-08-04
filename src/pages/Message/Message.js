// module, library
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import io from "socket.io-client";
import Spinner from "../../elements/Spinner";

// import files
import UserProfile from "../../elements/UserProfile";
import DirectChatList from "../../elements/DirectChatList";
import BubbleBox from "../../components/BubbleBox";
import { getItemFromLs } from "../../utils/localStorage";
import TeamChatList from "../../elements/TeamChatList";
import topArrow from "../../public/img/top-arrow.png";
import topArrowActive from "../../public/img/top-arrow-active.png";

import camera from "../../public/img/camera.png";
import FileUploadBtn from "../../components/FileUploadBtn";

const Message = () => {
  const [currentSocket, setCurrentSocket] = useState(null);

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [oppenent, setOppenent] = useState("");

  const dispatch = useDispatch();
  const workspace = useSelector((state) => state.workSpace.value);
  const teamChatRoomName = getItemFromLs("workspace");
  const username = getItemFromLs("userName");
  const [showActiveBtn, setShowActiveBtn] = useState(false);
  console.log("showActiveBtn: ", showActiveBtn);

  const leaveRoom = (oldRoom) => {
    currentSocket.emit("leave_room", oldRoom);
    currentSocket.off("chat_list");
  };

  // 개인 채팅방 입장 + 퇴장 + 채팅 목록 불러오기
  const moveRoom = (oldRoom, newRoom, name) => {
    console.log("oldRoom: ", oldRoom, newRoom, name);
    currentSocket.emit("join_room", newRoom);
    leaveRoom(oldRoom);
    setRoomName(() => newRoom);
    setOppenent(() => name);

    currentSocket.on("chat_list", (chat_list) => {
      console.log("chat_list: ", chat_list);
      setMessageList([...chat_list]);
      setShowChat(true);
    });
  };

  // 메시지 보내기
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
      console.log("messageData: ", messageData);
      // 소켓 명령어와 함께 메시지 데이터를 보낸다
      await currentSocket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    if (currentMessage.length >= 1) {
      setShowActiveBtn(true);
    } else {
      setShowActiveBtn(false);
    }
  }, [currentMessage]);

  // 훅을 이용해 소켓 관리
  useEffect(() => {
    setCurrentSocket(socketIOClient("https://teamnote.shop/chat"));
  }, []);

  return (
    <ChatStyle>
      {currentSocket ? (
        <>
          {/* 왼쪽 섹션 */}
          <LeftSection className="leftSection">
            {/* Online User */}
            <OnlineBox className="online-box">
              <BoxHeader className="box-header">
                <BoxTitle className="box-title">Online User</BoxTitle>
                <OnlineUserCount className="online-user-count">
                  5
                </OnlineUserCount>
              </BoxHeader>
              <OnlineList className="user-list">
                {/* {exceptMe() && exceptMe().map((member, idx) => {})} */}
                {/* <UserProfile online={true} marginRight="10px" />
                <UserProfile online={true} marginRight="10px" />
                <UserProfile online={true} marginRight="10px" />
                <UserProfile online={true} marginRight="10px" />
                <UserProfile online={true} marginRight="10px" /> */}
              </OnlineList>
            </OnlineBox>

            {/* Team Chat */}
            <TeamchatBox className="teamchat-box">
              <BoxHeader className="box-header">
                <BoxTitle className="box-title">Team Chat</BoxTitle>
              </BoxHeader>

              {/* 단체 메시지 유저 리스트 */}
              <TeamChatList
                moveRoom={moveRoom}
                roomName={roomName}
                newRoomName={workspace.current_workSpace}
              ></TeamChatList>
            </TeamchatBox>

            {/* My Chat */}
            <MyChatBox className="myChat-box">
              <BoxHeader className="box-header">
                <BoxTitle className="box-title">My Chat</BoxTitle>
              </BoxHeader>

              {/* 개인 메시지 유저 리스트 */}
              <DirectChatList moveRoom={moveRoom} roomName={roomName} />
            </MyChatBox>
          </LeftSection>

          {/* 오른쪽 섹션 */}
          <RightSection className="rightSection">
            <ChatSection className="ChatSection">
              {/* 채팅 화면 상단 바 */}
              <BarTop className="BarTop">
                <div className="user-state">
                  <div className="user-state_content">
                    <div className="user-name">
                      {oppenent ? oppenent : "????"}
                    </div>
                    <div className="recent-active">4분전 활동</div>
                  </div>
                </div>
              </BarTop>

              {/* 채팅 화면 */}
              {showChat && (
                <BubbleBox
                  messageList={messageList}
                  socket={currentSocket}
                  roomName={roomName}
                  setMessageList={setMessageList}
                />
              )}

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
                  {/* multer는 multipart/form-data가 아닌 폼에서는 동작하지 않음에 주의 */}
                  <button
                    className="submit-button submit-button_file"
                    // onClick={handleFileOnChange}
                  >
                    <FileUploadBtn />
                  </button>
                  <button
                    className="submit-button submit-button_text"
                    onClick={sendMessage}
                  >
                    {showActiveBtn ? (
                      <img
                        src={topArrowActive}
                        alt="topArrowActive"
                        className="topArrow"
                      />
                    ) : (
                      <img src={topArrow} alt="topArrow" className="topArrow" />
                    )}
                  </button>
                </ButtonsWrap>
              </Inputwrap>
            </ChatSection>
          </RightSection>
        </>
      ) : (
        <Spinner />
      )}
    </ChatStyle>
  );
};

const ChatStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
`;

const LeftSection = styled.div`
  width: 280px;
  height: 100%;
  padding: 30px 20px;
  background-color: #ffffff;
  border: 1px solid #ecedf1;
  border-radius: 5px;
`;

const RightSection = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 5px;
`;

const OnlineBox = styled.div``;

const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BoxTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #7d8bdb;
`;

const OnlineList = styled.div`
  display: flex;
  width: 100%;
  overflow: scroll;
`;

const OnlineUserCount = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  text-align: right;
  color: #7d8bdb;
`;

const TeamchatBox = styled.div`
  margin-top: 25px;
`;

const MyChatBox = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ChatSection = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const BarTop = styled.div`
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  padding: 16px 45px;
  z-index: 99;
  display: flex;
  align-items: center;

  .user-state {
    display: flex;
    align-items: center;
  }

  .user-name {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.02em;
    color: #353841;
  }

  .recent-active {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: #7a858e;
  }
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
  z-index: 999;

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

export default Message;
