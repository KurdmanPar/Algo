// frontend/src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../styles/globals.css'; // مسیر صحیح از src/app به styles
import { Providers } from '../components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'سیستم معاملاتی الگوریتمی',
  description: 'یک سیستم حرفه‌ای برای معاملات الگوریتمی',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}