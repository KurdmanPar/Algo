// frontend/src/app/(auth)/login/page.tsx
import Head from 'next/head';
import Link from 'next/link';
import LoginForm from '../../../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>ورود | سیستم معاملاتی الگوریتمی</title>
        <meta name="description" content="صفحه ورود به سیستم معاملاتی الگوریتمی" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              ورود به حساب کاربری
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              یا{' '}
              <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                یک حساب کاربری جدید بسازید
              </Link>
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}