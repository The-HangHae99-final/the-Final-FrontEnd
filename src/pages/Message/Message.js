// module, library
import io from "socket.io-client";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// import files
import UserProfile from "../../elements/UserProfile";
import DirectChatList from "../../elements/DirectChatList";
import BubbleBox from "../../components/BubbleBox";
import { getItemFromLs } from "../../utils/localStorage";
import TeamChatList from "../../elements/TeamChatList";

import socketIOClient from "socket.io-client";
import Spinner from "../../elements/Spinner";

const Message = () => {
  const [currentSocket, setCurrentSocket] = useState();
  console.log("currentSocket: ", currentSocket);
  const [DataForJoin, setDataForJoin] = useState({
    opponent: "",
    workspace: "",
  });
  const [messageList, setMessageList] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [oppenent, setOppenent] = useState("");

  const teamChatRoomName = getItemFromLs("workspace");

  // 퇴장 + 채팅리스트 삭제
  const leaveRoom = (oldRoom) => {
    currentSocket.emit("leave_room", oldRoom);
    currentSocket.off("chat_list");
  };

  // 개인 채팅방 입장 + 퇴장 + 채팅 목록 불러오기
  const moveRoom = (oldRoom, newRoom, name) => {
    currentSocket.emit("join_room", newRoom);
    leaveRoom(oldRoom);
    setRoomName(() => {
      return newRoom;
    });
    setOppenent(() => name);

    currentSocket.on("chat_list", (chat_list) => {
      console.log("chat_list: ", chat_list);
      setMessageList([...chat_list]);
      setShowChat(true);
    });
  };

  // 공지방 입장
  const joinTeamRoom = () => {
    currentSocket.emit("join_room", getItemFromLs("workspace"));
    setRoomName(() => teamChatRoomName);

    // 서버로부터 채팅리스트를 받는다
    currentSocket.on("chat_list", (chat_list) => {
      console.log(chat_list);
      setMessageList([...chat_list]);
      setShowChat(true);
    });
    currentSocket.emit("leave_room", roomName);
  };

  // 훅을 이용해 소켓 관리
  useEffect(() => {
    setCurrentSocket(socketIOClient("http://43.200.170.45/chat"));
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
                <UserProfile online={true} marginRight="10px" />
                <UserProfile online={true} marginRight="10px" />
                <UserProfile online={true} marginRight="10px" />
                <UserProfile online={true} marginRight="10px" />
                <UserProfile online={true} marginRight="10px" />
              </OnlineList>
            </OnlineBox>

            {/* Team Chat */}
            <TeamchatBox className="teamchat-box">
              <BoxHeader className="box-header">
                <BoxTitle className="box-title">Team Chat</BoxTitle>
              </BoxHeader>

              {/* 단체 메시지 유저 리스트 */}
              <TeamChatList
                setDataForJoin={setDataForJoin}
                joinTeamRoom={joinTeamRoom}
              ></TeamChatList>
            </TeamchatBox>

            {/* My Chat */}
            <MyChatBox className="myChat-box">
              <BoxHeader className="box-header">
                <BoxTitle className="box-title">My Chat</BoxTitle>
              </BoxHeader>

              {/* 개인 메시지 유저 리스트 */}
              <DirectChatList
                setDataForJoin={setDataForJoin}
                moveRoom={moveRoom}
                roomName={roomName}
              />
            </MyChatBox>
          </LeftSection>

          {/* 오른쪽 섹션 */}
          <RightSection className="rightSection">
            <ChatSection className="ChatSection">
              {/* 채팅 화면 상단 바 */}

              <BarTop className="BarTop">
                <div className="user-state">
                  <UserProfile
                    online={true}
                    alignItems={"center"}
                    size="50px"
                  />
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
`;

const RightSection = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
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
  height: 80px;
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

const ChattingScreen = styled.div`
h`;

export default Message;
