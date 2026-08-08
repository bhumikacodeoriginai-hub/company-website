import { Container, SectionHeader, Button, Badge } from '@/components/ui';
import { insights } from '@/data/insights';

export function InsightsPreview() {
  return (
    <section className="section-spacing bg-gray-50 dark:bg-navy-800/50" aria-labelledby="insights-title">
      <Container>
        <SectionHeader eyebrow="Insights" title="Ideas Shaping What's Next" description="Engineering insights, technology analysis, and industry perspectives from our team." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.slice(0, 3).map((article) => (
            <article key={article.id} className="card-base overflow-hidden card-hover">
              <div className="h-44 bg-gray-100 dark:bg-navy-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">Article Image</div>
              <div className="p-6">
                <Badge variant="accent" className="mb-3">{article.category}</Badge>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{article.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 text-xs text-gray-500">{article.readingTime} read</div>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button href="/insights" variant="secondary">Explore Insights</Button>
        </div>
      </Container>
    </section>
  );
}
