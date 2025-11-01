// frontend/src/services/api.ts

import axios from 'axios';
import { LoginCredentials, RegisterCredentials, User } from '../types';

// آدرس بک‌اند را از متغیرهای محیطی می‌خوانیم
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// ایجاد یک نمونه از Axios با تنظیمات اولیه
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: اضافه کردن توکن به هدر درخواست‌ها
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: مدیریت خطای 401 و تمدید خودکار توکن
apiClient.interceptors.response.use(
  (response) => response, // اگر پاسخ موفق بود، همان را برگردان
  async (error) => {
    const originalRequest = error.config;

    // اگر خطا 401 بود و درخواست قبلاً تکرار نشده بود
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // جلوگیری از تکرار بی‌نهایت
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          // درخواست برای گرفتن توکن جدید
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.access;
          localStorage.setItem('access_token', newAccessToken);

          // تلاش مجدد برای درخواست اصلی با توکن جدید
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // اگر رفرش توکن هم منقضی شده بود، کاربر را به صفحه لاگین بفرست
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

// توابع مربوط به احراز هویت
export const authAPI = {
  login: (credentials: LoginCredentials) =>
    apiClient.post('/users/login/', credentials),

  register: (credentials: RegisterCredentials) =>
    apiClient.post('/users/signup/', credentials),

  logout: (refresh: string) =>
    apiClient.post('/users/logout/', { refresh }),

  getMe: (): Promise<{ data: User }> =>
    apiClient.get('/users/me/'),
};