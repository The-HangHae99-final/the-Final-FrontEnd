import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_name: "",
  user_email: "",
  workSpaceList: [],
  invitation: [],
  loaded: false,
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
        initial: true,
      };
    },
    userLogout: () => initialState,
    getUserInfo: (state, action) => {
      state.value = action.payload;
      // {
      //   ...action.payload,
      //   initial: true,
      // };
    },
  },
});

export const { login, userLogout, getUserInfo } = userSlice.actions;

export default userSlice.reducer;
