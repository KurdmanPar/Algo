// frontend/src/pages/_app.tsx

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store'; // ما این فایل را بعداً می‌سازیم
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css'; // وارد کردن فایل CSS اصلی

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;