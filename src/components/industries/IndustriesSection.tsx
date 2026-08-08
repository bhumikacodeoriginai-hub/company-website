import { Container, SectionHeader } from '@/components/ui';
import { industries } from '@/data/industries';

export function IndustriesSection() {
  return (
    <section className="section-spacing" aria-labelledby="industries-title">
      <Container>
        <SectionHeader
          eyebrow="Industries"
          title="Technology Across Industries"
          description="Delivering tailored solutions that address the unique challenges and opportunities of each industry."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((industry) => (
            <a key={industry.id} href={`/industries/${industry.slug}`} className="card-base card-hover p-5 text-center">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{industry.name}</h4>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
