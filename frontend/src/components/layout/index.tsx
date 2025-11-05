// frontend/src/components/layout/index.tsx

// --- تعریف انواع ---
// این نوع برای کامپوننت‌های Layout استفاده می‌شود.
export interface LayoutProps {
  children: React.ReactNode;
}

// --- صادرات کامپوننت‌های Layout ---
// کامپوننت اصلی Layout که شامل Topbar و Sidebar است
export { default as Layout } from './Layout';

// در آینده، ممکن است Layoutهای مختلفی داشته باشید
// export { default as AuthLayout } from './AuthLayout';
// export { default as DashboardLayout } from './DashboardLayout';