// frontend/src/components/Providers.tsx
'use client'; // این کامپوننت باید سمت کلاینت رندر شود

import { Provider } from 'react-redux';
import { store } from '../store'; // مسیر صحیح از components به store
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </Provider>
  );
}