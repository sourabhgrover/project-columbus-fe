import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../apis/apiClient'; // Adjust the import according to your project structure

// Async thunks for API calls
export const fetchOwnerships = createAsyncThunk('ownership/fetchOwnerships', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/ownership'); // Replace with your API endpoint for fetching ownerships
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to fetch ownerships');
  }
});

export const createOwnership = createAsyncThunk('ownership/createOwnership', async (newOwnership, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/ownership', newOwnership); // Replace with your API endpoint for creating ownership
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response?.data?.error || 'Failed to create ownership');
  }
});

export const updateOwnership = createAsyncThunk('ownership/updateOwnership', async (updatedOwnership, { rejectWithValue }) => {
  try {
    const response = await apiClient.put(`/ownership/${updatedOwnership.id}`, updatedOwnership); // Replace with your API endpoint for updating ownership
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response?.data?.error || 'Failed to update ownership');
  }
});

export const deleteOwnership = createAsyncThunk('ownership/deleteOwnership', async (ownershipId, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/ownership/${ownershipId}`); // Replace with your API endpoint for deleting ownership
    return ownershipId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to delete ownership');
  }
});

// Slice
const ownershipSlice = createSlice({
  name: 'ownership',
  initialState: {
    ownerships: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Ownerships
      .addCase(fetchOwnerships.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOwnerships.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ownerships = action.payload;
      })
      .addCase(fetchOwnerships.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create Ownership
      .addCase(createOwnership.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOwnership.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ownerships.push(action.payload);
      })
      .addCase(createOwnership.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update Ownership
      .addCase(updateOwnership.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateOwnership.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.ownerships.findIndex((ownership) => ownership.id === action.payload.id);
        if (index !== -1) {
          state.ownerships[index] = action.payload;
        }
      })
      .addCase(updateOwnership.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete Ownership
      .addCase(deleteOwnership.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteOwnership.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ownerships = state.ownerships.filter((ownership) => ownership._id !== action.payload);
      })
      .addCase(deleteOwnership.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default ownershipSlice.reducer;