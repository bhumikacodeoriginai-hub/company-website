import { Container } from '@/components/ui';
import { Brain, Code2, Cloud, Shield, Database, Globe } from 'lucide-react';

const capabilities = [
  { name: 'AI Engineering', icon: Brain },
  { name: 'Software Engineering', icon: Code2 },
  { name: 'Cloud & DevOps', icon: Cloud },
  { name: 'Cybersecurity', icon: Shield },
  { name: 'Data & Analytics', icon: Database },
  { name: 'Digital Transformation', icon: Globe },
];

export function CapabilityStrip() {
  return (
    <section className="py-12 lg:py-16 bg-gray-50 dark:bg-navy-800/50 border-y border-gray-200 dark:border-white/5" aria-label="Core capabilities">
      <Container wide>
        <p className="text-center text-body-lg font-medium text-gray-600 dark:text-gray-400 mb-8">
          Technology engineered for scale, security and impact.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {capabilities.map(({ name, icon: Icon }) => (
            <div key={name} className="flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 dark:bg-brand-electric/10 flex items-center justify-center text-brand-blue dark:text-brand-electric">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
