import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataList: [],
  user_name: "",
};

export const messageSlice = createSlice({
  name: "messageList",
  initialState: {
    value: initialState,
  },
  reducers: {
    getMessageList: (state, action) => {
      console.log(action);
      state.value = action.payload;
    },
  },
});

export const { getMessageList } = messageSlice.actions;

export default messageSlice.reducer;
