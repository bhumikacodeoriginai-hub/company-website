import type { Metadata } from 'next';
import { jobPostings } from '@/data/careers';
import { Container, Button, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Code Origin.AI and work on cutting-edge AI, cloud, cybersecurity, and software engineering projects.',
};

export default function CareersPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gray-50 dark:bg-navy-800/50 border-b border-gray-200 dark:border-white/5">
        <Container>
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-blue dark:text-brand-electric">Careers</span>
          <h1 className="text-h1 font-bold text-gray-900 dark:text-white mt-3 mb-4">Build the Future With Us</h1>
          <p className="text-body-lg text-gray-600 dark:text-gray-400 max-w-2xl">Join a team of engineers, architects, and innovators solving complex technology challenges.</p>
        </Container>
      </section>
      <section className="section-spacing">
        <Container>
          <h2 className="text-h3 font-bold text-gray-900 dark:text-white mb-6">Open Positions</h2>
          <div className="space-y-4">
            {jobPostings.map((job) => (
              <div key={job.id} className="card-base p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge>{job.department}</Badge>
                    <Badge variant="outline">{job.type}</Badge>
                    <Badge variant="outline">{job.location}</Badge>
                    <Badge variant="outline">{job.experience}</Badge>
                  </div>
                </div>
                <Button href="/contact" variant="secondary" size="sm">Apply</Button>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
