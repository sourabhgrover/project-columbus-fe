import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";

const initialState = {
  loading: false,
  schemaDetails: {},
  error: "",
  id: "",
};

export const updateSchema = createAsyncThunk(
  "schemas/updateSchema",
  async (schema) => {
    const response = await apiClient.patch(
      `/schemas/${schema._id}/createCustomSchema`,
      schema
    );
    return response.data;
  }
);

export const schemaDetails = createSlice({
  name: "schemaDetails",
  initialState,
  reducers: {
    setSchemaDetails: (state, action) => {
      state.schemaDetails = action.payload;
    },
    setSchedDetailsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSchedDetailsError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateSchema.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSchema.fulfilled, (state, action) => {
      state.loading = false;
      state.schemaDetails = action.payload;
      state.error = "";
    });
    builder.addCase(updateSchema.rejected, (state, action) => {
      state.loading = false;
      state.schemaDetails = {};
      state.error = action.error.message;
    });
  },
});

export const { setSchemaDetails } = schemaDetails.actions;
export default schemaDetails.reducer;
