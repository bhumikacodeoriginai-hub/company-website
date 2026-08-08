import type { Metadata } from 'next';
import { products } from '@/data/products';
import { Container, Button, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Technology products designed to solve real-world problems. AI platforms, cybersecurity tools, enterprise SaaS, and developer tools.',
};

export default function ProductsPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gray-50 dark:bg-navy-800/50 border-b border-gray-200 dark:border-white/5">
        <Container>
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-blue dark:text-brand-electric">Our Products</span>
          <h1 className="text-h1 font-bold text-gray-900 dark:text-white mt-3 mb-4">Technology Products</h1>
          <p className="text-body-lg text-gray-600 dark:text-gray-400 max-w-2xl">Purpose-built platforms and tools designed to solve real-world enterprise challenges.</p>
        </Container>
      </section>
      <section className="section-spacing">
        <Container>
          <p className="text-center text-body text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">Our product portfolio is in development. The following represent planned product categories and capabilities.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product) => (
              <div key={product.id} className="card-base p-8 flex flex-col">
                <Badge variant="accent" className="self-start mb-4">{product.category}</Badge>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{product.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.capabilities.map((cap) => (<Badge key={cap}>{cap}</Badge>))}
                </div>
                <Badge variant="outline">In Development</Badge>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="section-spacing bg-navy dark:bg-[#060d1a] text-white">
        <Container className="text-center">
          <h2 className="text-h2 font-bold mb-4">Interested in Our Products?</h2>
          <p className="text-body-lg text-gray-300 mb-8 max-w-xl mx-auto">Contact us to learn more about our product roadmap and early access.</p>
          <Button href="/contact" size="lg">Talk to Our Team</Button>
        </Container>
      </section>
    </>
  );
}
