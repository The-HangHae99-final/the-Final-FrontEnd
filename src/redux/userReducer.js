import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_name: "",
  user_email: "",
  user_id: "",
  isLoggedIn: false,
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
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
