import React from "react";
import UserProfile from "./UserProfile";
import styled from "styled-components";

const TeamChatList = ({ moveRoom, roomName, newRoomName }) => {
  return (
    <>
      <TeamChatListStyle>
        <UserProfile
          text="TeamNote"
          name="TeamNote"
          roomName={roomName}
          newRoomName={newRoomName}
          alignItems={"center"}
          moveRoom={moveRoom}
        />
      </TeamChatListStyle>
    </>
  );
};

const TeamChatListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
`;

export default TeamChatList;
