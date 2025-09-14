import { configureStore } from "@reduxjs/toolkit";
import servicesReducer, {
  fetchServices,
  createService,
  updateService,
  deleteService,
  resetServices,
  setCacheTTL,
} from "../landing/servicesSlice";

// Mock the API
jest.mock("../../lib/api", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
  getAuthToken: jest.fn(() => "mock-token"),
}));

describe("servicesSlice", () => {
  let store;
  let mockApi;
  let initialState;

  beforeEach(() => {
    jest.clearAllMocks();

    mockApi = require("../../lib/api").default;

    initialState = {
      items: [],
      status: "idle",
      error: null,
      lastFetchedAt: null,
      cacheTTLms: 5 * 60 * 1000,
    };

    store = configureStore({
      reducer: {
        services: servicesReducer,
      },
    });
  });

  it("should return the initial state", () => {
    expect(servicesReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should handle resetServices", () => {
    const modifiedState = {
      ...initialState,
      items: [{ id: 1, name: "Test Service" }],
    };
    expect(servicesReducer(modifiedState, resetServices())).toEqual(
      initialState
    );
  });

  it("should handle setCacheTTL", () => {
    const state = servicesReducer(initialState, setCacheTTL(12345));
    expect(state.cacheTTLms).toBe(12345);
  });

  it("should handle fetchServices.pending", () => {
    const state = servicesReducer(initialState, {
      type: fetchServices.pending.type,
    });
    expect(state.status).toBe("loading");
    expect(state.error).toBeNull();
  });

  it("should handle fetchServices.fulfilled", () => {
    const payload = {
      data: [
        { id: 1, name: "Service 1" },
        { id: 2, name: "Service 2" },
      ],
      fetchedAt: 123,
    };
    const state = servicesReducer(initialState, {
      type: fetchServices.fulfilled.type,
      payload,
    });
    expect(state.items).toEqual(payload.data);
    expect(state.status).toBe("succeeded");
    expect(state.lastFetchedAt).toBe(123);
    expect(state.error).toBeNull();
  });

  it("should handle fetchServices.rejected", () => {
    const state = servicesReducer(initialState, {
      type: fetchServices.rejected.type,
      payload: { message: "Network error" },
    });
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Network error");
  });

  it("should handle createService.fulfilled", () => {
    const newService = { id: 3, name: "New Service" };
    const payload = { data: newService, fetchedAt: 456 };
    const state = servicesReducer(initialState, {
      type: createService.fulfilled.type,
      payload,
    });
    expect(state.items).toContain(newService);
    expect(state.status).toBe("succeeded");
    expect(state.lastFetchedAt).toBe(456);
  });

  it("should handle updateService.fulfilled", () => {
    const existingService = { id: 1, name: "Original Service" };
    const updatedService = { id: 1, name: "Updated Service" };
    const stateWithService = { ...initialState, items: [existingService] };

    const payload = { data: updatedService, fetchedAt: 789 };
    const state = servicesReducer(stateWithService, {
      type: updateService.fulfilled.type,
      payload,
    });

    expect(state.items[0]).toEqual(updatedService);
    expect(state.status).toBe("succeeded");
  });

  it("should handle deleteService.fulfilled", () => {
    const service1 = { id: 1, name: "Service 1" };
    const service2 = { id: 2, name: "Service 2" };
    const stateWithServices = { ...initialState, items: [service1, service2] };

    const payload = { serviceId: 1, fetchedAt: 999 };
    const state = servicesReducer(stateWithServices, {
      type: deleteService.fulfilled.type,
      payload,
    });

    expect(state.items).toEqual([service2]);
    expect(state.status).toBe("succeeded");
  });

  describe("async thunks", () => {
    it("should skip fetchServices if cache is valid", async () => {
      const recentTime = Date.now();
      store.dispatch({
        type: fetchServices.fulfilled.type,
        payload: { data: [], fetchedAt: recentTime },
      });

      const thunk = fetchServices({ force: false });
      const dispatch = jest.fn();
      const getState = () => ({
        services: {
          ...initialState,
          lastFetchedAt: recentTime,
        },
      });

      const result = await thunk(dispatch, getState, { signal: undefined });
      expect(result.payload.skip).toBe(true);
    });

    it("should fetch services when cache is stale", async () => {
      const oldTime = Date.now() - 10 * 60 * 1000; // 10 minutes ago
      const mockResponse = {
        data: {
          data: [{ id: 1, name: "Service 1" }],
        },
      };
      mockApi.get.mockResolvedValue(mockResponse);

      const thunk = fetchServices({ force: false });
      const dispatch = jest.fn();
      const getState = () => ({
        services: {
          ...initialState,
          lastFetchedAt: oldTime,
        },
      });

      const result = await thunk(dispatch, getState, { signal: undefined });
      expect(mockApi.get).toHaveBeenCalledWith("/api/landing/services", {
        signal: undefined,
      });
      expect(result.payload.data).toEqual(mockResponse.data.data);
    });

    it("should handle API errors in fetchServices", async () => {
      const mockError = { message: "Network error", status: 500 };
      mockApi.get.mockRejectedValue(mockError);

      const thunk = fetchServices({ force: true });
      const dispatch = jest.fn();
      const getState = () => ({ services: initialState });

      const result = await thunk(dispatch, getState, { signal: undefined });
      expect(result.type).toBe("services/fetchServices/rejected");
      expect(result.payload).toEqual(mockError);
    });

    it("should handle abort signal in fetchServices", async () => {
      const abortError = new Error("Request aborted");
      abortError.name = "AbortError";
      mockApi.get.mockRejectedValue(abortError);

      const controller = new AbortController();
      controller.abort();

      const thunk = fetchServices({ force: true });
      const dispatch = jest.fn();
      const getState = () => ({ services: initialState });

      const result = await thunk(dispatch, getState, {
        signal: controller.signal,
      });
      expect(result.type).toBe("services/fetchServices/rejected");
      expect(result.payload.name).toBe("AbortError");
    });

    it("should create service with authentication", async () => {
      const newServiceData = {
        name: "New Service",
        description: "Test description",
      };
      const mockResponse = { data: { data: { id: 1, ...newServiceData } } };
      mockApi.post.mockResolvedValue(mockResponse);

      const result = await store.dispatch(
        createService({ payload: newServiceData })
      );

      expect(mockApi.post).toHaveBeenCalledWith(
        "/api/landing/services",
        newServiceData,
        {
          headers: { Authorization: "Bearer mock-token" },
          signal: undefined,
        }
      );
      expect(result.type).toBe("services/createService/fulfilled");
    });
  });
});
