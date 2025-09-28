/**
 * Redux Toolkit Slice Template
 * Copy and adapt this template for: integration, consulting, payroll
 *
 * INSTRUCTIONS:
 * 1. Replace RESOURCE_NAME with your resource (e.g., 'integration', 'consulting')
 * 2. Replace API_ENDPOINT with your API path (e.g., '/api/integration', '/api/consulting')
 * 3. Adjust state shape if needed (items[] vs item{})
 * 4. Add to store/index.js imports and reducer
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { getAuthTokenFromState } from "../../lib/api";

// REPLACE: RESOURCE_NAME (e.g., 'integration', 'consulting', 'payroll')
const RESOURCE_NAME = "CHANGEME";
// REPLACE: API_ENDPOINT (e.g., '/api/integration', '/api/consulting', '/api/payroll')
const API_ENDPOINT = "/api/CHANGEME";

const initialState = {
  items: [], // Use 'item: null' for single objects like hero sections
  status: "idle",
  error: null,
  lastFetchedAt: null,
  cacheTTLms: 5 * 60 * 1000,
};

const isCacheValid = (lastFetchedAt, cacheTTLms) => {
  if (!lastFetchedAt) return false;
  return Date.now() - lastFetchedAt < cacheTTLms;
};

// --- Async Thunks ---
export const fetchRESOURCE_NAME = createAsyncThunk(
  `${RESOURCE_NAME}/fetch${RESOURCE_NAME}`,
  async ({ force = false } = {}, { getState, signal, rejectWithValue }) => {
    const resourceState = getState()[RESOURCE_NAME];
    if (
      !force &&
      isCacheValid(resourceState.lastFetchedAt, resourceState.cacheTTLms)
    ) {
      return { skip: true };
    }
    try {
      const response = await api.get(API_ENDPOINT, { signal });
      const data = Array.isArray(response.data?.data) ? response.data.data : [];
      return { data, fetchedAt: Date.now() };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createRESOURCE_NAME = createAsyncThunk(
  `${RESOURCE_NAME}/create${RESOURCE_NAME}`,
  async ({ payload }, { getState, signal, rejectWithValue }) => {
    const token = getAuthTokenFromState(getState());
    if (!token) return rejectWithValue({ message: "Authentication required" });
    try {
      const response = await api.post(API_ENDPOINT, payload, {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      });
      return {
        data: response.data?.data || response.data,
        fetchedAt: Date.now(),
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateRESOURCE_NAME = createAsyncThunk(
  `${RESOURCE_NAME}/update${RESOURCE_NAME}`,
  async ({ payload }, { getState, signal, rejectWithValue }) => {
    const token = getAuthTokenFromState(getState());
    if (!token) return rejectWithValue({ message: "Authentication required" });
    try {
      const response = await api.patch(API_ENDPOINT, payload, {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      });
      return {
        data: response.data?.data || response.data,
        fetchedAt: Date.now(),
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteRESOURCE_NAME = createAsyncThunk(
  `${RESOURCE_NAME}/delete${RESOURCE_NAME}`,
  async ({ itemId }, { getState, signal, rejectWithValue }) => {
    const token = getAuthTokenFromState(getState());
    if (!token) return rejectWithValue({ message: "Authentication required" });
    try {
      await api.delete(`${API_ENDPOINT}/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      });
      return { itemId, fetchedAt: Date.now() };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const RESOURCE_NAMESlice = createSlice({
  name: RESOURCE_NAME,
  initialState,
  reducers: {
    [`reset${RESOURCE_NAME}`]: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
    setCacheTTL: (state, action) => {
      state.cacheTTLms = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchRESOURCE_NAME.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRESOURCE_NAME.fulfilled, (state, action) => {
        if (action.payload?.skip) return;
        state.status = "succeeded";
        state.items = action.payload.data; // Use state.item = ... for single objects
        state.lastFetchedAt = action.payload.fetchedAt;
        state.error = null;
      })
      .addCase(fetchRESOURCE_NAME.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message || `Failed to fetch ${RESOURCE_NAME}`;
      })
      // Create
      .addCase(createRESOURCE_NAME.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createRESOURCE_NAME.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload.data); // Use state.item = ... for single objects
        state.lastFetchedAt = action.payload.fetchedAt;
        state.error = null;
      })
      .addCase(createRESOURCE_NAME.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message || `Failed to create ${RESOURCE_NAME}`;
      })
      // Update
      .addCase(updateRESOURCE_NAME.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateRESOURCE_NAME.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.data.id
        );
        if (index !== -1) state.items[index] = action.payload.data;
        // For single objects: state.item = action.payload.data;
        state.lastFetchedAt = action.payload.fetchedAt;
        state.error = null;
      })
      .addCase(updateRESOURCE_NAME.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message || `Failed to update ${RESOURCE_NAME}`;
      })
      // Delete
      .addCase(deleteRESOURCE_NAME.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteRESOURCE_NAME.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (item) => item.id !== action.payload.itemId
        );
        // For single objects: state.item = null;
        state.lastFetchedAt = action.payload.fetchedAt;
        state.error = null;
      })
      .addCase(deleteRESOURCE_NAME.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message || `Failed to delete ${RESOURCE_NAME}`;
      });
  },
});

// --- Selectors ---
import { createSelector } from "reselect";

const selectRESOURCE_NAME = (state) => state[RESOURCE_NAME];

export const selectRESOURCE_NAMEItems = createSelector(
  selectRESOURCE_NAME,
  (resource) => resource.items
);
export const selectRESOURCE_NAMEStatus = createSelector(
  selectRESOURCE_NAME,
  (resource) => resource.status
);
export const selectRESOURCE_NAMEError = createSelector(
  selectRESOURCE_NAME,
  (resource) => resource.error
);
export const selectIsRESOURCE_NAMELoading = createSelector(
  selectRESOURCE_NAME,
  (resource) => resource.status === "loading"
);
export const selectHasRESOURCE_NAMEData = createSelector(
  selectRESOURCE_NAME,
  (resource) => resource.items.length > 0
);
export const selectIsRESOURCE_NAMEStale = createSelector(
  selectRESOURCE_NAME,
  (resource) => !isCacheValid(resource.lastFetchedAt, resource.cacheTTLms)
);

export const {
  [`reset${RESOURCE_NAME}`]: resetRESOURCE_NAME,
  clearError,
  setCacheTTL,
} = RESOURCE_NAMESlice.actions;
export default RESOURCE_NAMESlice.reducer;

/*
COPY CHECKLIST:
□ Replace RESOURCE_NAME throughout (integration, consulting, payroll)
□ Replace API_ENDPOINT with correct path
□ Adjust state.items vs state.item for data structure
□ Add import to store/index.js
□ Add reducer to store configuration
□ Create selectors for your specific use case
□ Add tests following authSlice.test.js pattern
*/
