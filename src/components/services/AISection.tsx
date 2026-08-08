import { Container, SectionHeader } from '@/components/ui';

const aiCapabilities = [
  { title: 'AI Agents', desc: 'Autonomous intelligent systems' },
  { title: 'Generative AI', desc: 'Content and code generation' },
  { title: 'Enterprise Copilots', desc: 'AI-assisted workflows' },
  { title: 'RAG Systems', desc: 'Knowledge-augmented AI' },
  { title: 'Predictive Analytics', desc: 'Data-driven forecasting' },
  { title: 'Intelligent Automation', desc: 'Process optimization' },
  { title: 'Computer Vision', desc: 'Visual intelligence' },
  { title: 'NLP Systems', desc: 'Language understanding' },
];

export function AISection() {
  return (
    <section className="section-spacing relative overflow-hidden" aria-labelledby="ai-title">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,rgba(30,64,175,0.05),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_right,rgba(30,64,175,0.1),transparent_70%)]" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Artificial Intelligence"
          title="Intelligence by Design"
          description="We integrate artificial intelligence into products, platforms and enterprise workflows to help organizations automate, predict, personalize and make better decisions."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {aiCapabilities.map((item) => (
            <div key={item.title} className="card-base p-5 text-center hover:border-brand-blue/30 dark:hover:border-brand-electric/30 hover:-translate-y-0.5 transition-all duration-250">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
