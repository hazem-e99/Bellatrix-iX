// src/features/solutions/solutionsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchSolutions,
  fetchSolutionById,
  fetchHrSolution,
  fetchPayrollSolution
} from './solutionsAPI';

const initialState = {
  solutionLinks: [],
  solutions: [],
  currentSolution: null,
  totalPages: 1,
  currentPage: 1,
  totalItems: 0,
  hrSolution: null,
  payrollSolution: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// Thunk for fetching all solutions from the API using response.solutions
export const fetchAllSolutions = createAsyncThunk(
  'solutions/fetchAllSolutions',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      if (token) {
        myHeaders.append('Authorization', `Bearer ${token}`);
      }
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      console.log("JWT Token:", token);
      const response = await fetch('http://localhost:5005/api/solutions?page=1&limit=10', requestOptions);
      console.log("Status:", response.status);
      const raw = await response.clone().text();
      if (!response.ok) {
        throw new Error('Failed to fetch solutions');
      }
      const data = await response.json();
      return {
        solutions: data.services || [], // <-- use 'services' from backend
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || 1,
        totalItems: data.totalServices || (data.services ? data.services.length : 0)
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for fetching a specific solution by ID
export const fetchSolution = createAsyncThunk(
  'solutions/fetchSolution',
  async (solutionId) => {
    return await fetchSolutionById(solutionId);
  }
);

// Thunk for HR solution data
export const getHrSolution = createAsyncThunk(
  'solutions/getHrSolution',
  async () => {
    const response = await fetchHrSolution();
    return response.solutions;
  }
);

// Thunk for payroll solution data
export const getPayrollSolution = createAsyncThunk(
  'solutions/getPayrollSolution',
  async () => {
    const response = await fetchPayrollSolution();
    return response.solutions;
  }
);

const solutionsSlice = createSlice({
  name: 'solutions',
  initialState,
  reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers(builder) {
    builder
      // All solutions
      .addCase(fetchAllSolutions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSolutions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.solutions = action.payload.solutions;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalItems = action.payload.totalItems;
        // Process solutionLinks for dropdowns/links
        state.solutionLinks = (action.payload.solutions || []).map(sol => ({
          slug: sol.slug,
          name: sol.name
        }));
      })
      .addCase(fetchAllSolutions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Single solution
      .addCase(fetchSolution.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSolution.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentSolution = action.payload;
      })
      .addCase(fetchSolution.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // HR Solution
      .addCase(getHrSolution.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHrSolution.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hrSolution = action.payload;
      })
      .addCase(getHrSolution.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Payroll Solution
      .addCase(getPayrollSolution.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPayrollSolution.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.payrollSolution = action.payload;
      })
      .addCase(getPayrollSolution.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const selectAllSolutions = (state) => state.solutions.solutions;
export const selectSolutionLinks = (state) => state.solutions.solutionLinks;
export const selectCurrentSolution = (state) => state.solutions.currentSolution;
export const selectHrSolution = (state) => state.solutions.hrSolution;
export const selectPayrollSolution = (state) => state.solutions.payrollSolution;
export const selectSolutionsStatus = (state) => state.solutions.status;
export const selectSolutionsError = (state) => state.solutions.error;

export default solutionsSlice.reducer;