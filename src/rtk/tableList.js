import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

export const fetchTableList = createAsyncThunk(
  "tableList/fetchTableList",
  async ({ catalogName, schemaName }) => {
    const response = await apiClient.get("/tables/fetchTables", {
      params: {
        catalog_name : catalogName,
        schema_name: schemaName,
      },
    });
    return response.data;
  }
);

const tableListSlice = createSlice({
  name: "tableList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTableList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchTableList.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export const { actions, reducer } = tableListSlice;
export default reducer;
