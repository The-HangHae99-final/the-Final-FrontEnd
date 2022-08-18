import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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

export const memberList = atom({
  key: "memberList",
  default: [],
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

export const teamTaskList = atom({
  key: "teamTaskList",
  default: [],
});

export const initialKanbanData = atom({
  key: "initialKanbanData",
  default: {
    tasks: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "TO-DO",
        taskIds: [],
      },
      "column-2": {
        id: "column-2",
        title: "IN-PROGRESS",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "COMPLETED",
        taskIds: [],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  },
  effects_UNSTABLE: [persistAtom],
});
