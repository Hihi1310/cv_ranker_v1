import { createSlice } from "@reduxjs/toolkit";

const resumeSlice = createSlice({
  name: "resume", // Định danh slice
  initialState: {
    // Khai báo giá trị mặc định của state
    resumeFile: null,
  },
  reducers: {
    // Kết hợp giữa action creater và reducer
    get: (state, action) => {
      return { ...state, resumeFile: action.payload };
    },
  },
});

// export actions
export const { get } = resumeSlice.actions;

// export reducer
export default resumeSlice.reducer;
