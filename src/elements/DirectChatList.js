import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import styled from "styled-components";
import { getItemFromLs } from "../utils/localStorage";
import { useSelector } from "react-redux";
import axios from "axios";

const DirectChatList = ({ moveRoom, roomName }) => {
  const [membeList, setMemberList] = useState([]);
  const userName = getItemFromLs("userName");
  const user = useSelector((state) => state.user.value);
  const workspace = useSelector((state) => state.workSpace.value);

  const exceptMe = () => {
    const notMeInThisArr = workspace.member_list.filter(
      (item) => item.memberName !== userName
    );
    return notMeInThisArr;
  };
  exceptMe();
  // // 본인을 제외한 유저목록 반환
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: `http://43.200.170.45/api/members/spaceLists`,
  //     headers: {
  //       Authorization: `Bearer ${getItemFromLs("myToken")}`,
  //     },
  //   })
  //     .then((res) => {
  //       console.log("res: ", res);
  //       const exceptMe = res.data.result.filter(
  //         (item) => item.memberName !== userName
  //       );
  //       setMemberList(() => {
  //         return [...exceptMe];
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <>
      <MyChatList>
        {exceptMe() &&
          exceptMe().map((member, idx) => {
            console.log("member: ", member.memberName);
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
