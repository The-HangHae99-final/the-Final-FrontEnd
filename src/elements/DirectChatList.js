import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import styled from "styled-components";
import { getItemFromLs } from "../utils/localStorage";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRecoilState } from "recoil";
import { memberList, userState } from "../recoil/recoil";

const DirectChatList = ({ moveRoom, roomName }) => {
  const userName = getItemFromLs("userName");
  const workspace = useSelector((state) => state.workSpace.value);
  const [member, setMeber] = useRecoilState(memberList);

  const exceptMe = () => {
    const notMeInThisArr = member.filter(
      (item) => item.memberName !== userName
    );
    return notMeInThisArr;
  };

  return (
    <>
      <MyChatList>
        {exceptMe() &&
          exceptMe().map((member, idx) => {
            const temp = [member.memberName, userName];
            temp.sort();
            const newRoomName = temp[0] + temp[1];
            return (
              <div>
                <UserProfile
                  size="40px"
                  key={idx}
                  text={member.memberName}
                  roomName={roomName}
                  newRoomName={newRoomName}
                  alignItems={"center"}
                  moveRoom={moveRoom}
                  profileImage={member.profile_image}
                />
                <div className="message-count">
                  <div className="count-alarm"></div>
                  <div className="count-number"></div>
                </div>
              </div>
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
