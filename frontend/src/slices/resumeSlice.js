import { createSlice } from "@reduxjs/toolkit";

const resumeSlice = createSlice({
  name: "resume", // Định danh slice
  initialState: {
    // Khai báo giá trị mặc định của state
    resumeFile: null,
    importStatus: "",
    uploadStatus: "hidden",
  },
  reducers: {
    // Kết hợp giữa action creater và reducer
    get: (state, action) => {
      return {
        ...state,
        resumeFile: action.payload,
      };
    },
    set_import_status: (state, action) => {
      return {
        ...state,
        importStatus: action.payload,
      };
    },
    set_upload_status: (state, action) => {
      return {
        ...state,
        uploadStatus: action.payload,
      };
    },
  },
});

// export actions
export const { get, set_upload_status, set_import_status } =
  resumeSlice.actions;

// export reducer
export default resumeSlice.reducer;
