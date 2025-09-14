import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  createAdmin,
  login,
  getProfile,
  uploadImage,
  logout,
  clearError,
  setCacheTTL,
} from "../authSlice";

// Mock the API
jest.mock("../../../lib/api", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
  uploadForm: jest.fn(),
  getAuthToken: jest.fn(),
}));

describe("authSlice", () => {
  let store;
  let mockApi;
  let mockUploadForm;

  beforeEach(() => {
    jest.clearAllMocks();

    // Reset localStorage
    localStorage.clear();

    mockApi = require("../../../lib/api").default;
    mockUploadForm = require("../../../lib/api").uploadForm;

    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  describe("initial state", () => {
    it("should have correct initial state", () => {
      const state = store.getState().auth;
      expect(state).toEqual({
        user: null,
        token: null,
        status: "idle",
        error: null,
        lastFetchedAt: null,
        cacheTTLms: 5 * 60 * 1000,
      });
    });

    it("should load token from localStorage", () => {
      localStorage.setItem("authToken", "test-token");

      const newStore = configureStore({
        reducer: {
          auth: authReducer,
        },
      });

      const state = newStore.getState().auth;
      expect(state.token).toBe("test-token");
    });
  });

  describe("reducers", () => {
    it("should handle logout", () => {
      // Set up initial state with user and token
      store.dispatch({
        type: "auth/login/fulfilled",
        payload: { token: "test-token", user: { id: 1 } },
      });
      localStorage.setItem("authToken", "test-token");

      store.dispatch(logout());

      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.status).toBe("idle");
      expect(localStorage.getItem("authToken")).toBeNull();
    });

    it("should handle clearError", () => {
      store.dispatch({
        type: "auth/login/rejected",
        payload: { message: "Test error" },
      });
      expect(store.getState().auth.error).toBe("Test error");

      store.dispatch(clearError());
      expect(store.getState().auth.error).toBeNull();
    });

    it("should handle setCacheTTL", () => {
      store.dispatch(setCacheTTL(10000));
      expect(store.getState().auth.cacheTTLms).toBe(10000);
    });
  });

  describe("createAdmin thunk", () => {
    it("should handle successful admin creation", async () => {
      const mockResponse = { data: { success: true } };
      mockApi.post.mockResolvedValue(mockResponse);

      const payload = {
        username: "admin",
        email: "admin@test.com",
        password: "password123",
      };
      const result = await store.dispatch(createAdmin({ payload }));

      expect(mockApi.post).toHaveBeenCalledWith(
        "/api/auth/create-admin",
        payload,
        { signal: undefined }
      );
      expect(result.type).toBe("auth/createAdmin/fulfilled");
      expect(result.payload.data).toEqual(mockResponse.data);

      const state = store.getState().auth;
      expect(state.status).toBe("succeeded");
      expect(state.error).toBeNull();
    });

    it("should handle admin creation failure", async () => {
      const mockError = { message: "Admin creation failed" };
      mockApi.post.mockRejectedValue(mockError);

      const result = await store.dispatch(createAdmin({ payload: {} }));

      expect(result.type).toBe("auth/createAdmin/rejected");
      expect(result.payload).toEqual(mockError);

      const state = store.getState().auth;
      expect(state.status).toBe("failed");
      expect(state.error).toBe("Admin creation failed");
    });
  });

  describe("login thunk", () => {
    it("should handle successful login", async () => {
      const mockResponse = {
        data: {
          data: {
            token: "test-jwt-token",
            user: { id: 1, email: "user@test.com" },
          },
        },
      };
      mockApi.post.mockResolvedValue(mockResponse);

      const payload = { email: "user@test.com", password: "password123" };
      const result = await store.dispatch(login({ payload }));

      expect(mockApi.post).toHaveBeenCalledWith("/api/auth/login", payload, {
        signal: undefined,
      });
      expect(result.type).toBe("auth/login/fulfilled");
      expect(localStorage.getItem("authToken")).toBe("test-jwt-token");

      const state = store.getState().auth;
      expect(state.status).toBe("succeeded");
      expect(state.token).toBe("test-jwt-token");
      expect(state.user).toEqual(mockResponse.data.data.user);
      expect(state.error).toBeNull();
    });

    it("should handle login failure", async () => {
      const mockError = { message: "Invalid credentials" };
      mockApi.post.mockRejectedValue(mockError);

      const result = await store.dispatch(login({ payload: {} }));

      expect(result.type).toBe("auth/login/rejected");

      const state = store.getState().auth;
      expect(state.status).toBe("failed");
      expect(state.error).toBe("Invalid credentials");
      expect(state.token).toBeNull();
      expect(localStorage.getItem("authToken")).toBeNull();
    });
  });

  describe("getProfile thunk", () => {
    it("should fetch profile when cache is invalid", async () => {
      // Set up authenticated state
      store.dispatch({
        type: "auth/login/fulfilled",
        payload: { token: "test-token", user: {} },
      });

      const mockResponse = {
        data: { data: { id: 1, email: "user@test.com" } },
      };
      mockApi.get.mockResolvedValue(mockResponse);

      const result = await store.dispatch(getProfile());

      expect(mockApi.get).toHaveBeenCalledWith("/api/auth/profile", {
        headers: { Authorization: "Bearer test-token" },
        signal: undefined,
      });
      expect(result.type).toBe("auth/getProfile/fulfilled");

      const state = store.getState().auth;
      expect(state.user).toEqual(mockResponse.data.data);
    });

    it("should skip fetch when cache is valid", async () => {
      // Set up state with recent fetch
      const recentTime = Date.now();
      store.dispatch({
        type: "auth/getProfile/fulfilled",
        payload: { data: { id: 1 }, fetchedAt: recentTime },
      });
      store.dispatch({
        type: "auth/login/fulfilled",
        payload: { token: "test-token" },
      });

      const result = await store.dispatch(getProfile({ force: false }));

      expect(mockApi.get).not.toHaveBeenCalled();
      expect(result.payload.skip).toBe(true);
    });

    it("should reject when no auth token", async () => {
      const result = await store.dispatch(getProfile());

      expect(result.type).toBe("auth/getProfile/rejected");
      expect(result.payload.message).toBe("No authentication token available");
    });
  });

  describe("uploadImage thunk", () => {
    it("should handle successful image upload", async () => {
      // Set up authenticated state
      store.dispatch({
        type: "auth/login/fulfilled",
        payload: { token: "test-token" },
      });

      const mockResponse = { data: { url: "https://example.com/image.jpg" } };
      mockUploadForm.mockResolvedValue(mockResponse);

      const mockFile = new File([""], "test.jpg", { type: "image/jpeg" });
      const result = await store.dispatch(
        uploadImage({ payload: { image: mockFile } })
      );

      expect(mockUploadForm).toHaveBeenCalledWith(
        expect.any(FormData),
        "/api/auth/upload-image",
        {
          headers: { Authorization: "Bearer test-token" },
          signal: undefined,
        }
      );
      expect(result.type).toBe("auth/uploadImage/fulfilled");

      const state = store.getState().auth;
      expect(state.status).toBe("succeeded");
      expect(state.error).toBeNull();
    });

    it("should reject when no auth token", async () => {
      const result = await store.dispatch(
        uploadImage({ payload: { image: new File([""], "test.jpg") } })
      );

      expect(result.type).toBe("auth/uploadImage/rejected");
      expect(result.payload.message).toBe("No authentication token available");
    });
  });

  describe("abort signal handling", () => {
    it("should handle aborted requests", async () => {
      const controller = new AbortController();
      controller.abort();

      const mockError = new Error("Request aborted");
      mockError.name = "AbortError";
      mockApi.post.mockRejectedValue(mockError);

      const result = await store.dispatch(login({ payload: {} }));

      expect(result.type).toBe("auth/login/rejected");
      expect(result.payload.message).toBe("Request aborted");
    });
  });

  describe("cache behavior", () => {
    it("should respect cache TTL for profile requests", async () => {
      // Set up state with token and old cache
      const oldTime = Date.now() - 10 * 60 * 1000; // 10 minutes ago
      store.dispatch({
        type: "auth/login/fulfilled",
        payload: { token: "test-token" },
      });
      store.dispatch({
        type: "auth/getProfile/fulfilled",
        payload: { data: { id: 1 }, fetchedAt: oldTime },
      });

      const mockResponse = { data: { data: { id: 1, updated: true } } };
      mockApi.get.mockResolvedValue(mockResponse);

      // Force=false should still fetch because cache is expired
      const result = await store.dispatch(getProfile({ force: false }));

      expect(mockApi.get).toHaveBeenCalled();
      expect(result.type).toBe("auth/getProfile/fulfilled");
    });
  });
});
