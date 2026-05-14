import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/auth';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.access_token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (email, password, fullName, role) => {
  const response = await axios.post(`${API_URL}/register`, {
    email,
    password,
    full_name: fullName,
    role
  });
  if (response.data.access_token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
  login,
  register,
  logout,
  getCurrentUser
};

export default AuthService;
