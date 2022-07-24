import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_name: "",
  user_email: "",
  workSpaceList: [],
  initial: false,
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
    getWorkSpaceList: (state, action) => {
      state.value = {
        ...action.payload,
        initial: true,
      };
    },
  },
});

export const { login, getWorkSpaceList } = userSlice.actions;

export default userSlice.reducer;
