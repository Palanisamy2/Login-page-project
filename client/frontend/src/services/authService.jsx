import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api'; // Backend URL

export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/login`, credentials);
  console.log(response);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/signup`, userData);
  console.log(response);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/change-password`, data);
  console.log(response);
  return response.data;
};
