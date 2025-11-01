// frontend/src/app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // در آینده می‌توانیم یک هدر یا فوتر خاص برای صفحات لاگین اینجا قرار دهیم
    <>{children}</>
  );
}