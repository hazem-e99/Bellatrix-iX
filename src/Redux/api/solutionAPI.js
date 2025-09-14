// src/features/services/servicesAPI.js
const API_BASE_URL = "http://localhost:5005/api/services";

export const fetchSolution = async () => {
  const response = await fetch(`${API_BASE_URL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }
  return await response.json();
};

export const fetchSolutionById = async (serviceId) => {
  const response = await fetch(`${API_BASE_URL}/${serviceId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch service ${serviceId}`);
  }
  return await response.json();
};

export const fetchHrManagement = async () => {
  const response = await fetch(`${API_BASE_URL}/hr-management`);
  if (!response.ok) {
    throw new Error("Failed to fetch HR management data");
  }
  return await response.json();
};

export const fetchPayrollSystem = async () => {
  const response = await fetch(`${API_BASE_URL}/payroll-system`);
  if (!response.ok) {
    throw new Error("Failed to fetch payroll system data");
  }
  return await response.json();
};
