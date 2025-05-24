import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}` nếu có xác thực
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
