// frontend/src/app/dashboard/page.tsx
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Layout } from '../../components/Layout';

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    // <ProtectedRoute>  <-- این کامپوننت را حذف کردیم
    // </ProtectedRoute>
    <>
      <Head>
        <title>داشبورد | سیستم معاملاتی الگوریتمی</title>
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  خوش آمدید، {user?.username}!
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  این یک منطقه محافظت‌شده است. فقط کاربران لاگین کرده می‌توانند این صفحه را ببینند.
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                  ایمیل شما: {user?.email}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardPage;