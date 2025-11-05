// frontend/src/app/page.tsx
import Link from 'next/link';
import { Layout } from '../components/Layout';


export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">به سیستم معاملاتی الگوریتمی خوش آمدید</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          لطفاً وارد حساب کاربری خود شوید یا یک حساب جدید بسازید.
        </p>
        <div className="mt-6 space-x-4 space-x-reverse">
          <Link href="/login" className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700">
            ورود
          </Link>
          <Link href="/register" className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700">
            ثبت‌نام
          </Link>
        </div>
      </div>
    </div>
  );
}