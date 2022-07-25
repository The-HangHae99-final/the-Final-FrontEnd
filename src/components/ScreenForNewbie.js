import React, { useState } from "react";
import styled from "styled-components";
import topArrow from "../public/img/top-arrow.png";
import topArrowActive from "../public/img/top-arrow-active.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getWorkSpaceList } from "../redux/userReducer";
import { getItemFromLs } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import ModalPortal from "../elements/Portal/ModalPortal";

const ScreenForNewbie = () => {
  const [titleCharacter, setTitleCharacter] = useState(0);
  const [workSpaceName, setWorkSpaceName] = useState("");

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setWorkSpaceName(() => {
      if (inputValue.length <= 11) {
        setTitleCharacter(inputValue.length);
      }
      return `${inputValue}`;
    });
  };

  const makeNewWorkSpace = () => {
    if (workSpaceName !== "") {
      axios
        .post(
          "https://0jun.shop/api/work-spaces",
          { name: workSpaceName },
          {
            headers: {
              Authorization: `Bearer ${getItemFromLs("myToken")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          // const newWorkSpaceFullName = res.data.createdWorkSpace.name;
          window.location.reload();
          // const newWorkSpace = res.data.result.name.split("+")[1];
          setWorkSpaceName("");
          setTitleCharacter(0);
          // alert("새로운 워크스페이스가 만들어졌어요");
        });
    }
  };

  return (
    <WorkspaceModalBg>
      <WorkspaceModalStyle>
        <div className="create-box-container">
          <div className="create-box-wrap">
            <div className="create-box_title">New Work Space</div>
            <div className="create-box_subtitle">
              워크스페이스의 이름을 지어주세요.
            </div>
            <div className="input-wrap">
              <input
                type="text"
                className="create-box_input"
                placeholder="10글자 내외로 작성해주세요."
                name="workSpaceName"
                value={workSpaceName || ""}
                onChange={(e) => handleChange(e)}
                maxLength="10"
                onKeyPress={(e) => {
                  e.key === "Enter" && makeNewWorkSpace();
                }}
              />
              <div className="input-actions">
                <div className="input-max-length">{titleCharacter}/10</div>
                {titleCharacter >= 1 ? (
                  <div className="submit-button">
                    <img
                      src={topArrowActive}
                      alt="topArrowActive"
                      className="topArrow"
                    />
                  </div>
                ) : (
                  <img src={topArrow} alt="topArrow" className="topArrow" />
                )}
              </div>
            </div>
            <div className="add-later">나중에 할래요</div>
          </div>
        </div>
      </WorkspaceModalStyle>
    </WorkspaceModalBg>
  );
};

const WorkspaceModalBg = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  font-size: 50px;
  backdrop-filter: blur(10px);
  z-index: 999;
`;

const WorkspaceModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 541px;
  height: 228px;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 30px 100px;

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

/* const ScreenForNewbieStyle = styled.div`
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
  }
`; */

export default ScreenForNewbie;
