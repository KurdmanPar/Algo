'use client';

import Head from 'next/head';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import AuthGuard from '../../components/AuthGuard';

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const renderUsername = () => {
    if (!user || typeof user !== 'object') {
      return 'کاربر';
    }
    return typeof user.username === 'string' ? user.username : JSON.stringify(user.username);
  };

  return (
    <AuthGuard>
      <Head>
        <title>داشبورد | سیستم معاملاتی الگوریتمی</title>
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  خوش آمدید، {renderUsername()}!
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  این یک منطقه محافظت‌شده است. فقط کاربران لاگین کرده می‌توانند این صفحه را ببینند.
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                  ایمیل شما: {user?.email || 'در دسترس نیست'}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
};

export default DashboardPage;