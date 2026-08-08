'use client';

import Link from 'next/link';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
}

const variants = {
  primary:
    'bg-brand-blue text-white border-transparent hover:bg-blue-700 dark:bg-brand-electric dark:hover:bg-sky-400 dark:text-navy',
  secondary:
    'bg-transparent text-gray-700 dark:text-gray-200 border-gray-300 dark:border-white/20 hover:border-brand-blue hover:text-brand-blue dark:hover:border-brand-electric dark:hover:text-brand-electric',
  ghost:
    'bg-transparent text-brand-blue dark:text-brand-electric border-transparent hover:bg-gray-100 dark:hover:bg-white/5',
};

const sizes = {
  sm: 'px-4 py-2 text-sm min-h-[36px]',
  md: 'px-6 py-3 text-sm min-h-[44px]',
  lg: 'px-8 py-4 text-base min-h-[52px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, children, className = '', disabled, ...props }, ref) => {
    const classes = `inline-flex items-center justify-center gap-2 font-medium rounded-button border transition-all duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
