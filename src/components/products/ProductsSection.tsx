import { Container, SectionHeader, Badge, Button } from '@/components/ui';
import { products } from '@/data/products';

export function ProductsSection() {
  return (
    <section className="section-spacing bg-gray-50 dark:bg-navy-800/50" aria-labelledby="products-title">
      <Container>
        <SectionHeader
          eyebrow="Our Products"
          title="Products Designed to Solve Real Problems"
          description="We build scalable technology products that combine strong engineering, intelligent automation and intuitive user experiences."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="card-base p-8 flex flex-col">
              <Badge variant="accent" className="self-start mb-4">{product.category}</Badge>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{product.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow">{product.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.capabilities.map((cap) => (
                  <Badge key={cap}>{cap}</Badge>
                ))}
              </div>
              <Badge variant="outline">In Development</Badge>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button href="/products" variant="secondary">Explore All Products</Button>
        </div>
      </Container>
    </section>
  );
}
