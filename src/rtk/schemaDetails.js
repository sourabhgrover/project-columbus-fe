import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";

const initialState = {
  loading: false,
  schemaDetails: {},
  error: "",
  success: false,
  id: "",
};

export const updateSchema = createAsyncThunk(
  "schemas/updateSchema",
  async (schema) => {
    const { _id, ...updatedSchema } = schema;
    const response = await apiClient.patch(
      `/schemas/${_id}/createCustomSchema`,
      updatedSchema
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
      state.success = false;
    });
    builder.addCase(updateSchema.fulfilled, (state, action) => {
      state.loading = false;
      state.schemaDetails = action.payload;
      state.error = "";
      state.success = true;
    });
    builder.addCase(updateSchema.rejected, (state, action) => {
      state.loading = false;
      state.schemaDetails = {};
      state.error = action.error.message;
      state.success = false;
    });
  },
});

export const { setSchemaDetails } = schemaDetails.actions;
export default schemaDetails.reducer;
