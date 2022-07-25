import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLs } from "../utils/localStorage";

const initialState = {
  workSpace_name: "",
};

export const workSpaceSlice = createSlice({
  name: "workSpace",
  initialState: {
    value: initialState,
  },
  reducers: {
    getWorkSpaceData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getWorkSpaceData } = workSpaceSlice.actions;

export default workSpaceSlice.reducer;
