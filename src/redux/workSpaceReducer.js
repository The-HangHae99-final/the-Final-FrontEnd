import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLs } from "../utils/localStorage";

const initialState = {
  current_workSpace: "",
};

const rootState = {
  current_workSpace: "",
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
    reset: (state, action) => {
      state.value = rootState;
    },
  },
});

export const { getWorkSpaceData, reset } = workSpaceSlice.actions;

export default workSpaceSlice.reducer;
