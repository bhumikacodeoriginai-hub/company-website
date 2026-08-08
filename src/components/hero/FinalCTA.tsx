import { Container, Button } from '@/components/ui';

export function FinalCTA() {
  return (
    <section className="section-spacing-lg bg-navy dark:bg-[#060d1a] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(14,165,233,0.1),transparent_50%),radial-gradient(ellipse_at_70%_50%,rgba(30,64,175,0.1),transparent_50%)]" />
      <Container className="text-center relative">
        <h2 className="text-h2 font-bold text-white mb-4">Let&apos;s Build What&apos;s Next.</h2>
        <p className="text-body-lg text-gray-300 max-w-xl mx-auto mb-8">Have a complex technology challenge, product idea, or digital transformation initiative? Let&apos;s explore what we can build together.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button href="/contact" size="lg" className="bg-white text-navy hover:bg-gray-100 dark:bg-white dark:text-navy dark:hover:bg-gray-100">Talk to Our Experts</Button>
          <Button href="/contact" variant="secondary" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">Contact Us</Button>
        </div>
      </Container>
    </section>
  );
}
