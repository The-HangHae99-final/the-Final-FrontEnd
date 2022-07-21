import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import styled from "styled-components";
import { getItemFromLs } from "../utils/localStorage";
import axios from "axios";

const DirectChatList = ({ joinRoom, setDataForJoin }) => {
  const [membeList, setMemberList] = useState([]);
  console.log("membeList: ", membeList);

  const workSpaceName = getItemFromLs("workspace");
  const userName = getItemFromLs("userName");

  useEffect(() => {
    axios({
      url: `https://0jun.shop/api/member/${workSpaceName}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${getItemFromLs("myToken")}`,
      },
    })
      .then((res) => {
        console.log(res);
        setMemberList(() => {
          return [...res.data.result];
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
            return (
              <UserProfile
                key={idx}
                text={member.memberName}
                oppenent={member.memberName}
                workspace={userName}
                online={true}
                alignItems={"center"}
                setDataForJoin={setDataForJoin}
                joinRoom={joinRoom}
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
