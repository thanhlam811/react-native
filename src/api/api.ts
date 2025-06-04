import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);



// Helper xử lý response có cấu trúc lồng
const extractData = (res: any) => res.data?.data?.data || [];

export const bookApi = {
  getAll: async (page = 1) => extractData(await api.get(`/books?page=${page}`)),
  getOne: async (id: number) => (await api.get(`/books/${id}`)).data.data,
  create: async (data: any) => (await api.post(`/books`, data)).data,
  update: async (data: any) => (await api.put(`/books`, data)).data,
  delete: async (id: number) => (await api.delete(`/books/${id}`)).data,

  // Hàm search sách theo tiêu đề
search: async (keyword: string) => {
    const res = await api.get(`/books?filter=title~'${keyword}'`);
    const rawBooks = extractData(res);

    // map lại để phù hợp với các trường bạn dùng trong UI
    const books = rawBooks.map((book: any) => ({
      id: book.bookId,
      title: book.title,
      price: book.sellingPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), // format tiền
      rating: book.avgRate.toFixed(1),
      sold: Math.floor(Math.random() * 100), // giả lập số sách đã bán (API chưa có trường sold)
      image: book.listOfImage.length > 0 ? book.listOfImage[0].path : 'https://via.placeholder.com/150', // lấy ảnh đầu hoặc ảnh mặc định
    }));

    return books;
  },
    filterBooks: async (filters: string) => {
    // ví dụ filter chuỗi query: 'price>100000;rating>4'
    const res = await api.get(`/books?filter=${encodeURIComponent(filters)}`);
    return extractData(res);
  },
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
export const getOrderDetailsByOrderId = async (orderId: number) => {
  try {
    const url = `http://10.0.2.2:8080/api/order-details?filter=order.orderId:${orderId}`;
    const res = await axios.get(url);
    const details = res.data.data.data; // tùy API trả về
    console.log(details);
    
    return details;
  } catch (error) {
    console.error('Lỗi lấy chi tiết đơn hàng:', error);
    return [];
  }
};

export const getOrderbyUserId = async (userId: number) => {
  try {
    const res = await axios.get(
      `http://10.0.2.2:8080/api/orders?filter=user:${userId}&filter=status:'PENDING'`
    );
    const Orderlist = res.data.data.data;

    // Lấy chi tiết từng đơn hàng
    const detailedOrders = await Promise.all(
      Orderlist.map(async (order: any) => {
        const details = await getOrderDetailsByOrderId(order.orderId);
        return {
          ...order,
          details,
        };
      })
    );

    return detailedOrders;
  } catch (error) {
    console.error('Lỗi lấy dữ liệu orderlist:', error);
    return [];
  }
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
  // <--- data nằm trong res.data.data.data
  create: async (data: any) => (await api.post(`/favorites`, data)).data,
  update: async (data: any) => (await api.put(`/favorites`, data)).data,
  delete: async (id: number) => (await api.delete(`/favorites/${id}`)).data,
};

export const getFavouritebyUserId = async (userId: number) => {
  try {
    const res = await axios.get(`http://10.0.2.2:8080/api/favorites?filter=user:${userId}`);
    const favoriteList = res.data.data.data; 
    console.log("favoriteList ne",favoriteList);
    // <--- data thực nằm ở đây
    return favoriteList;
  } catch (error) {
    console.error('Lỗi lấy dữ liệu favorites:', error);
    return [];
  }
};
export const removeFavorite = async (favoriteId: number) => {
  try {
    const res = await axios.delete(`http://10.0.2.2:8080/api/favorites/${favoriteId}`);
    console.log('Xóa favorite thành công:', favoriteId);
    return true;
  } catch (error) {
    console.error('Lỗi khi xóa favorite:', error);
    return false;
  }
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
      const data = response.data?.data;

      if (!token) throw new Error('Token not found in response');

      return data;  // trả về đúng chuỗi token
    } catch (error) {
      throw error;
    }
  },
 logout: async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('No token found');

  return api1.post(
    'auth/sign-out',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
getAccount: async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No token found');
    console.log('📌 Token:', token);

    const response = await api1.get('/auth/get-account', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json', // thêm nếu server yêu cầu JSON
      },
    });

    console.log('✅ Account data:', response.data);
    return response.data.data;

  } catch (error: any) {
    if (error.response) {
      console.log('❌ Server responded with error:', error.response.data);
    } else if (error.request) {
      console.log('❌ No response received:', error.request);
    } else {
      console.log('❌ Error setting up request:', error.message);
    }
    throw error; // vẫn throw để component xử lý Alert hoặc logic khác
  }
},
forgotPassword: async (email: string) => {
  const response = await api1.post('/auth/forgot-passwd', null, {
    params: { email },
  });
  return response.data;
},
// Helper xử lý response có cấu trúc lồn
}

const get = async (url: string) => {
  try {
    const response = await axios.get(url);
    console.log('✅ Response data:', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log('❌ Server responded with error:', error.response.data);
    } else if (error.request) {
      console.log('❌ No response received:', error.request);
    } else {
      console.log('❌ Error setting up request:', error.message);
    }
    throw error;
  }
};


const post = async (url: string, data: any) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Lấy token từ storage
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('✅ Add to cart success:', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log('❌ Add to cart error:', error.response.data);
    } else {
      console.log('❌ Add to cart request failed:', error.message);
    }
    throw error;
  }
};

export const cartDetailsApi = {
  getByUserId: async (userId: number) => {
    const res = await get(`http://10.0.2.2:8080/api/cart-details?filter=cart:${userId}`);
    // res.data là phần meta và data theo response của bạn
    return res.data.data;  // Trả về đúng mảng cart details
  },
   addToCart: async (bookId: number, quantity: number) => {
    return await post('http://10.0.2.2:8080/api/add-to-cart', { bookId, quantity });
  },
 getVoucherbyUserId: async (userId: number) => {
  const res = await get(`http://10.0.2.2:8080/api/user-voucher?filter=user:${userId}`);
  
  console.log("data voucher",res.data.data[0])
 const userVoucherList = res.data.data; // Mảng các UserVoucher

  userVoucherList.forEach((item:any) => {
    const voucher = item.voucher;
    const used = item.used
    console.log(voucher);        
    console.log(used);        

  }); 
  return res.data.data; // <--- data nằm trong res.data.data.data
},
};
