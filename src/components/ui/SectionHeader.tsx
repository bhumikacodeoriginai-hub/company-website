interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, centered = true, className = '' }: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center max-w-3xl mx-auto' : ''} mb-12 lg:mb-16 ${className}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-blue dark:text-brand-electric mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-h2 font-bold text-gray-900 dark:text-white text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-body-lg text-gray-600 dark:text-gray-400 text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
