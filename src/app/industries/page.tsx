import type { Metadata } from 'next';
import { industries } from '@/data/industries';
import { Container, Button, Badge } from '@/components/ui';
import { Card, CardTitle, CardDescription } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Tailored technology solutions for banking, healthcare, manufacturing, retail, logistics, and more.',
};

export default function IndustriesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gray-50 dark:bg-navy-800/50 border-b border-gray-200 dark:border-white/5">
        <Container>
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-blue dark:text-brand-electric">Industries</span>
          <h1 className="text-h1 font-bold text-gray-900 dark:text-white mt-3 mb-4">Technology Across Industries</h1>
          <p className="text-body-lg text-gray-600 dark:text-gray-400 max-w-2xl">Delivering tailored technology solutions that address unique challenges of each industry.</p>
        </Container>
      </section>
      <section className="section-spacing">
        <Container>
          <div className="grid md:grid-cols-2 gap-6">
            {industries.map((ind) => (
              <Card key={ind.id} href={`/industries/${ind.slug}`}>
                <CardTitle>{ind.name}</CardTitle>
                <CardDescription className="mt-3 mb-4">{ind.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {ind.technologies.map((t) => (<Badge key={t}>{t}</Badge>))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
