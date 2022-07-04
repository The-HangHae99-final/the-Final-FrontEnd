import React from "react";
import { Avatar } from "@mui/material";

const UserAvatar = (props) => {
  const { size } = props;
  return (
    <div>
      {size === "small" ? (
        <>
          <Avatar
            alt="Vemy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 32, height: 32 }}
            style={{
              cursor: "pointer",
            }}
          />
        </>
      ) : (
        <div>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
