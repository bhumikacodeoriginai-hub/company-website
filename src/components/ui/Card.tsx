import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
}

export function Card({ children, className = '', href, hover = true }: CardProps) {
  const classes = `card-base p-6 lg:p-8 ${hover ? 'card-hover' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${classes}`}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  as?: 'h3' | 'h4';
  className?: string;
}

export function CardTitle({ children, as: Tag = 'h3', className = '' }: CardTitleProps) {
  return (
    <Tag className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}>
      {children}
    </Tag>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}
