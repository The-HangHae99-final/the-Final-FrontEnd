import React, { useState } from "react";
import styled from "styled-components";
import topArrow from "../public/img/top-arrow.png";
import topArrowActive from "../public/img/top-arrow-active.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserInfo } from "../redux/userReducer";
import { getItemFromLs } from "../utils/localStorage";
import { Link, useNavigate } from "react-router-dom";
import ModalPortal from "../elements/Portal/ModalPortal";
import { APP_USER_STATE } from "../components/PublicMain";

// 이미지
import clap from "../public/img/Main/clap.png";

const ScreenForNewbie = ({ setAppState }) => {
  const [titleCharacter, setTitleCharacter] = useState(0);
  const [workSpaceName, setWorkSpaceName] = useState("");
  const [showTeamNoteBtn, setShowTeamNoteBtn] = useState(true);
  const [showCreateBox, setShowCreateBox] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 워크스페이스 생성
  const addNewWorkSpace = () => {
    setShowCreateBox(false);
    setIsLoading(true);
    if (workSpaceName !== "") {
      axios
        .post(
          "http://43.200.170.45/api/work-spaces",
          { workSpaceName: `${getItemFromLs("userEmail")}+${workSpaceName}` },
          {
            headers: {
              Authorization: `Bearer ${getItemFromLs("myToken")}`,
            },
          }
        )
        .then((res) => {
          console.log("res: ", res);
          setTimeout(() => {
            setAppState(APP_USER_STATE.USER);
            setIsLoading(false);
            dispatch(
              getUserInfo({
                ...user,
                workSpaceList: [...user.workSpaceList, res.data.name],
              })
            );
          }, 2000);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setWorkSpaceName(() => {
      if (inputValue.length <= 11) {
        setTitleCharacter(inputValue.length);
      }
      return `${inputValue}`;
    });
  };

  const createBox = () => {
    return (
      <div className="create-box-container">
        <div className="create-box-wrap">
          <h3 className="create-box_title">New Work Space</h3>
          <div className="create-box_subtitle">
            워크스페이스의 이름을 지어주세요.
          </div>
          <div className="input-wrap">
            <input
              type="text"
              className="create-box_input"
              placeholder="10글자 내외로 작성해주세요."
              onChange={(e) => handleChange(e)}
              onKeyPress={(e) => {
                e.key === "Enter" && addNewWorkSpace();
              }}
            />
            <div className="input-actions">
              <span className="input-max-length">0/10</span>
              <img
                src={topArrow}
                alt="topArrow"
                className="topArrow"
                onClick={() => {
                  addNewWorkSpace();
                }}
              />
            </div>
          </div>
          <Link className="add-later" to="/main">
            나중에 할래요
          </Link>
        </div>
      </div>
    );
  };

  const waitBox = () => {
    return (
      <div className="create-box-container">
        <div className="create-box-wrap">
          <h3 className="create-box_title">New Work Space</h3>
          <div className="create-box_subtitle">
            워크스페이스가 생성되었어요!
          </div>
          <div className="create-box_icon">
            <img src={clap} alt="clap" className="clap" />
          </div>
          <div className="add-later">바로 시작하기</div>
        </div>
      </div>
    );
  };

  const teamnoteBtn = () => {
    return (
      <TeamNoteBtn
        onClick={() => {
          setShowCreateBox(true);
          setShowTeamNoteBtn(false);
        }}
        style={{
          transition: "all .2s",
        }}
      >
        TeamNote 시작하기
      </TeamNoteBtn>
    );
  };

  return (
    <ScreenForNewbieStyle>
      {showTeamNoteBtn ? teamnoteBtn() : null}
      {showCreateBox ? createBox() : null}
      {isLoading ? waitBox() : null}
    </ScreenForNewbieStyle>
  );
};

const TeamNoteBtn = styled.button`
  all: unset;
  width: 402px;
  height: 91px;
  background: #889aff;
  border-radius: 5px;
  font-weight: 400;
  font-size: 30px;
  line-height: 43px;
  cursor: pointer;
  color: #ffffff;
`;

const ScreenForNewbieStyle = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  z-index: 999;
  backdrop-filter: blur(10px);
  .create-box-container {
    width: 434px;
    height: 227px;
    background: #ffffff;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 30px 44px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .create-box-wrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .create-box_icon {
    width: 33px;
    height: 33px;
    margin-top: 36px;
    margin-bottom: 34px;
    .clap {
      width: 100%;
      height: 100%;
    }
  }

  .create-box_title {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.02em;
    color: var(--point-main);
  }
  .create-box_subtitle {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #7a858e;
    margin-bottom: 28px;
  }
  .input-wrap {
    display: flex;
    margin-bottom: 25px;
    align-items: center;
    width: 100%;
    position: relative;
  }
  .create-box_input {
    border: none;
    padding: 15px;
    width: 100%;
    background: #f8f8f9;
    border-radius: 5px;
    outline: none;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #353841;
    ::placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.02em;
      color: #cbcbd7;
    }
  }
  .input-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    margin-right: 10px;
  }
  .input-max-length {
    width: 50px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    letter-spacing: -0.02em;
    color: #7a858e;
  }
  .topArrow {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: 10px;
  }
  .add-later {
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: -0.02em;
    text-decoration-line: underline;
    color: #cbcbd7;
    cursor: pointer;
  }
`;
export default ScreenForNewbie;
