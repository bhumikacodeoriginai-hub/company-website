import { Container, SectionHeader } from '@/components/ui';
import { Shield, Cloud, Code2, BarChart3, Settings, Eye, Activity, Zap, RefreshCw } from 'lucide-react';

const principles = [
  { title: 'Secure by Design', desc: 'Security at every layer', icon: Shield },
  { title: 'Cloud Native', desc: 'Built for cloud deployment', icon: Cloud },
  { title: 'API First', desc: 'Interface-driven architecture', icon: Code2 },
  { title: 'Scalable Architecture', desc: 'Horizontal and vertical', icon: BarChart3 },
  { title: 'Automation First', desc: 'Automated testing and deploy', icon: Settings },
  { title: 'Observability', desc: 'Full-stack monitoring', icon: Eye },
  { title: 'High Availability', desc: '99.9%+ uptime design', icon: Activity },
  { title: 'Performance', desc: 'Optimized for speed', icon: Zap },
  { title: 'Continuous Delivery', desc: 'Rapid, safe releases', icon: RefreshCw },
];

export function EngineeringSection() {
  return (
    <section className="section-spacing bg-gray-50 dark:bg-navy-800/50" aria-labelledby="eng-title">
      <Container>
        <SectionHeader eyebrow="Engineering" title="Built for Performance. Designed for Scale." description="Engineering principles that ensure every solution we deliver is secure, scalable, and resilient." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {principles.map(({ title, desc, icon: Icon }) => (
            <div key={title} className="card-base p-5 flex items-start gap-4 hover:border-brand-blue/30 dark:hover:border-brand-electric/30 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-brand-blue/10 dark:bg-brand-electric/10 flex items-center justify-center text-brand-blue dark:text-brand-electric flex-shrink-0">
                <Icon className="w-[18px] h-[18px]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
