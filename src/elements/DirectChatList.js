import React from "react";
import UserProfile from "./UserProfile";
import styled from "styled-components";

const DirectChatList = ({ joinRoom, setDataForJoin }) => {
  return (
    <>
      <MyChatList>
        <UserProfile
          text="이형섭"
          name="이형섭"
          workspace="1조팀노트"
          online={true}
          alignItems={"center"}
          setDataForJoin={setDataForJoin}
          joinRoom={joinRoom}
        />
        <UserProfile
          text="전영준"
          name="전영준"
          workspace="1조팀노트"
          online={true}
          alignItems={"center"}
          setDataForJoin={setDataForJoin}
          joinRoom={joinRoom}
        />
        <UserProfile
          text="김하연"
          name="김하연"
          workspace="1조"
          online={false}
          alignItems={"center"}
          setDataForJoin={setDataForJoin}
        />
        <UserProfile
          text="정연욱"
          name="정연욱"
          workspace="1조"
          online={false}
          alignItems={"center"}
          setDataForJoin={setDataForJoin}
        />
        <UserProfile
          text="김규림"
          name="김규림"
          workspace="1조"
          online={false}
          alignItems={"center"}
          setDataForJoin={setDataForJoin}
        />
      </MyChatList>
    </>
  );
};

const MyChatList = styled.div`
  display: flex;
  height: 305px;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
  overflow: scroll;
`;
export default DirectChatList;
