import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

// ✅ Auth APIs
export const loginUser = async (data) => {
  return axios.post(`${API_BASE_URL}/auth/login`, data);
};

export const signupUser = async (data) => {
  return axios.post(`${API_BASE_URL}/auth/signup`, data);
};

// ✅ File Upload
export const uploadFile = async (formData) => {
  return axios.post(`${API_BASE_URL}/file/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// ✅ Summary
export const generateSummary = async (text) => {
  return axios.post(`${API_BASE_URL}/summary`, { text });
};

// ✅ Quiz
export const generateQuiz = async (text) => {
  return axios.post(`${API_BASE_URL}/quiz`, { text });
};
