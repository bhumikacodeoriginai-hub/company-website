import { HeroSection } from '@/components/hero/HeroSection';
import { CapabilityStrip } from '@/components/hero/CapabilityStrip';
import { CompanyIntro } from '@/components/services/CompanyIntro';
import { ServicesGrid } from '@/components/services/ServicesGrid';
import { AISection } from '@/components/services/AISection';
import { ProductsSection } from '@/components/products/ProductsSection';
import { IndustriesSection } from '@/components/industries/IndustriesSection';
import { EngineeringSection } from '@/components/services/EngineeringSection';
import { SecuritySection } from '@/components/services/SecuritySection';
import { TechEcosystem } from '@/components/services/TechEcosystem';
import { CaseStudies } from '@/components/insights/CaseStudies';
import { GlobalPresence } from '@/components/hero/GlobalPresence';
import { ValuesSection } from '@/components/hero/ValuesSection';
import { InsightsPreview } from '@/components/insights/InsightsPreview';
import { CareersCTA } from '@/components/careers/CareersCTA';
import { FinalCTA } from '@/components/hero/FinalCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilityStrip />
      <CompanyIntro />
      <ServicesGrid />
      <AISection />
      <ProductsSection />
      <IndustriesSection />
      <EngineeringSection />
      <SecuritySection />
      <TechEcosystem />
      <CaseStudies />
      <GlobalPresence />
      <ValuesSection />
      <InsightsPreview />
      <CareersCTA />
      <FinalCTA />
    </>
  );
}
