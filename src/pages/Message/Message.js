// module, library
import io from "socket.io-client";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// import files
import UserProfile from "../../elements/UserProfile";
import DirectChatList from "../../elements/DirectChatList";
import BubbleBox from "../../components/BubbleBox";

const Message = () => {
  const socket = io.connect("https://0jun.shop/");

  const [DataForJoin, setDataForJoin] = useState({
    opponent: "",
    workspace: "",
  });

  const [messageList, setMessageList] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();

  // 개인 채팅방 입장
  const joinRoom = (opponent, workspace) => {
    //   // 방이름 = "(접속한 유저의 이름)" + "(상대 유저의 이름)" => 가나다순 정렬
    const temp = [opponent, workspace];
    temp.sort();
    const roomName = temp[0] + temp[1];
    setRoomName(() => roomName);

    // 상대방 이름과 워크스페이스 이름을 join_room 이벤트로 보낸다
    socket.emit("join_room", roomName);

    // 서버로부터 채팅리스트를 받는다
    socket.on("chat_list", (chat_list) => {
      setMessageList([...chat_list]);
      setShowChat(true);
    });
  };

  //버튼을 클릭했을 때 send message이벤트 발생
  const buttonHandler = () => {
    console.log("hi");
    // socket.emit("send message", { name: chat.name, message: chat.message });
  };

  // useEffect(() => {
  //   socket.on("chat_list", (chat_list) => {
  //     setMessageList((list) => [...chat_list]);
  //     setShowChat(true);
  //   });
  // }, [socket]);

  console.log("hello");
  console.log("hi");

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
          <TeamChatList>
            <UserProfile
              text="1조 공지방"
              name="1조공지방"
              alignItems={"center"}
            />
            <UserProfile
              text="프론트 알고리즘 공지방"
              name="1조공지방"
              alignItems={"center"}
            />
          </TeamChatList>
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
          <ChattingScreen className="ChattingScreen">
            {showChat && (
              <BubbleBox
                messageList={messageList}
                socket={socket}
                roomName={roomName}
                setMessageList={setMessageList}
              />
            )}
          </ChattingScreen>
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

const TeamChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
`;

const MyChatBox = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MyChatList = styled.div`
  display: flex;
  height: 305px;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
  overflow: scroll;
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
  padding: 0px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 19px;
  overflow: scroll;
  height: 80%;
`;

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

// const ContentBox = styled.div`
// `;

// const ContentBox = styled.div`
// `;

export default Message;
