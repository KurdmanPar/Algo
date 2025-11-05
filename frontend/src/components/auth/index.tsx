// frontend/src/components/auth/index.tsx

// --- تعریف انواع ---
// این نوع برای داده‌های ورودی فرم‌های احراز هویت است.
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

// --- صادرات کامپوننت‌های احراز هویت ---
// کامپوننت فرم لاگین
export { default as LoginForm } from './LoginForm';

// کامپوننت فرم ثبت‌نام
export { default as RegisterForm } from './RegisterForm';

// کامپوننت محافظت‌کننده مسیر
export { default as AuthGuard } from './AuthGuard';