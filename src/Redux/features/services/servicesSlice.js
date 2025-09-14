import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch services
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5005/api/services', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      // If error.response exists, return error.response.data, else error.message
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  servicesList: [],
  loading: false,
  error: null,
  currentService: null,
  serviceLinks: [], // Array of { slug, name }
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setCurrentService: (state, action) => {
      state.currentService = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        console.log('Fetched services:', action.payload.data);
        state.loading = false;
        state.servicesList = action.payload.data.consultation;
        // Build serviceLinks array from fetched data
        if (Array.isArray(state.servicesList)) {
          state.serviceLinks = state.servicesList.map(service => ({
            slug: service.slug,
            name: service.name
          }));
        } else {
          state.serviceLinks = [];
        }
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch services';
      });
  },
});

export const selectServiceLinks = state => state.services.serviceLinks;
export const { setCurrentService } = servicesSlice.actions;
export default servicesSlice.reducer;