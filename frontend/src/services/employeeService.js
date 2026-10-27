import axios from 'axios';

// Gán trực tiếp URL Backend trên Render vào đây
const API_URL = 'https://api-223342.onrender.com/api/employees';

export const getEmployees = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
        throw error;
    }
};

export const createEmployee = async (employeeData) => {
    try {
        const response = await axios.post(API_URL, employeeData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm nhân viên:", error);
        throw error;
    }
};

export const updateEmployee = async (id, employeeData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, employeeData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật nhân viên:", error);
        throw error;
    }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa nhân viên:", error);
        throw error;
    }
};