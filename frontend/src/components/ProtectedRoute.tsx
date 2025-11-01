// frontend/src/components/ProtectedRoute.tsx
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RootState } from '../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // اگر کاربر احراز هویت نشده بود، او را به صفحه لاگین بفرست
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // تا زمانی که وضعیت کاربر مشخص نشده، چیزی نمایش نده
  if (!isAuthenticated) {
    return null;
  }

  // اگر کاربر احراز هویت شده بود، کامپوننت‌های فرزند را نمایش بده
  return <>{children}</>;
};

export default ProtectedRoute;