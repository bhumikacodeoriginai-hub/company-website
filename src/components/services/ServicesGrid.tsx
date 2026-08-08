import { Container, SectionHeader, Badge, Button } from '@/components/ui';
import { Card, CardTitle, CardDescription } from '@/components/ui';
import { services } from '@/data/services';

export function ServicesGrid() {
  return (
    <section className="section-spacing bg-gray-50 dark:bg-navy-800/50" aria-labelledby="services-title">
      <Container>
        <SectionHeader
          eyebrow="What We Do"
          title="Capabilities Built for the Enterprise"
          description="From strategy and architecture to engineering, deployment and optimization, we help organizations build technology that performs at scale."
        />
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
        <div className="text-center mt-8">
          <Button href="/services" variant="secondary">Explore All Services</Button>
        </div>
      </Container>
    </section>
  );
}
