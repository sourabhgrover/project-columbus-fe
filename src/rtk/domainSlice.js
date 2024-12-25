import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../apis/apiClient'; // Adjust the import according to your project structure

// Async thunks for API calls
export const fetchDomains = createAsyncThunk('domains/fetchDomains', async () => {
  const response = await apiClient.get('/domains');
  return response.data;
});

export const createDomain = createAsyncThunk('domains/createDomain', async (newDomain) => {
  const response = await apiClient.post('/domains', newDomain);
  return response.data;
});

export const updateDomain = createAsyncThunk('domains/updateDomain', async (updatedDomain) => {
  const response = await apiClient.put(`/domains/${updatedDomain.id}`, updatedDomain);
  return response.data;
});

export const deleteDomain = createAsyncThunk('domains/deleteDomain', async (domainId) => {
  await apiClient.delete(`/domains/${domainId}`);
  return domainId;
});

// Slice
const domainSlice = createSlice({
  name: 'domains',
  initialState: {
    domains: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDomains.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDomains.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.domains = action.payload;
      })
      .addCase(fetchDomains.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createDomain.fulfilled, (state, action) => {
        state.domains.push(action.payload);
      })
      .addCase(updateDomain.fulfilled, (state, action) => {
        const index = state.domains.findIndex(domain => domain.id === action.payload.id);
        if (index !== -1) {
          state.domains[index] = action.payload;
        }
      })
      .addCase(deleteDomain.fulfilled, (state, action) => {
        state.domains = state.domains.filter(domain => domain.id !== action.payload);
      });
  },
});

export default domainSlice.reducer;