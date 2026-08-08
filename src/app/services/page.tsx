import type { Metadata } from 'next';
import { services } from '@/data/services';
import { Container, SectionHeader, Button, Badge } from '@/components/ui';
import { Card, CardTitle, CardDescription } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Comprehensive technology services including AI, software engineering, cloud, cybersecurity, data analytics, and digital transformation.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gray-50 dark:bg-navy-800/50 border-b border-gray-200 dark:border-white/5">
        <Container>
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-blue dark:text-brand-electric">Our Services</span>
          <h1 className="text-h1 font-bold text-gray-900 dark:text-white mt-3 mb-4">Capabilities Built for the Enterprise</h1>
          <p className="text-body-lg text-gray-600 dark:text-gray-400 max-w-2xl">From strategy and architecture to engineering, deployment and optimization, we help organizations build technology that performs at scale.</p>
        </Container>
      </section>
      <section className="section-spacing">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} href={`/services/${service.slug}`}>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription className="mt-3 mb-4">{service.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {service.capabilities.slice(0, 4).map((cap) => (
                    <Badge key={cap}>{cap}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <section className="section-spacing bg-navy dark:bg-[#060d1a] text-white">
        <Container className="text-center">
          <h2 className="text-h2 font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-body-lg text-gray-300 mb-8 max-w-xl mx-auto">Let us help you identify the right technology approach for your business challenges.</p>
          <Button href="/contact" size="lg">Talk to Our Experts</Button>
        </Container>
      </section>
    </>
  );
}
