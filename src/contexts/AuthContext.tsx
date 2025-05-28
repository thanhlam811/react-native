import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../api/api'


// Định nghĩa interface cho context
interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Tạo context, khởi tạo undefined để buộc phải dùng trong Provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider chứa logic xác thực
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra token có trong AsyncStorage hay không khi app load
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error('Failed to load token from storage', error);
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  // Hàm login: lưu token vào AsyncStorage, bật cờ isLoggedIn
  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Failed to save token', error);
      throw error;
    }
  };

  // Hàm logout: xóa token, tắt cờ isLoggedIn
  const logout = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    // Gọi API sign-out nếu token còn
    if (token) {
      await authApi.logout(); // logout đã cấu hình truyền token bằng headers rồi
    }

    // Xóa token ở client
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
  } catch (error) {
    console.error('Logout failed', error);
    throw error;
  }
};

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook custom để sử dụng AuthContext dễ dàng hơn
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
