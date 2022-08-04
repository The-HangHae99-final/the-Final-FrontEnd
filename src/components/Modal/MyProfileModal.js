import React, { useState, useRef } from "react";
import styled from "styled-components";
import ModalPortal from "../../elements/Portal/ModalPortal";
import user_avatar from "../../public/img/Main/profile_basic.png";
import mask1 from "../../public/img/avatar/Mask group-1.png";
import mask2 from "../../public/img/avatar/Mask group-2.png";
import mask3 from "../../public/img/avatar/Mask group-3.png";
import mask4 from "../../public/img/avatar/Mask group-4.png";
import mask5 from "../../public/img/avatar/Mask group-5.png";
import mask6 from "../../public/img/avatar/Mask group-6.png";
import mask7 from "../../public/img/avatar/Mask group-7.png";
import mask8 from "../../public/img/avatar/Mask group-8.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getItemFromLs, setItemToLs } from "../../utils/localStorage";
import { changeAvatar } from "../../redux/userReducer";

const masks = [mask1, mask2, mask3, mask4, mask5, mask6, mask7, mask8];

const MyProfileModal = ({
  onClose,
  openMyProfileModal,
  setOpenMyProfileModal,
}) => {
  // 이미지 요청 => 유저의 이미지 저장
  const [image, setImage] = useState(`${user_avatar}`);
  const [avatarIndex, setAvatarIndex] = useState(null);
  const fileInput = useRef(null);
  const user = useSelector((state) => state.user.value);
  console.log("user: ", user);
  const dispatch = useDispatch();

  const changeProfileImage = async () => {
    try {
      const response = await axios.patch(
        `https://teamnote.shop/api/users/mypage/profile`,
        { image_number: avatarIndex },
        {
          headers: {
            Authorization: `Bearer ${getItemFromLs("myToken")}`,
          },
        }
      );
      console.log("response: ", response);
      const newImg_url = response.data.findUser.profile_image;
      dispatch(changeAvatar({ ...user, profile_image_url: newImg_url }));
      setItemToLs("profile_image", newImg_url);
      setOpenMyProfileModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalPortal>
      <WorkspaceModalBg>
        <MyProfileModalStyle>
          <div className="myprofile-wrap">
            <div className="myprofile-title">Profile</div>
            <div className="user-info">
              <div className="user_avatar">
                <img src={image} alt="user_avatar" className="user_avatar" />
                {/* <input
                  type="file"
                  accept="image/jpg,impge/png,image/jpeg"
                  name="profile_img"
                  style={{ display: "none" }}
                  onChange={changeProfileImage}
                  ref={fileInput}
                /> */}
              </div>
              <div className="user_name">이형섭</div>
            </div>
            <ul className="mask-list">
              {masks.map((mask, idx) => {
                const index = idx + 1;
                return (
                  <img
                    src={mask}
                    alt="mask"
                    className="mask"
                    onClick={() => {
                      setImage(mask);
                      setAvatarIndex(String(index));
                    }}
                    key={idx}
                  />
                );
              })}
            </ul>
            <div className="active-buttons">
              <button
                className="active-button cancel"
                onClick={() => setOpenMyProfileModal(false)}
              >
                취소하기
              </button>
              <button
                className="active-button submit"
                onClick={changeProfileImage}
              >
                수정하기
              </button>
            </div>
          </div>
        </MyProfileModalStyle>
      </WorkspaceModalBg>
    </ModalPortal>
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
  backdrop-filter: blur(5px);
  z-index: 999;
`;

const MyProfileModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 454px;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 29px 32px 38px 32px;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #7d8bdb;

  .myprofile-title {
    margin-bottom: 18px;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .myprofile-wrap {
    display: flex;
    flex-direction: column;
  }

  .user_avatar {
    width: 80px;
    height: 80px;
    margin-bottom: 6px;
    cursor: pointer;
  }

  .user_name {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #353841;
  }

  .active-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;

    & > .active-button {
      all: unset;
      padding: 10px 0px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #ffffff;
      border-radius: 5px;
      cursor: pointer;
    }

    & > .cancel {
      background: #c1c9cf;
      width: 42%;
    }
    & > .submit {
      background: #7d8bdb;
      width: 58%;
    }
  }

  .mask-list {
    display: flex;
    gap: 10px;
    width: 100%;
    flex-wrap: wrap;
    margin: 31px 0px;
  }

  .mask {
    width: 90px;
    height: 90px;
    cursor: pointer;
  }
`;

// const MyProfileModalStyle = styled.div``;
export default MyProfileModal;
