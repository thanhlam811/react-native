import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}` nếu có xác thực
  },
});

const BASE_URL_1 = 'http://10.0.2.2:8080/';

const api1 = axios.create({
  baseURL: BASE_URL_1,
  headers: {
    'Content-Type': 'application/json',
  },
});

const BASE_URL_2 = 'http://10.0.2.2:8080/';

const api2 = axios.create({
  
  baseURL: BASE_URL_2,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}`,
  },
});



// Helper xử lý response có cấu trúc lồng
const extractData = (res: any) => res.data?.data?.data || [];

export const bookApi = {
  getAll: async (page = 1) => extractData(await api.get(`/books?page=${page}`)),
  getOne: async (id: number) => (await api.get(`/books/${id}`)).data.data,
  create: async (data: any) => (await api.post(`/books`, data)).data,
  update: async (data: any) => (await api.put(`/books`, data)).data,
  delete: async (id: number) => (await api.delete(`/books/${id}`)).data,
};

export const userApi = {
  getAll: async (page = 1, size = 5) =>
    extractData(await api.get(`/users?page=${page}&size=${size}`)),
  getOne: async (id: number) => (await api.get(`/users/${id}`)).data.data,
  create: async (data: any) => (await api.post(`/users`, data)).data,
  update: async (data: any) => (await api.put(`/users`, data)).data,
  delete: async (id: number) => (await api.delete(`/users/${id}`)).data,
};

export const deliveryApi = {
  getAll: async (page = 1) => extractData(await api.get(`/deliveries?page=${page}`)),
  getOne: async (id: number) => (await api.get(`/deliveries/${id}`)).data.data,
  create: async (data: any) => (await api.post(`/deliveries`, data)).data,
  update: async (data: any) => (await api.put(`/deliveries`, data)).data,
  delete: async (id: number) => (await api.delete(`/deliveries/${id}`)).data,
};

export const feedbackApi = {
  getAll: async (page = 1) => extractData(await api.get(`/feedbacks?page=${page}`)),
  getOne: async (id: number) => (await api.get(`/feedbacks/${id}`)).data.data,
  create: async (data: any) => (await api.post(`/feedbacks`, data)).data,
  update: async (data: any) => (await api.put(`/feedbacks`, data)).data,
  delete: async (id: number) => (await api.delete(`/feedbacks/${id}`)).data,
};

export const favoriteApi = {
  getAll: async (page = 1) => extractData(await api.get(`/favorites?page=${page}`)),
  getOne: async (id: number) => (await api.get(`/favorites/${id}`)).data.data,
  create: async (data: any) => (await api.post(`/favorites`, data)).data,
  update: async (data: any) => (await api.put(`/favorites`, data)).data,
  delete: async (id: number) => (await api.delete(`/favorites/${id}`)).data,
};

export const genreApi = {
  getAll: async (page = 1) => extractData(await api.get(`/genres?page=${page}`)),
  getOne: async (id: number) => (await api.get(`/genres/${id}`)).data.data,
  create: async (data: any) => (await api.post(`/genres`, data)).data,
  update: async (data: any) => (await api.put(`/genres`, data)).data,
  delete: async (id: number) => (await api.delete(`/genres/${id}`)).data,
};
export const authApi = {
  login: async (username: string, password: string) => {
    try {
      const response = await api1.post('/auth/sign-in', { username, password });
      console.log('🔐 Login response:', response.data);
      
      const token = response.data?.data?.access_token;
      if (!token) throw new Error('Token not found in response');

      return token;  // trả về đúng chuỗi token
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    return api2.post('/sign-out');
  },
register: async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber: string,
  roleId: number,
  username:string
) => {
  try {
    const response = await api1.post('/auth/register', {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role: { roleId }, 
      username// 👈 gửi object role như backend mong đợi
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
},



};
