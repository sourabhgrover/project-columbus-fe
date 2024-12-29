import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";

const initialState = {
  loading: false,
  error: "",
  success: false,
  data: [],
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

export const fetchBusinessTerms = createAsyncThunk(
  "businessTerms/fetchBusinessTerms",
  async () => {
    const response = await apiClient.get("/businessTerms");
    return response.data;
  }
);

// Async thunk to fetch business terms by glossary ID
export const fetchBusinessTermsByGlossaryId = createAsyncThunk(
  'businessTerms/fetchBusinessTermsByGlossaryId',
  async (glossaryId) => {
    const response = await apiClient.get(`/businessTerms/glossary/${glossaryId}`);
    return response.data;
  }
);

// Async thunk to update a business term
export const updateBusinessTerm = createAsyncThunk(
  "businessTerms/updateBusinessTerm",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/businessTerms/${id}`, updatedData);
      return response.data; // Return the updated term to update the state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update business term");
    }
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
    builder.addCase(fetchBusinessTerms.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchBusinessTerms.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchBusinessTermsByGlossaryId.pending, (state) => {
      state.fetchStatus = 'loading';
    })
    .addCase(fetchBusinessTermsByGlossaryId.fulfilled, (state, action) => {
      state.fetchStatus = 'succeeded';
      state.data = action.payload;
    })
    .addCase(fetchBusinessTermsByGlossaryId.rejected, (state, action) => {
      state.fetchStatus = 'failed';
      state.error = action.error.message;
    });
  },
});


export const deleteBusinessTerm = createAsyncThunk(
  "businessTerms/deleteBusinessTerm",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/businessTerms/${id}`);
      return id; // Return the deleted term ID to update the state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete business term");
    }
  }
);

export const { actions, reducer } = addBusinessTerm;
export default addBusinessTerm.reducer;
