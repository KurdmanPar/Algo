// frontend/src/components/layout/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  { name: 'داشبورد', href: '/dashboard', icon: '🏠' },
  { name: 'استراتژی‌ها', href: '/strategies', icon: '📊' },
  { name: 'بک‌تست', href: '/backtesting', icon: '📈' },
  { name: 'معاملات زنده', href: '/live-trading', icon: '🤖' },
  { '---' },
  { name: 'بازار داده‌ها', href: '/market-data', icon: '📊' },
  { name: 'لیست نظارت', href: '/watchlist', icon: '🌟' },
  { name: 'نمودارها', href: '/charts', icon: '📈' },
  { name: 'اخبار بازار', href: '/news', icon: '📰' },
  { name: 'تقویم اقتصادی', href: '/calendar', icon: '📅' },
  { name: 'گدپورت و تحلیل', href: '/reports', icon: '📊' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`bg-gray-800 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`} flex-shrink-0`}>
      <div className="flex flex flex-col h-full">
        {/* منوی اصلی */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;