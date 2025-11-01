// frontend/src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading, ...props }) => {
  const baseClasses = "flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 focus:ring-primary-500",
    secondary: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} disabled:opacity-50`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;