import React from "react";
import human01 from "../public/img/human1.png";
import Ellipse106 from "../public/img/Ellipse106.png";
import Ellipse103 from "../public/img/Ellipse103.png";
import styled from "styled-components";
import { useSelector } from "react-redux";

const UserProfile = ({
  text,
  online,
  marginRight,
  toTop,
  alignItems,
  moveRoom,
  newRoomName,
  roomName,
  size,
  joinTeamRoom,
}) => {
  return (
    <OnlineUser
      toTop={toTop}
      alignItems={alignItems}
      onClick={() => {
        return moveRoom(roomName, newRoomName, text);
        // joinTeamRoom
        //   ? joinTeamRoom()
        //   : setDataForJoin(() => {
        //       moveRoom(oppenent, userName);
        //       return { opponent: oppenent, userName: userName };
        //     });
      }}
    >
      <OnlineUserProfile
        alt="human"
        className="online-user-profile"
        src={human01}
        marginRight={marginRight}
        size={size}
      ></OnlineUserProfile>
      {text && <UserName>{text}</UserName>}
      {online && <StatusOnline size={size} online={online} />}
    </OnlineUser>
  );
};

const OnlineUser = styled.div`
  display: flex;
  align-items: ${({ alignItems }) =>
    alignItems === "center" ? alignItems : "flex-start"};
  position: relative;
  top: ${({ toTop }) => (toTop ? toTop : null)};
  padding: 4px;
  cursor: pointer;
`;

const OnlineUserProfile = styled.img`
  width: ${({ size }) => (size ? size : "55px")};
  height: ${({ size }) => (size ? size : "55px")};
  border-radius: 50%;
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : "15px")};
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #353841;
`;

const StatusOnline = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ online }) =>
    online ? `url(${Ellipse106})` : `url(${Ellipse103})`};
  position: absolute;
  left: ${({ size }) => (size ? "38px" : "40px")};
  top: ${({ size }) => (size ? "38px" : "40px")};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.18);
`;

const UserName = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #353841;
`;

// const StatusOffline = styled.div`
// `;
// const StatusOffline = styled.div`
// `;

export default UserProfile;
