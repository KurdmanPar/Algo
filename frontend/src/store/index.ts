// frontend/src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // ما این فایل را در گام بعدی می‌سازیم

export const store = configureStore({
  reducer: {
    // در اینجا تمام reducer‌های برنامه را اضافه می‌کنیم
    auth: authReducer,
  },
  // این تایپ‌ها برای استفاده صحیح از Redux با TypeScript ضروری هستند
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;