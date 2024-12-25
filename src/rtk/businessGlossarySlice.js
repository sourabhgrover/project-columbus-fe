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
    fetchStatus: 'idle',
    saveStatus: 'idle',
    updateStatus: 'idle',
    deleteStatus: 'idle',
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
        state.fetchStatus = 'loading';
      })
      .addCase(fetchGlossaryEntries.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchGlossaryEntries.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveGlossaryEntry.pending, (state) => {
        state.saveStatus = 'loading';
      })
      .addCase(saveGlossaryEntry.fulfilled, (state, action) => {
        state.saveStatus = 'succeeded';
        state.entries.push(action.payload);
      })
      .addCase(saveGlossaryEntry.rejected, (state, action) => {
        state.saveStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateGlossaryEntry.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateGlossaryEntry.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        const index = state.entries.findIndex(entry => entry.id === action.payload.id);
        if (index !== -1) {
          state.entries[index] = action.payload;
        }
      })
      .addCase(updateGlossaryEntry.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteGlossaryEntry.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteGlossaryEntry.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.entries = state.entries.filter(entry => entry.id !== action.payload);
      })
      .addCase(deleteGlossaryEntry.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default businessGlossarySlice.reducer;