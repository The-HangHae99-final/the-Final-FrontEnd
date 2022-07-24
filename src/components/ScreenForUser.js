import React from "react";

const ScreenForUser = ({ REQUIRED_ID }) => {
  return (
    <div>
      {REQUIRED_ID ? <>웤스 선택해주세요</> : <>워크스페이스에 들어왔습니다</>}
    </div>
  );
};

export default ScreenForUser;
