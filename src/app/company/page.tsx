import type { Metadata } from 'next';
import { Container, SectionHeader, Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About Code Origin.AI',
  description: 'Code Origin.AI is an AI-first global technology company building intelligent software, digital platforms, cloud solutions, cybersecurity systems, and enterprise applications.',
};

export default function CompanyPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gray-50 dark:bg-navy-800/50 border-b border-gray-200 dark:border-white/5">
        <Container>
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-blue dark:text-brand-electric">About Us</span>
          <h1 className="text-h1 font-bold text-gray-900 dark:text-white mt-3 mb-4">About Code Origin.AI</h1>
          <p className="text-body-lg text-gray-600 dark:text-gray-400 max-w-2xl">An AI-first global technology company engineering intelligent software, cloud platforms, cybersecurity systems, and digital solutions for modern organizations.</p>
        </Container>
      </section>
      <section className="section-spacing">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-h3 font-bold text-gray-900 dark:text-white">Our Mission</h2>
              <p className="text-body text-gray-600 dark:text-gray-400 leading-relaxed">Code Origin.AI exists to help organizations harness the power of technology to solve complex problems, accelerate innovation, and create measurable business value. We combine deep expertise in artificial intelligence, software engineering, cloud infrastructure, cybersecurity, and data engineering to deliver solutions that scale.</p>
              <p className="text-body text-gray-600 dark:text-gray-400 leading-relaxed">Our multidisciplinary engineering teams work as technology partners, not just vendors. We invest in understanding business context, industry challenges, and long-term objectives to deliver technology that creates lasting impact.</p>
              <h2 id="vision" className="text-h3 font-bold text-gray-900 dark:text-white pt-8">Technology Vision</h2>
              <p className="text-body text-gray-600 dark:text-gray-400 leading-relaxed">We believe the future belongs to organizations that can intelligently integrate AI, cloud, security, and data into every aspect of their operations. Our vision is to be the technology partner that enables this transformation — building systems that are not just functional, but intelligent, secure, and designed to evolve.</p>
              <h2 id="global" className="text-h3 font-bold text-gray-900 dark:text-white pt-8">Global Presence</h2>
              <p className="text-body text-gray-600 dark:text-gray-400 leading-relaxed">Code Origin.AI serves organizations across global markets, with engineering capabilities that span multiple regions and time zones. Our delivery model enables us to support clients wherever they operate.</p>
            </div>
            <aside className="bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-white/10 rounded-card p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Core Capabilities</h3>
              <ul className="space-y-3">
                {['AI & Machine Learning', 'Software Engineering', 'Cloud & DevOps', 'Cybersecurity', 'Data & Analytics', 'Digital Transformation', 'Product Engineering', 'Quality Engineering'].map((item) => (
                  <li key={item} className="text-sm text-gray-600 dark:text-gray-400 pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-blue dark:before:bg-brand-electric">{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
