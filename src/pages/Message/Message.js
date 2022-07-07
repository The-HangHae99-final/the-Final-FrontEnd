import React from "react";
import styled from "styled-components";
import human01 from "../../public/img/human1.png";
import Ellipse106 from "../../public/img/Ellipse106.png";
import "./message.module.css";

const Chat = () => {
  return (
    <ChatStyle>
      <LeftSection className="leftSection">
        <OnlineBox className="online-box">
          <BoxHeader className="box-header">
            <BoxTitle className="box-title">Online User</BoxTitle>
            <OnlineUserCount className="online-user-count">5</OnlineUserCount>
          </BoxHeader>
          <UserList className="user-list">
            <OnlineUser>
              <OnlineUserProfile
                alt="human"
                className="online-user-profile"
                src={human01}
              ></OnlineUserProfile>
              <StatusOnline
                className="status status-online"
                src={Ellipse106}
              ></StatusOnline>
              <StatusOffline className="status status-offline"></StatusOffline>
            </OnlineUser>
          </UserList>
        </OnlineBox>
        <TeamchatBox className="teamchat-box">
          <BoxHeader className="box-header">
            <BoxTitle className="box-title">Team Chat</BoxTitle>
          </BoxHeader>
        </TeamchatBox>
        <MyChatBox className="myChat-box">
          <BoxHeader className="box-header">
            <BoxTitle className="box-title">My Chat</BoxTitle>
          </BoxHeader>
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

const TeamchatBox = styled.div``;

const MyChatBox = styled.div``;

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

const OnlineUserProfile = styled.img`
  width: 60px;
  height: 62px;
  border-radius: 50%;
`;

const StatusOnline = styled.div`
  background: radial-gradient(
    60% 60% at 37.5% 40%,
    #97e4c2 28.12%,
    #79d9ae 100%
  );
`;

const StatusOffline = styled.div`
  display: none;
`;

// const ChatStyle = styled.div`
// `;

// const ChatStyle = styled.div`
// `;

export default Chat;
