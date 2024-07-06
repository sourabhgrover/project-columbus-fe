import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";

const initialState = {
  loading: false,
  error: "",
  success: false,
  data: [],
  id: "",
};

export const createUseCase = createAsyncThunk(
  "useCase/createUseCase",
  async (payload) => {
    const response = await apiClient.post(
      `/useCase`,
      payload
    );
    return response.data;
  }
);

// export const fetchBusinessTerms = createAsyncThunk(
//   "businessTerms/fetchBusinessTerms",
//   async () => {
//     const response = await apiClient.get("/businessTerms");
//     return response.data;
//   }
// );

export const useCase = createSlice({
  name: "useCase",
  initialState,
  reducers: {
    setBusinessTermSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUseCase.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(createUseCase.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.success = true;
    });
    builder.addCase(createUseCase.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
    });
    // builder.addCase(fetchBusinessTerms.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(fetchBusinessTerms.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload;
    //   state.error = "";
    // });
  },
});

export const { actions, reducer } = useCase;
export default useCase.reducer;
