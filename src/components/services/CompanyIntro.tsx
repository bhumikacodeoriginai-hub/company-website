import { Container, Button } from '@/components/ui';

export function CompanyIntro() {
  return (
    <section className="section-spacing" aria-labelledby="intro-title">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-blue dark:text-brand-electric mb-3 block">Who We Are</span>
            <h2 id="intro-title" className="text-h2 font-bold text-gray-900 dark:text-white mb-4">Technology. Intelligence. Transformation.</h2>
            <p className="text-body-lg text-gray-600 dark:text-gray-400 mb-4">Code Origin.AI combines AI, software engineering, cloud, cybersecurity, data, and digital engineering to help organizations build modern digital capabilities.</p>
            <p className="text-body text-gray-600 dark:text-gray-400 mb-6">We partner with businesses to design, build, and scale digital products and platforms that drive real outcomes. Our multidisciplinary teams bring deep technical expertise with a commitment to engineering excellence.</p>
            <Button href="/company" variant="secondary">Discover Code Origin.AI</Button>
          </div>
          <div className="bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-white/10 rounded-container p-8">
            <h3 className="text-h4 font-semibold text-gray-900 dark:text-white mb-6">Our Focus Areas</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Artificial Intelligence', value: 'AI' },
                { label: 'Infrastructure', value: 'Cloud' },
                { label: 'Cybersecurity', value: 'Sec' },
                { label: 'Engineering', value: 'Eng' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-3xl font-bold text-brand-blue dark:text-brand-electric">{item.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
