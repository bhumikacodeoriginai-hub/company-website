import { Container, SectionHeader } from '@/components/ui';

const layers = [
  { title: 'Identity', desc: 'Access management' },
  { title: 'Application Security', desc: 'Secure code practices' },
  { title: 'Cloud Security', desc: 'Infrastructure protection' },
  { title: 'Data Security', desc: 'Encryption and governance' },
  { title: 'Network Security', desc: 'Perimeter defense' },
  { title: 'Threat Detection', desc: 'Real-time monitoring' },
  { title: 'Monitoring', desc: 'Continuous observability' },
  { title: 'Incident Response', desc: 'Rapid containment' },
  { title: 'Compliance', desc: 'Regulatory adherence' },
];

export function SecuritySection() {
  return (
    <section className="section-spacing relative overflow-hidden" aria-labelledby="security-title">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,64,175,0.03),transparent_70%)]" />
      <Container className="relative">
        <SectionHeader eyebrow="Security" title="Security at Every Layer" description="Comprehensive security engineering protecting your organization from architecture to operations." />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {layers.map((layer) => (
            <div key={layer.title} className="card-base p-5 text-center hover:border-brand-blue/30 dark:hover:border-brand-electric/30 transition-colors">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{layer.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{layer.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
