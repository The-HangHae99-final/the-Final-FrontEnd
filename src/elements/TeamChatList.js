import React from "react";
import UserProfile from "./UserProfile";
import styled from "styled-components";

const TeamChatList = ({ joinTeamRoom, setDataForJoin }) => {
  return (
    <>
      <TeamChatListStyle>
        <UserProfile
          text="1조 공지방"
          name="1조공지방"
          alignItems={"center"}
          joinTeamRoom={joinTeamRoom}
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
