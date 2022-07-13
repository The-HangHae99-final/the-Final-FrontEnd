import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserProfile from "../elements/UserProfile";

const BubbleBox = ({ showChat }) => {
  return (
    <>
      {showChat ? (
        <>
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

          <RightBubble className="RightBubble">
            <BubbleContent className="BubbleContent">
              <SendTimeforRightBubble className="SendTime">
                오후 1:30
              </SendTimeforRightBubble>
              <YourMessage bg={"#EEF1FF"} className="YourMessage">
                아 배고파 아 배고파아 배고파아 배고파아 배고파아 배고파아
                배고파아 배고파아 배고파아 배고파 아 배고파 아 배고파아 배고파아
                배고 파아 배고파아
              </YourMessage>
            </BubbleContent>
          </RightBubble>
        </>
      ) : (
        <div>채팅을 시작해보세요!</div>
      )}
    </>
  );
};

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

export default BubbleBox;
