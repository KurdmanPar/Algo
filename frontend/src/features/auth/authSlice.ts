// frontend/src/features/auth/authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api';
import { AuthState, User, LoginCredentials, RegisterCredentials } from '../../types';

// وضعیت اولیه احراز هویت
const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// تابع асینک برای لاگین
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Login failed');
    }
  }
);

// تابع اسینک برای ثبت‌نام
export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(credentials);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

// تابع اسینک برای خروج
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { getState }) => {
    const state = getState() as { auth: AuthState };
    const refreshToken = state.auth.refreshToken;
    if (refreshToken) {
      await authAPI.logout(refreshToken);
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // برای چک کردن توکن در زمان لود اولیه اپلیکیشن
    setCredentials: (state, action: PayloadAction<{ user: User; access: string; refresh: string }>) => {
      const { user, access, refresh } = action.payload;
      state.user = user;
      state.token = access;
      state.refreshToken = refresh;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.status = 'idle';
      });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;