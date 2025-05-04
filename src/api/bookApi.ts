import axios from 'axios';

// Sửa lại IP nếu dùng thật
const BASE_URL = 'http://10.0.2.2:8080/api';

export const getBooks = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/books?page=${page}`);
    return response.data.data.data; // truy cập vào `data.data`
  } catch (error) {
    console.error('API error:', error);
    return [];
  }
};
