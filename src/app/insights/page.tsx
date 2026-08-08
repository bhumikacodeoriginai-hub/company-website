import type { Metadata } from 'next';
import { insights } from '@/data/insights';
import { Container, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Engineering insights, technology analysis, and industry perspectives on AI, cloud, cybersecurity, and digital transformation.',
};

export default function InsightsPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gray-50 dark:bg-navy-800/50 border-b border-gray-200 dark:border-white/5">
        <Container>
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-blue dark:text-brand-electric">Insights</span>
          <h1 className="text-h1 font-bold text-gray-900 dark:text-white mt-3 mb-4">Technology Perspectives</h1>
          <p className="text-body-lg text-gray-600 dark:text-gray-400 max-w-2xl">Engineering insights, research, and analysis from our technology teams.</p>
        </Container>
      </section>
      <section className="section-spacing">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((article) => (
              <article key={article.id} className="card-base overflow-hidden card-hover">
                <div className="h-44 bg-gray-100 dark:bg-navy-700 flex items-center justify-center text-gray-400 text-sm">Article Image</div>
                <div className="p-6">
                  <Badge variant="accent" className="mb-3">{article.category}</Badge>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{article.description}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 text-xs text-gray-500">{article.readingTime} read &middot; {article.date}</div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
