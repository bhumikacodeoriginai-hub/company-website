import { Container, SectionHeader } from '@/components/ui';

const values = [
  { title: 'Customer Obsession', desc: 'We build around measurable customer outcomes. Every technology decision is evaluated through the value it creates.' },
  { title: 'Engineering Excellence', desc: 'We solve problems with disciplined engineering. Quality is not negotiable.' },
  { title: 'Responsible AI', desc: 'We develop AI with security, transparency, and accountability.' },
  { title: 'Security by Design', desc: 'Security is integrated from architecture to deployment.' },
  { title: 'Continuous Innovation', desc: 'We continuously explore emerging technologies to bring effective solutions.' },
  { title: 'Long-Term Partnership', desc: 'We aim to become technology partners, not just vendors.' },
];

export function ValuesSection() {
  return (
    <section className="section-spacing" aria-labelledby="values-title">
      <Container>
        <SectionHeader eyebrow="Our Values" title="What We Believe" />
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <div key={v.title} className="card-base p-8 hover:border-brand-blue/30 dark:hover:border-brand-electric/30 transition-colors">
              <span className="text-3xl font-bold text-brand-blue/15 dark:text-brand-electric/15 block mb-2">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{v.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
