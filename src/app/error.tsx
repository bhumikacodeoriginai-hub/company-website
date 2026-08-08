'use client';

import { Container, Button } from '@/components/ui';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <Container className="text-center">
        <div className="text-[clamp(4rem,10vw,8rem)] font-bold leading-none bg-gradient-to-r from-brand-blue to-brand-electric bg-clip-text text-transparent mb-4">500</div>
        <h1 className="text-h3 font-bold text-gray-900 dark:text-white mb-4">Something Went Wrong</h1>
        <p className="text-body text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">We are unable to load this page right now. Our engineering team has been notified. Please try again in a few moments.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button onClick={() => reset()}>Retry</Button>
          <Button href="/" variant="secondary">Back to Homepage</Button>
        </div>
      </Container>
    </section>
  );
}
