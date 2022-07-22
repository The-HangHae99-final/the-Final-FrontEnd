import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import styled from "styled-components";
import { getItemFromLs } from "../utils/localStorage";
import axios from "axios";

const DirectChatList = ({ moveRoom, roomName }) => {
  const [membeList, setMemberList] = useState([]);
  const workSpaceName = getItemFromLs("workspace");
  const userName = getItemFromLs("userName");

  // 본인을 제외한 유저목록 반환
  useEffect(() => {
    axios({
      url: `http://43.200.170.45/api/member/${workSpaceName}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${getItemFromLs("myToken")}`,
      },
    })
      .then((res) => {
        const exceptMe = res.data.result.filter(
          (item) => item.memberName !== userName
        );
        setMemberList(() => {
          return [...exceptMe];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <MyChatList>
        {membeList &&
          membeList.map((member, idx) => {
            const temp = [member.memberName, userName];
            temp.sort();
            const newRoomName = temp[0] + temp[1];
            return (
              <UserProfile
                key={idx}
                text={member.memberName}
                roomName={roomName}
                newRoomName={newRoomName}
                online={true}
                alignItems={"center"}
                moveRoom={moveRoom}
              />
            );
          })}
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
