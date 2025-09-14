import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch all industries
export const fetchIndustries = createAsyncThunk(
  "industries/fetchIndustries",
  async (_, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch("http://localhost:5005/api/industries?page=1&limit=10/", requestOptions);
      const data = await response.json();
      console.log("Industries API result:", data);
      if (!data.success) {
        return rejectWithValue(data);
      }
      return data.data;
    } catch (error) {
      console.error("Industries API error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const industriesSlice = createSlice({
  name: "industries",
  initialState: {
    industries: [],
    industryLinks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndustries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndustries.fulfilled, (state, action) => {
        state.loading = false;
        state.industries = action.payload;
        state.industryLinks = (action.payload || []).filter(ind => ind.slug && ind.name).map(ind => ({
          slug: ind.slug,
          name: ind.name
        }));
      })
      .addCase(fetchIndustries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectIndustryLinks = (state) => state.industries.industryLinks;

export default industriesSlice.reducer;
