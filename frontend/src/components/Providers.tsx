// frontend/src/components/Providers.tsx
'use client'; // این کامپوننت باید سمت کلاینت رندر شود

import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </Provider>
  );
}