import React from "react";
import styled from "styled-components";
import Ellipse106 from "../../public/img/Ellipse106.png";
import "./message.module.css";
import UserProfile from "../../elements/UserProfile";

const Chat = () => {
  return (
    <ChatStyle>
      <LeftSection className="leftSection">
        {/* Online User */}

        <OnlineBox className="online-box">
          <BoxHeader className="box-header">
            <BoxTitle className="box-title">Online User</BoxTitle>
            <OnlineUserCount className="online-user-count">5</OnlineUserCount>
          </BoxHeader>
          <UserList className="user-list">
            <OnlineUser></OnlineUser>
          </UserList>
        </OnlineBox>

        {/* Team Chat */}
        <TeamchatBox className="teamchat-box">
          <BoxHeader className="box-header">
            <BoxTitle className="box-title">Team Chat</BoxTitle>
          </BoxHeader>
          <TeamChatList>
            <UserProfile text="1조 공지방" name="1조공지방" />
          </TeamChatList>
        </TeamchatBox>

        {/* My Chat */}
        <MyChatBox className="myChat-box">
          <BoxHeader className="box-header">
            <BoxTitle className="box-title">My Chat</BoxTitle>
          </BoxHeader>
          <MyChatList>
            <UserProfile text="이형섭" name="이형섭" online={true} />
            <UserProfile text="전영준" name="전영준" online={true} />
            <UserProfile text="김하연" name="김하연" online={false} />
            <UserProfile text="정연욱" name="정연욱" online={false} />
            <UserProfile text="김규림" name="김규림" online={false} />
          </MyChatList>
        </MyChatBox>
      </LeftSection>

      <RightSection className="rightSection">sd</RightSection>
    </ChatStyle>
  );
};

const ChatStyle = styled.div`
  width: 100%;
  height: 100%;
  background-color: greenyellow;
  display: flex;
  gap: 20px;
`;

const LeftSection = styled.div`
  width: 280px;
  height: 100%;
  padding: 30px 20px;
  background-color: aliceblue;
  box-sizing: border-box;
`;

const RightSection = styled.div`
  width: 100%;
  height: 100%;
  background-color: aliceblue;
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

const OnlineUserCount = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  text-align: right;
  color: #7d8bdb;
`;

const UserList = styled.div``;

const OnlineUser = styled.div``;

const TeamchatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 30px;
`;

const TeamChatList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 18px;
`;

const MyChatBox = styled.div`
  margin-top: 30px;
`;

// const MyChatBox = styled.div`
// `;

// const MyChatBox = styled.div`
// `;

export default Chat;
