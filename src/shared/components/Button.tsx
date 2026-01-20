import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles: 모던하고 시크한 느낌을 위해 둥근 모서리를 최소화(rounded-sm)
          "inline-flex items-center justify-center rounded-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          
          // Variants
          variant === 'primary' && "bg-gray-900 text-white hover:bg-gray-800 shadow-sm",
          variant === 'secondary' && "bg-gray-100 text-gray-900 hover:bg-gray-200",
          variant === 'outline' && "border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-900",
          variant === 'ghost' && "hover:bg-gray-100 text-gray-900",
          
          // Sizes
          size === 'sm' && "h-9 px-4 text-xs",
          size === 'md' && "h-12 px-8 text-sm", // Hero 섹션에 어울리는 넉넉한 크기
          size === 'lg' && "h-14 px-10 text-base",
          
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
