import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../api/api';

// Định nghĩa interface cho context
interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  userId: number | null;
  login: (token: string, userId: number) => Promise<void>;
  logout: () => Promise<void>;
}

// Tạo context, khởi tạo undefined để buộc phải dùng trong Provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider chứa logic xác thực
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  // Kiểm tra token có trong AsyncStorage hay không khi app load
   useEffect(() => {
    const checkLogin = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedToken && storedUserId) {
          setToken(storedToken);
          setUserId(Number(storedUserId)); // nhớ convert về number
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setToken(null);
          setUserId(null);
        }
      } catch (error) {
        console.error('Failed to load auth data from storage', error);
        setIsLoggedIn(false);
        setToken(null);
        setUserId(null);
      }
    };
    checkLogin();
  }, []);

  // Hàm login: lưu token vào AsyncStorage, bật cờ isLoggedIn
   const login = async (newToken: string, newUserId: number) => {
    try {
      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('userId', newUserId.toString()); // lưu dưới dạng string
      setToken(newToken);
      setUserId(newUserId);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Failed to save auth data', error);
      throw error;
    }
  };

  // Hàm logout: gọi api logout rồi xóa token, tắt cờ isLoggedIn
  const logout = async () => {
    try {
      if (token) {
        await authApi.logout();
      }
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      setToken(null);
      setUserId(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userId, login, logout }}>
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
