import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { uploadForm } from "../../lib/api";
import { getAuthToken, setAuthToken } from "../../utils/tokenManager";

/**
 * @typedef {'idle' | 'loading' | 'succeeded' | 'failed'} LoadStatus
 * @typedef {Object} AuthState
 * @property {Object|null} user
 * @property {string|null} token
 * @property {LoadStatus} status
 * @property {string|null} error
 * @property {number|null} lastFetchedAt
 * @property {number} cacheTTLms
 */

const initialState = {
  user: null,
  token: getAuthToken(),
  status: "idle",
  error: null,
  lastFetchedAt: null,
  cacheTTLms: 5 * 60 * 1000, // 5 minutes
};

// Helper: check cache validity
const isCacheValid = (lastFetchedAt, cacheTTLms) => {
  if (!lastFetchedAt) return false;
  return Date.now() - lastFetchedAt < cacheTTLms;
};

// --- Async Thunks ---
export const createAdmin = createAsyncThunk(
  "auth/createAdmin",
  async ({ payload }, { signal, rejectWithValue }) => {
    try {
      const response = await api.post("/Authentication/CreateAdmin", payload, {
        signal,
      });
      return { data: response.data, fetchedAt: Date.now() };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { signal, rejectWithValue }) => {
    try {
      // Use the correct field names as defined in LoginDTO
      const loginData = {
        email: payload.email,
        password: payload.password,
      };

      console.log("🔐 [LOGIN] Attempting login with:", loginData);

      const response = await api.post("/Authentication/Login", loginData, {
        signal,
      });

      console.log("✅ [LOGIN] Login successful:", response.data);

      // Store token using centralized token manager
      const token = response.data?.data?.token;
      if (token) {
        setAuthToken(token);
      }

      return {
        token,
        user: response.data?.data?.user,
        fetchedAt: Date.now(),
      };
    } catch (error) {
      console.error("❌ [LOGIN] Login failed:", error);
      return rejectWithValue(error);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { getState, signal, rejectWithValue }) => {
    const { auth } = getState();

    if (!auth.token) {
      return rejectWithValue({ message: "No authentication token available" });
    }

    // Check if we have valid cached data
    if (isCacheValid(auth.lastFetchedAt, auth.cacheTTLms)) {
      console.log("📋 [PROFILE] Using cached profile data");
      return { skip: true };
    }

    try {
      const response = await api.get("/Authentication/GetProfile", {
        headers: { Authorization: `Bearer ${auth.token}` },
        signal,
      });

      console.log("✅ [PROFILE] Profile fetched successfully:", response.data);
      return { data: response.data?.data, fetchedAt: Date.now() };
    } catch (error) {
      console.error("❌ [PROFILE] Failed to fetch profile:", error);
      return rejectWithValue(error);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "auth/uploadImage",
  async ({ payload }, { getState, signal, rejectWithValue }) => {
    const { auth } = getState();

    if (!auth.token) {
      return rejectWithValue({ message: "No authentication token available" });
    }

    try {
      const formData = new FormData();
      formData.append("image", payload.image);

      const response = await uploadForm(formData, "/api/auth/upload-image", {
        headers: { Authorization: `Bearer ${auth.token}` },
        signal,
      });

      return { data: response.data, fetchedAt: Date.now() };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      state.lastFetchedAt = null;
      // Clear ALL localStorage data
      localStorage.clear();
      sessionStorage.clear();
    },
    clearError: (state) => {
      state.error = null;
    },
    setCacheTTL: (state, action) => {
      state.cacheTTLms = action.payload;
    },
  },
  extraReducers: (builder) => {
    // --- Create Admin ---
    builder
      .addCase(createAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastFetchedAt = action.payload.fetchedAt;
        state.error = null;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to create admin";
      })
      // --- Login ---
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.lastFetchedAt = action.payload.fetchedAt;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
        state.token = null;
        state.user = null;
        localStorage.removeItem("authToken");
      })
      // --- Get Profile ---
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        if (action.payload?.skip) return;
        state.status = "succeeded";
        state.user = action.payload.data;
        state.lastFetchedAt = action.payload.fetchedAt;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch profile";
      })
      // --- Upload Image ---
      .addCase(uploadImage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastFetchedAt = action.payload.fetchedAt;
        state.error = null;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to upload image";
      });
  },
});

// --- Selectors ---
import { createSelector } from "reselect";

const selectAuth = (state) => state.auth;

export const selectUser = createSelector(selectAuth, (auth) => auth.user);
export const selectToken = createSelector(selectAuth, (auth) => auth.token);
export const selectAuthStatus = createSelector(
  selectAuth,
  (auth) => auth.status
);
export const selectAuthError = createSelector(selectAuth, (auth) => auth.error);
export const selectIsAuthenticated = createSelector(
  selectAuth,
  (auth) => !!auth.token
);
export const selectIsAuthLoading = createSelector(
  selectAuth,
  (auth) => auth.status === "loading"
);
export const selectIsAuthStale = createSelector(
  selectAuth,
  (auth) => !isCacheValid(auth.lastFetchedAt, auth.cacheTTLms)
);

export const { logout, clearError, setCacheTTL } = authSlice.actions;
export default authSlice.reducer;