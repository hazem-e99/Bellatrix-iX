// src/features/solutions/solutionsAPI.js
const API_BASE_URL = "http://localhost:5005/api/solutions";

const getAuthHeaders = () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${localStorage.getItem('token')}`); // Better to get from storage
  return headers;
};

const commonFetchOptions = {
  method: "GET",
  headers: getAuthHeaders(),
  redirect: "follow"
};

export const fetchSolutions = async (page = 1, limit = 10) => {
  const response = await fetch(`${API_BASE_URL}?page=${page}&limit=${limit}`, commonFetchOptions);
  if (!response.ok) {
    throw new Error("Failed to fetch solutions");
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const fetchSolutionById = async (solutionId) => {
  const response = await fetch(`${API_BASE_URL}/${solutionId}`, commonFetchOptions);
  if (!response.ok) {
    throw new Error(`Failed to fetch solution ${solutionId}`);
  }
  return await response.json();
};

export const fetchHrSolution = async () => {
  const response = await fetch(`${API_BASE_URL}/hr-management`, commonFetchOptions);
  if (!response.ok) {
    throw new Error("Failed to fetch HR solution data");
  }
  return await response.json();
};

export const fetchPayrollSolution = async () => {
  const response = await fetch(`${API_BASE_URL}/payroll-system`, commonFetchOptions);
  if (!response.ok) {
    throw new Error("Failed to fetch payroll solution data");
  }
  return await response.json();
};