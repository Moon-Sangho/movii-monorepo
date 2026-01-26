import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

const Button = ({ children, className, variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'rounded-lg px-4 py-2 font-medium transition-colors',
        variant === 'primary' && 'bg-(--color-primary10) text-white hover:opacity-90',
        variant === 'secondary' && 'bg-gray-700 text-white hover:bg-gray-600',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
