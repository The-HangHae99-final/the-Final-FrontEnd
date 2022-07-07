import React from "react";
import human01 from "../public/img/human1.png";
import Ellipse106 from "../public/img/Ellipse106.png";
import Ellipse103 from "../public/img/Ellipse103.png";
import styled from "styled-components";
import "../pages/Message/message.module.css";

const UserProfile = ({ text, online }) => {
  return (
    <OnlineUser>
      <OnlineUserProfile
        alt="human"
        className="online-user-profile"
        src={human01}
      ></OnlineUserProfile>
      {text && <span>{text}</span>}
      <StatusOnline online={online}></StatusOnline>
    </OnlineUser>
  );
};

const OnlineUser = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 4px;
  cursor: pointer;
`;

const OnlineUserProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
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
  left: 33px;
  top: 33px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.18);
`;

// const StatusOnline = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${({ online }) => console.log(online)};
// `;

// const StatusOffline = styled.div`
// `;

// const StatusOffline = styled.div`
// `;
// const StatusOffline = styled.div`
// `;

export default UserProfile;
