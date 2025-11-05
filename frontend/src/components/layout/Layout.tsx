// frontend/src/components/layout/Layout.tsx
'use client';

import { ReactNode } from 'react';
import { Topbar } from './Topbar'; // کامپوننت نوار بالایی
import { Sidebar } from './Sidebar'; // کامپوننت نوار کناری
import { Providers } from '../Providers'; // برای Redux و Theme

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex h-screen">
        {/* نوار کناری ثابت */}
        <Topbar />

        {/* نوار کناری کناری و محتوای اصلی */}
        <div className="flex flex-1 overflow-hidden">
          {/* نوار کناری متحرک (با منوی) */}
          <Sidebar />

          {/* محتوای صفحه */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;