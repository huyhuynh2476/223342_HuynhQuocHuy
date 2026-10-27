import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getEmployees = async (search = '') => {
  const response = await axios.get(`${API_URL}/employees`, {
    params: { search }
  });
  return response.data;
};

export const createEmployee = async (employeeData) => {
  const response = await axios.post(`${API_URL}/employees`, employeeData);
  return response.data;
};

export const updateEmployee = async (id, employeeData) => {
  const response = await axios.put(`${API_URL}/employees/${id}`, employeeData);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_URL}/employees/${id}`);
  return response.data;
};