interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
  narrow?: boolean;
}

export function Container({ children, className = '', wide, narrow }: ContainerProps) {
  const maxWidth = narrow
    ? 'max-w-[768px]'
    : wide
    ? 'max-w-[1440px]'
    : 'max-w-[1280px]';

  return (
    <div className={`${maxWidth} mx-auto px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
