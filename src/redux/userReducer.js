import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_name: "",
  user_email: "",
  isLoggedIn: false,
  workSpaceList: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialState,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    getWorkSpaceList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { login, getWorkSpaceList } = userSlice.actions;

export default userSlice.reducer;
