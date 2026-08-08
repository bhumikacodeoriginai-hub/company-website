import { Container, SectionHeader } from '@/components/ui';

export function CaseStudies() {
  return (
    <section className="section-spacing" aria-labelledby="cases-title">
      <Container>
        <SectionHeader eyebrow="Case Studies" title="Solving Complex Technology Challenges" />
        <div className="text-center py-12 bg-gray-50 dark:bg-navy-800 border border-dashed border-gray-300 dark:border-white/10 rounded-container">
          <p className="text-body-lg text-gray-500 dark:text-gray-400">Our case studies are currently being prepared. We are documenting the technology challenges we have solved and the outcomes delivered for our partners.</p>
        </div>
      </Container>
    </section>
  );
}
