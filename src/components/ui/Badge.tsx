interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10',
    accent: 'bg-brand-blue/10 dark:bg-brand-electric/10 text-brand-blue dark:text-brand-electric border-brand-blue/20 dark:border-brand-electric/20',
    outline: 'bg-transparent text-gray-600 dark:text-gray-400 border-gray-300 dark:border-white/20',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
