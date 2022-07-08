import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Ellipse106 from "../../public/img/Ellipse106.png";
import UserProfile from "../../elements/UserProfile";
import style from "./message.module.css";
import io from "socket.io-client";
import DirectChatList from "../../elements/DirectChatList";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const socket = io.connect("http://3.36.74.108");

const Message = () => {
  const [DataForJoin, setDataForJoin] = useState({
    opponent: "",
    workspace: "",
  });
  const { opponent, workspace } = DataForJoin;

  // const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const messageList = useSelector((state) => state.messageList.value);
  console.log(messageList);

  // 유저 프로필을 클릭 시 방에 접속, 채팅리스트 받아온다
  const joinRoom = () => {
    if (opponent !== "" && workspace !== "") {
      socket.emit("join_room", opponent, workspace);

      // chat_list를 불러와서 redux에 저장
      socket.on("chat_list", (chat_list) => {
        console.log(chat_list);
        dispatch(chat_list);
      });
    }
  };

  //   useEffect(() => {
  //     axios.post("http://3.36.74.108", {
  //       params: {
  //         ID: 12345
  //       }
  //   }).then((res) => console.log(res)).error((error) => console.log(error))
  // }, [DataForJoin])
  return (
    <ChatStyle>
      {/* 왼쪽 섹션 */}
      <LeftSection className="leftSection">
        {/* Online User */}
        <OnlineBox className="online-box">
          <BoxHeader className="box-header">
            <BoxTitle className="box-title">Online User</BoxTitle>
            <OnlineUserCount className="online-user-count">5</OnlineUserCount>
          </BoxHeader>
          <OnlineList className="user-list">
            <UserProfile online={true} marginRight="10px" />
            <UserProfile online={true} marginRight="10px" />
            <UserProfile online={true} marginRight="10px" />
            <UserProfile online={true} marginRight="10px" />
            <UserProfile online={true} marginRight="10px" />
          </OnlineList>
        </OnlineBox>

        {/* Team Chat */}
        <TeamchatBox className="teamchat-box">
          <BoxHeader className="box-header">
            <BoxTitle className="box-title">Team Chat</BoxTitle>
          </BoxHeader>
          <TeamChatList>
            <UserProfile
              text="1조 공지방"
              name="1조공지방"
              alignItems={"center"}
            />
            <UserProfile
              text="프론트 알고리즘 공지방"
              name="1조공지방"
              alignItems={"center"}
            />
          </TeamChatList>
        </TeamchatBox>

        {/* My Chat */}
        <MyChatBox className="myChat-box">
          <BoxHeader className="box-header">
            <BoxTitle className="box-title">My Chat</BoxTitle>
          </BoxHeader>
          <DirectChatList joinRoom={joinRoom} setDataForJoin={setDataForJoin} />
        </MyChatBox>
      </LeftSection>

      {/* 오른쪽 섹션 */}
      <RightSection className="rightSection">
        <ChatSection className="ChatSection">
          {/* 바 */}
          <BarTop className="BarTop">
            <UserProfile
              text="전영준"
              name="전영준"
              online={true}
              alignItems={"center"}
            />
          </BarTop>

          {/* 채팅 스크린 */}
          <ChattingScreen className="ChattingScreen">
            {/* 상대방이 보낸 메시지 버블 */}
            <LeftBubble className="LeftBubble">
              <UserProfile marginRight="10px" toTop="-15px" />
              <ContentBox className="ContentBox">
                <YourName className="YourName">전영준</YourName>
                <BubbleContent className="BubbleContent">
                  <YourMessage bg={"#F8F8F9"} className="YourMessage">
                    아 배고파 아 배고파아 배고파아 배고파아 배고파아 배고파아
                    배고파아 배고파아 배고파아 배고파
                  </YourMessage>
                  <SendTimeforLeftBubble className="SendTime">
                    오후 1:30
                  </SendTimeforLeftBubble>
                </BubbleContent>
              </ContentBox>
            </LeftBubble>

            {/* 내가 보낸 메시지 버블*/}
            <RightBubble className="RightBubble">
              <BubbleContent className="BubbleContent">
                <SendTimeforRightBubble className="SendTime">
                  오후 1:30
                </SendTimeforRightBubble>
                <YourMessage bg={"#EEF1FF"} className="YourMessage">
                  아 배고파 아 배고파아 배고파아 배고파아 배고파아 배고파아
                  배고파아 배고파아 배고파아 배고파 아 배고파 아 배고파아
                  배고파아 배고 파아 배고파아 배고파아 배고파아 배고파아
                  배고파아 배고파 아 배고파 아 배고파아 배고파아 배고파아
                  배고파아 배고파아 배고파아 배고파아 배고파아 배고파
                </YourMessage>
              </BubbleContent>
            </RightBubble>

            <LeftBubble className="LeftBubble">
              <UserProfile marginRight="10px" toTop="-15px" />
              <ContentBox className="ContentBox">
                <YourName className="YourName">전영준</YourName>
                <BubbleContent className="BubbleContent">
                  <YourMessage bg={"#F8F8F9"} className="YourMessage">
                    닭발 부대찌개 치즈닭갈비 냉면 막국수 냉모밀
                  </YourMessage>
                  <SendTimeforLeftBubble className="SendTime">
                    오후 1:30
                  </SendTimeforLeftBubble>
                </BubbleContent>
              </ContentBox>
            </LeftBubble>

            <LeftBubble className="LeftBubble">
              <UserProfile marginRight="10px" toTop="-15px" />
              <ContentBox className="ContentBox">
                <YourName className="YourName">전영준</YourName>
                <BubbleContent className="BubbleContent">
                  <YourMessage bg={"#F8F8F9"} className="YourMessage">
                    지금은 오전 12시 17분 자고싶다 지금은 오전 12시 17분
                    자고싶다지금은 오전 12시 17분 자고싶다지금은 오전 12시 17분
                    자고싶다지금은 오전 12시 17분 자고싶다지금은 오전 12시 17분
                    자고싶다지금은 오전 12시 17분 자고싶다지금은 오전 12시 17분
                    자고싶다지금은 오전 12시 17분 자고싶다지금은 오전 12시 17분
                    자고싶다지금은 오전 12시 17분 자고싶다지금은 오전 12시 17분
                    자고싶다지금은 오전 12시 17분 자고싶다지금은 오전 12시 17분
                    자고싶다지금은 오전 12시 17분 자고싶다지금은 오전 12시 17분
                    자고싶다지금은 오전 12시 17분 자고싶다지금은 오전 12시 17분
                    자고싶다
                  </YourMessage>
                  <SendTimeforLeftBubble className="SendTime">
                    오후 1:30
                  </SendTimeforLeftBubble>
                </BubbleContent>
              </ContentBox>
            </LeftBubble>
          </ChattingScreen>

          {/* 인풋 */}
          <div className={style.inputWrap}>
            <div className={style.emojiBtn}></div>
            <div className={style.fileSubmitBtn}></div>
            <div className={style.submitBtn}></div>
            <input className={style.chatInput} type="text"></input>
          </div>
        </ChatSection>
      </RightSection>
    </ChatStyle>
  );
};

const ChatStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
`;

const LeftSection = styled.div`
  width: 280px;
  height: 100%;
  padding: 30px 20px;
  background-color: #ffffff;
`;

const RightSection = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

const OnlineBox = styled.div``;

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

const OnlineList = styled.div`
  display: flex;
  width: 100%;
  overflow: scroll;
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

const TeamchatBox = styled.div`
  margin-top: 25px;
`;

const TeamChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
`;

const MyChatBox = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MyChatList = styled.div`
  display: flex;
  height: 305px;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
  overflow: scroll;
`;

const ChatSection = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const BarTop = styled.div`
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  padding: 16px 45px;
  z-index: 99;
  display: flex;
  align-items: center;
`;

const ChattingScreen = styled.div`
  padding: 0px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 19px;
`;

const LeftBubble = styled.div`
  display: flex;
  align-self: flex-start;
`;

const BubbleContent = styled.div`
  display: Flex;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const YourName = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #353841;
`;

const YourMessage = styled.div`
  max-width: 726px;
  background-color: ${(props) =>
    props.bg === "#F8F8F9" ? "#F8F8F9" : "#EEF1FF"};
  border-radius: 5px;
  padding: 13px 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #353841;
`;
const SendTimeforLeftBubble = styled.div`
  align-self: flex-end;
  margin-left: 6px;
`;

const SendTimeforRightBubble = styled.div`
  align-self: flex-end;
  margin-right: 6px;
`;

const RightBubble = styled.div`
  align-self: flex-end;
`;

// const ContentBox = styled.div`
// `;

// const ContentBox = styled.div`
// `;

export default Message;
