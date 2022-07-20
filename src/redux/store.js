import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userReducer";
import { messageSlice } from "./messageReducer";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    messageList: messageSlice.reducer,
  },
});
