import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { services } from '@/data/services';
import { Container, Button, Badge } from '@/components/ui';

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <>
      <section className="pt-32 pb-16 bg-gray-50 dark:bg-navy-800/50 border-b border-gray-200 dark:border-white/5">
        <Container>
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-blue dark:text-brand-electric">Services</span>
          <h1 className="text-h1 font-bold text-gray-900 dark:text-white mt-3 mb-4">{service.title}</h1>
          <p className="text-body-lg text-gray-600 dark:text-gray-400 max-w-2xl">{service.description}</p>
        </Container>
      </section>
      <section className="section-spacing">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-h3 font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
                <p className="text-body text-gray-600 dark:text-gray-400 leading-relaxed">{service.longDescription}</p>
              </div>
              <div>
                <h2 className="text-h3 font-bold text-gray-900 dark:text-white mb-4">Capabilities</h2>
                <ul className="space-y-3">
                  {service.capabilities.map((cap) => (
                    <li key={cap} className="flex items-center gap-3 text-body text-gray-600 dark:text-gray-400">
                      <span className="text-brand-blue dark:text-brand-electric">→</span> {cap}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-h3 font-bold text-gray-900 dark:text-white mb-4">Business Challenges We Solve</h2>
                <ul className="space-y-3">
                  {service.challenges.map((ch) => (
                    <li key={ch} className="flex items-center gap-3 text-body text-gray-600 dark:text-gray-400">
                      <span className="text-brand-blue dark:text-brand-electric">→</span> {ch}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <aside className="space-y-6">
              <div className="card-base p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((t) => (<Badge key={t}>{t}</Badge>))}
                </div>
              </div>
              <div className="card-base p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">All Services</h4>
                <ul className="space-y-2">
                  {services.map((s) => (
                    <li key={s.id}><a href={`/services/${s.slug}`} className={`block px-3 py-2 text-sm rounded-lg transition-colors ${s.id === service.id ? 'bg-brand-blue/10 text-brand-blue dark:text-brand-electric' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}>{s.shortTitle}</a></li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
      <section className="section-spacing bg-navy dark:bg-[#060d1a] text-white">
        <Container className="text-center">
          <h2 className="text-h2 font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-body-lg text-gray-300 mb-8 max-w-xl mx-auto">Let us help you identify the right approach for your {service.shortTitle.toLowerCase()} challenges.</p>
          <Button href="/contact" size="lg">Talk to Our Experts</Button>
        </Container>
      </section>
    </>
  );
}
