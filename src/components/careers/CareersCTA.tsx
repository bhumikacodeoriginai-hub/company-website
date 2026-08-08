import { Container, Button } from '@/components/ui';

export function CareersCTA() {
  return (
    <section className="section-spacing relative overflow-hidden" aria-labelledby="careers-cta-title">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,64,175,0.04),transparent_70%)]" />
      <Container className="text-center relative">
        <span className="text-xs font-semibold tracking-widest uppercase text-brand-blue dark:text-brand-electric mb-3 block">Careers</span>
        <h2 id="careers-cta-title" className="text-h2 font-bold text-gray-900 dark:text-white mb-4">Build the Future With Us</h2>
        <p className="text-body-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">Join engineers, technologists and problem-solvers building the next generation of intelligent digital systems.</p>
        <Button href="/careers" size="lg">Explore Careers</Button>
      </Container>
    </section>
  );
}
