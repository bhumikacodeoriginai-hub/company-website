import { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { products } from '@/data/products';
import { insights } from '@/data/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://codeorigin.ai';
  const now = new Date().toISOString();

  const staticRoutes = [
    { url: base, lastModified: now, priority: 1 },
    { url: `${base}/company`, lastModified: now, priority: 0.8 },
    { url: `${base}/services`, lastModified: now, priority: 0.9 },
    { url: `${base}/products`, lastModified: now, priority: 0.8 },
    { url: `${base}/industries`, lastModified: now, priority: 0.8 },
    { url: `${base}/insights`, lastModified: now, priority: 0.7 },
    { url: `${base}/careers`, lastModified: now, priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, priority: 0.8 },
    { url: `${base}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, priority: 0.3 },
  ];

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    priority: 0.7,
  }));

  const industryRoutes = industries.map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: now,
    priority: 0.6,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    priority: 0.6,
  }));

  const insightRoutes = insights.map((a) => ({
    url: `${base}/insights/${a.slug}`,
    lastModified: now,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...productRoutes, ...insightRoutes];
}
