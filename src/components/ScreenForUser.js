import React, { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import AddMemberModal from "./Modal/AddMemberModal";
import ModalPortal from "../elements/Portal/ModalPortal";
import axios from "axios";
import { getItemFromLs, setItemToLs } from "../utils/localStorage";
import { Outlet, useParams, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../redux/userReducer";
import WeekCalendar from "./Calendar/WeekCalendar";

// 이미지
import { Human03, Human04 } from "../elements/humanIcon";
import thunder from "../public/img/Main/thunder.png";
import addMemberIcon from "../public/img/addMemberIcon.png";
import submitVector from "../public/img/submitVector.png";
import human01 from "../public/img/human01.png";
import human02 from "../public/img/human02.png";
import goldCrown from "../public/img/goldCrown.png";
import commentIcon from "../public/img/commentIcon.png";
import Ellipse106 from "../public/img/Ellipse106.png";
import leftArrow from "../public/img/left-arrow.png";
import rightArrow from "../public/img/right-arrow.png";
import commentWhite from "../public/img/Main/comment-white.png";
import { getMemberList } from "../redux/workSpaceReducer";
import mainBg from "../public/img/Main/mainBg.png";
import logo_white from "../public/img/Main/logo_white.png";

const PrivateMain = () => {
  const params = useParams();
  const hasParams = params.workSpaceName;

  return (
    <PrivateMainStyle>
      <img src={logo_white} alt="logo_white" className="logo-white" />
      <h1 className="main-title">Welcome To teamnote</h1>
    </PrivateMainStyle>
  );
};

const PrivateMainStyle = styled.div`
  background: url(${mainBg});
  width: 100%;
  height: calc(100vh - 80px);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.9rem;

  .logo-white {
    width: 90px;
    height: 90px;
    margin-top: 6rem;
  }

  .main-title {
    font-weight: 500;
    font-size: 3.8rem;
    line-height: 90px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #889aff;
    width: 614px;
    white-space: nowrap;
  }
`;

const MainBg = styled.img`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export default PrivateMain;
