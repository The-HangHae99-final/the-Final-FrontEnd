import React from "react";
import styled from "styled-components";
import camera from "../public/img/camera.png";

const FileUploadBtn = () => {
  const handleFileOnChange = () => {};

  return (
    <>
      <FileUploadFormStyle>
        <div className="fakeup-load-btn"></div>
        <div className="upload-button">
          <img
            src={camera}
            alt="camera"
            className="camera"
            onClick={handleFileOnChange}
          />
        </div>
      </FileUploadFormStyle>
    </>
  );
};

const FileUploadFormStyle = styled.form``;

export default FileUploadBtn;
