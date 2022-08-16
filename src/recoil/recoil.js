import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    user_name: "",
    user_email: "",
    profile_image_url: "",
    workSpaceList: [],
    invitation: [],
  },
});

export const currentWorkspaceState = atom({
  key: "currentWorkspaceState",
  default: "",
});

export const canbanList = atom({
  key: "canbanList",
  default: {
    "TO-DO": [],
    "IN-PROGRESS": [],
    COMPLETED: [],
  },
});

export const myTaskList = atom({
  key: "myTaskList",
  default: [],
});
