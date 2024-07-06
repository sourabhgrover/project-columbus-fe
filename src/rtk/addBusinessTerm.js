import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";

const initialState = {
  loading: false,
  error: "",
  success: false,
  id: "",
};

export const createBusinessTerm = createAsyncThunk(
  "businessTerms",
  async (payload) => {
    const response = await apiClient.post(
      `/businessTerms`,
      payload
    );
    return response.data;
  }
);

export const addBusinessTerm = createSlice({
  name: "addBusinessTerm",
  initialState,
  reducers: {
    setBusinessTermSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createBusinessTerm.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(createBusinessTerm.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.success = true;
    });
    builder.addCase(createBusinessTerm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
    });
  },
});

export const { actions, reducer } = addBusinessTerm;
export default addBusinessTerm.reducer;
