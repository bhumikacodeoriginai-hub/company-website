export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-200 dark:border-white/10 border-t-brand-blue dark:border-t-brand-electric rounded-full animate-spin" role="status" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
