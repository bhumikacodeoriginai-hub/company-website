import { Container, SectionHeader } from '@/components/ui';

const techCategories = [
  { name: 'AI & ML', items: ['Python', 'PyTorch', 'TensorFlow', 'LLM APIs', 'RAG', 'AI Agents'] },
  { name: 'Cloud', items: ['AWS', 'Microsoft Azure', 'Google Cloud'] },
  { name: 'Backend', items: ['Node.js', 'Python', 'Java', 'Spring Boot', 'FastAPI'] },
  { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript'] },
  { name: 'Infrastructure', items: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD'] },
  { name: 'Data', items: ['PostgreSQL', 'MySQL', 'Redis', 'Data Warehousing'] },
];

export function TechEcosystem() {
  return (
    <section className="section-spacing bg-gray-50 dark:bg-navy-800/50" aria-labelledby="tech-title">
      <Container>
        <SectionHeader eyebrow="Technology Stack" title="Engineering With Modern Technology" description="The tools and platforms we use to build enterprise-grade solutions." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((cat) => (
            <div key={cat.name} className="card-base p-6">
              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-brand-blue dark:bg-brand-electric rounded-full" />
                {cat.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-600 dark:text-gray-400 hover:border-brand-blue/30 dark:hover:border-brand-electric/30 hover:text-brand-blue dark:hover:text-brand-electric transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
