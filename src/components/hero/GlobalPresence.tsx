import { Container, SectionHeader } from '@/components/ui';

const regions = [
  { name: 'India', role: 'Engineering Center' },
  { name: 'Middle East', role: 'Delivery Region' },
  { name: 'North America', role: 'Market Presence' },
  { name: 'Europe', role: 'Market Presence' },
  { name: 'Asia Pacific', role: 'Market Presence' },
];

export function GlobalPresence() {
  return (
    <section className="section-spacing bg-gray-50 dark:bg-navy-800/50" aria-labelledby="global-title">
      <Container>
        <SectionHeader eyebrow="Global Reach" title="Engineering Without Borders" description="Serving organizations across global markets." />
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[2/1] bg-gray-100 dark:bg-navy-800 border border-gray-200 dark:border-white/10 rounded-container relative overflow-hidden flex items-center justify-center mb-8">
            <p className="text-sm text-gray-400">World Map Visualization</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {regions.map((r) => (
              <div key={r.name} className="text-center">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{r.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{r.role}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
