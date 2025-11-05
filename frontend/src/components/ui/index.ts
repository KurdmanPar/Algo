// frontend/src/components/ui/index.tsx

// --- تعریف انواع (Type Definitions) ---
// این نوع‌ها برای اعتبارسنجی فرم‌ها با React Hook Form استفاده می‌شوند.
export interface FormFieldProps {
  label?: string;
  error?: string;
  type?: React.HTMLInputProps;
}

// --- صادرات کامپوننت‌های UI ---
// کامپوننت دکمه
export { default as Button } from './Button';

// کامپوننت ورودی
export { default as Input } from './Input';

// در آینده، کامپوننت‌های جدید را اینجا اضافه خواهیم کرد
// export { default as Modal } from './Modal';
// export { default as Table } from './Table';
// export { default as Card } from './Card';