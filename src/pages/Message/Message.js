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

const Message = () => {
  const [DataForJoin, setDataForJoin] = useState({
    opponent: "",
    workspace: "",
  });
  const [messageList, setMessageList] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [roomName, setRoomName] = useState("");

  const socket = io.connect("https://0jun.shop/");
  const teamChatRoomName = getItemFromLs("workspace");

  // 개인 채팅방 입장
  const joinRoom = (opponent, userName) => {
    // 개인 채팅방 이름 = 워크스페이스 이름(작성자 이메일+워크스페이스 이름) + 채팅 할 상대의 이름
    // 같은 이름의 방에 입장시키기 위해 가나다순으로 이름 정렬해준다
    const temp = [opponent, userName];
    temp.sort();
    const roomName = temp[0] + temp[1];
    setRoomName(() => roomName);
    socket.emit("join_room", roomName);

    // 서버로부터 채팅리스트를 받는다
    socket.on("chat_list", (chat_list) => {
      setMessageList([...chat_list]);
      setShowChat(true);
    });
  };

  // 공지방 입장
  const joinTeamRoom = () => {
    socket.emit("join_room", getItemFromLs("workspace"));
    setRoomName(() => teamChatRoomName);

    // 서버로부터 채팅리스트를 받는다
    socket.on("chat_list", (chat_list) => {
      console.log(chat_list);
      setMessageList([...chat_list]);
      setShowChat(true);
    });
  };

  return (
    <ChatStyle>
      {/* 왼쪽 섹션 */}
      <LeftSection className="leftSection">
        {/* Online User */}
        <OnlineBox className="online-box">
          <BoxHeader className="box-header">
            <BoxTitle className="box-title">Online User</BoxTitle>
            <OnlineUserCount className="online-user-count">5</OnlineUserCount>
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
          <DirectChatList setDataForJoin={setDataForJoin} joinRoom={joinRoom} />
        </MyChatBox>
      </LeftSection>

      {/* 오른쪽 섹션 */}
      <RightSection className="rightSection">
        <ChatSection className="ChatSection">
          {/* 채팅 화면 상단 바 */}
          <BarTop className="BarTop">
            <UserProfile
              text="전영준"
              name="전영준"
              online={true}
              alignItems={"center"}
            />
          </BarTop>

          {/* 채팅 화면 */}
          {showChat && (
            <BubbleBox
              messageList={messageList}
              socket={socket}
              roomName={roomName}
              setMessageList={setMessageList}
            />
          )}
        </ChatSection>
      </RightSection>
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
`;

const ChattingScreen = styled.div`
h`;

export default Message;
