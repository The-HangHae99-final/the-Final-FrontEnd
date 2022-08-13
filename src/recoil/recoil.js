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
