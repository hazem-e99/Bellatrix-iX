import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

/**
 * @typedef {'idle' | 'loading' | 'succeeded' | 'failed'} LoadStatus
 * @typedef {Object} ServicesState
 * @property {{ data: any[]; status: LoadStatus; error: string | null; lastFetchedAt: number | null; }} all
 * @property {{ data: any[]; status: LoadStatus; error: string | null; lastFetchedAt: number | null; }} consultation
 * @property {{ data: Record<string, any> | null; status: LoadStatus; error: string | null; lastFetchedAt: number | null; }} support
 * @property {number} cacheTTLms
 */

const initialState = {
  all: { data: [], status: "idle", error: null, lastFetchedAt: null },
  consultation: { data: [], status: "idle", error: null, lastFetchedAt: null },
  support: { data: null, status: "idle", error: null, lastFetchedAt: null },
  cacheTTLms: 5 * 60 * 1000, // 5 minutes
};

// Helper: check cache validity
const isCacheValid = (lastFetchedAt, cacheTTLms) => {
  if (!lastFetchedAt) return false;
  return Date.now() - lastFetchedAt < cacheTTLms;
};

// --- Async Thunks ---
export const fetchAllServices = createAsyncThunk(
  "services/fetchAllServices",
  async ({ force = false } = {}, { getState, signal, rejectWithValue }) => {
    const { services } = getState();
    if (
      !force &&
      isCacheValid(services.all.lastFetchedAt, services.cacheTTLms)
    ) {
      // Skip fetch if cache is valid
      return { skip: true };
    }
    try {
      const response = await api.get("/api/services", { signal });
      // Guarantee array
      const data = Array.isArray(response.data?.data?.consultation)
        ? response.data.data.consultation
        : [];
      return { data, fetchedAt: Date.now() };
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const fetchConsultationServices = createAsyncThunk(
  "services/fetchConsultationServices",
  async ({ force = false } = {}, { getState, signal, rejectWithValue }) => {
    const { services } = getState();
    if (
      !force &&
      isCacheValid(services.consultation.lastFetchedAt, services.cacheTTLms)
    ) {
      return { skip: true };
    }
    try {
      const response = await api.get("/api/services/consultation", { signal });
      // Guarantee array
      const data = Array.isArray(response.data?.data) ? response.data.data : [];
      return { data, fetchedAt: Date.now() };
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const fetchSupportServices = createAsyncThunk(
  "services/fetchSupportServices",
  async ({ force = false } = {}, { getState, signal, rejectWithValue }) => {
    const { services } = getState();
    if (
      !force &&
      isCacheValid(services.support.lastFetchedAt, services.cacheTTLms)
    ) {
      return { skip: true };
    }
    try {
      const response = await api.get("/api/services/support", { signal });
      // Guarantee object
      const data =
        response.data?.data && typeof response.data.data === "object"
          ? response.data.data
          : {};
      return { data, fetchedAt: Date.now() };
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    resetServices: () => initialState,
    setCacheTTL: (state, action) => {
      state.cacheTTLms = action.payload;
    },
  },
  extraReducers: (builder) => {
    // --- All Services ---
    builder
      .addCase(fetchAllServices.pending, (state) => {
        state.all.status = "loading";
        state.all.error = null;
      })
      .addCase(fetchAllServices.fulfilled, (state, action) => {
        if (action.payload?.skip) return;
        state.all.data = action.payload.data;
        state.all.status = "succeeded";
        state.all.lastFetchedAt = action.payload.fetchedAt;
        state.all.error = null;
      })
      .addCase(fetchAllServices.rejected, (state, action) => {
        state.all.status = "failed";
        state.all.error = action.payload || "Failed to fetch all services";
      })
      // --- Consultation ---
      .addCase(fetchConsultationServices.pending, (state) => {
        state.consultation.status = "loading";
        state.consultation.error = null;
      })
      .addCase(fetchConsultationServices.fulfilled, (state, action) => {
        if (action.payload?.skip) return;
        state.consultation.data = action.payload.data;
        state.consultation.status = "succeeded";
        state.consultation.lastFetchedAt = action.payload.fetchedAt;
        state.consultation.error = null;
      })
      .addCase(fetchConsultationServices.rejected, (state, action) => {
        state.consultation.status = "failed";
        state.consultation.error =
          action.payload || "Failed to fetch consultation services";
      })
      // --- Support ---
      .addCase(fetchSupportServices.pending, (state) => {
        state.support.status = "loading";
        state.support.error = null;
      })
      .addCase(fetchSupportServices.fulfilled, (state, action) => {
        if (action.payload?.skip) return;
        state.support.data = action.payload.data;
        state.support.status = "succeeded";
        state.support.lastFetchedAt = action.payload.fetchedAt;
        state.support.error = null;
      })
      .addCase(fetchSupportServices.rejected, (state, action) => {
        state.support.status = "failed";
        state.support.error =
          action.payload || "Failed to fetch support services";
      });
  },
});

// --- Selectors ---
import { createSelector } from "reselect";

const selectServices = (state) => state.services;

export const selectAllServices = createSelector(
  selectServices,
  (services) => services.all.data
);
export const selectConsultationServices = createSelector(
  selectServices,
  (services) => services.consultation.data
);
export const selectSupportServices = createSelector(
  selectServices,
  (services) => services.support.data
);
export const selectServicesStatuses = createSelector(
  selectServices,
  (services) => ({
    all: services.all.status,
    consultation: services.consultation.status,
    support: services.support.status,
  })
);
export const selectServicesErrors = createSelector(
  selectServices,
  (services) => ({
    all: services.all.error,
    consultation: services.consultation.error,
    support: services.support.error,
  })
);
export const selectIsServicesLoading = createSelector(
  selectServicesStatuses,
  (statuses) => Object.values(statuses).includes("loading")
);
export const selectHasServicesData = createSelector(
  selectServices,
  (services) =>
    !!(
      (Array.isArray(services.all.data) && services.all.data.length) ||
      (Array.isArray(services.consultation.data) &&
        services.consultation.data.length) ||
      (services.support.data && Object.keys(services.support.data).length)
    )
);

export const { resetServices, setCacheTTL } = servicesSlice.actions;
export default servicesSlice.reducer;
