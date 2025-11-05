// frontend/src/components/layout/Topbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '../ui/Button';

const Topbar = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    // منطق خروج در اینجا قرار می‌گیرد
    console.log('Logout clicked');
    // dispatch(logoutUser()).then(() => router.push('/login'));
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* می‌توانید لوگو را اینجا قرار دهید */}
            <Link href="/dashboard">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">AlgoTrading</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* دکمه تغییر تم */}
            <Button variant="secondary" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {mounted && (theme === 'dark' ? '☀️' : '🌙')}
            </Button>

            {/* محتوای شرطی بر اساس وضعیت احراز هویت */}
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  خوش آمدی، {user?.username}
                </span>
                <Link href="/dashboard"><a className="text-sm font-medium text-primary-600 hover:text-primary-500">داشبورد</a></Link>
                <Button onClick={handleLogout}>خروج</Button>
              </>
            ) : (
              <>
                <Link href="/login"><a className="text-sm font-medium text-primary-600 hover:text-primary-500">ورود</a></Link>
                <Link href="/register"><a className="text-sm font-medium text-primary-600 hover:text-primary-500">ثبت‌نام</a></Link>
              </>
            )}
          </div>
        </div>
      </header>
    </header>
  );
};

export default Topbar;