import { Container, Button } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <Container className="text-center">
        <div className="text-[clamp(4rem,10vw,8rem)] font-bold leading-none bg-gradient-to-r from-brand-blue to-brand-electric bg-clip-text text-transparent mb-4">404</div>
        <h1 className="text-h3 font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
        <p className="text-body text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">The page you are looking for does not exist or has been moved. Please check the URL or navigate back to our homepage.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button href="/">Back to Homepage</Button>
          <Button href="/contact" variant="secondary">Contact Us</Button>
        </div>
      </Container>
    </section>
  );
}
