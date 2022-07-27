import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_name: "",
  user_email: "",
  workSpaceList: [],
  invitation: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialState,
  },
  reducers: {
    login: (state, action) => {
      state.value = {
        ...action.payload,
      };
    },
    userLogout: () => initialState,
    getUserInfo: (state, action) => {
      console.log("action: ", action);
      state.value = action.payload;
    },
    removeInvitation: (state, action) => {
      state.value = {
        ...action.payload,
      };
    },
  },
});

export const { login, userLogout, getUserInfo, removeInvitation } =
  userSlice.actions;

export default userSlice.reducer;
