import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../apis/apiClient'; 

// Async thunks for API calls
export const fetchGlossaryEntries = createAsyncThunk('businessGlossary/fetchGlossaryEntries', async () => {
  const response = await apiClient.get('/glossaries');
  return response.data;
});

export const saveGlossaryEntry = createAsyncThunk('businessGlossary/saveGlossaryEntry', async (newEntry) => {
  const response = await apiClient.post('/glossaries', newEntry);
  return response.data;
});

export const updateGlossaryEntry = createAsyncThunk('businessGlossary/updateGlossaryEntry', async (updatedEntry) => {
  const response = await apiClient.put(`/glossaries/${updatedEntry.id}`, updatedEntry);
  return response.data;
});

export const deleteGlossaryEntry = createAsyncThunk('businessGlossary/deleteGlossaryEntry', async (entryId) => {
  await apiClient.delete(`/glossaries/${entryId}`);
  return entryId;
});

const initialState = {
    entries: [],
    status: 'idle',
    error: null,
  }

// Slice
const businessGlossarySlice = createSlice({
  name: 'businessGlossary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlossaryEntries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGlossaryEntries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchGlossaryEntries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveGlossaryEntry.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      })
      .addCase(updateGlossaryEntry.fulfilled, (state, action) => {
        const index = state.entries.findIndex(entry => entry.id === action.payload.id);
        if (index !== -1) {
          state.entries[index] = action.payload;
        }
      })
      .addCase(deleteGlossaryEntry.fulfilled, (state, action) => {
        state.entries = state.entries.filter(entry => entry.id !== action.payload);
      });
  },
});

export default businessGlossarySlice.reducer;