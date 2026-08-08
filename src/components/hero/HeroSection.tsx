'use client';

import { useEffect, useRef } from 'react';
import { Button, Container } from '@/components/ui';

export function HeroSection() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !visualRef.current) return;

    // Animation is handled via CSS keyframes for performance
  }, []);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-[72px] overflow-hidden" aria-labelledby="hero-title">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-50%] right-[-20%] w-[80%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(30,64,175,0.07)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(30,64,175,0.15)_0%,transparent_70%)] animate-pulse-slow" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[60%] h-[100%] bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08)_0%,transparent_70%)]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_60%_50%,black_20%,transparent_70%)]" />
      </div>

      <Container wide className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="max-w-2xl lg:max-w-none">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/5 dark:bg-brand-electric/10 border border-brand-blue/15 dark:border-brand-electric/20 rounded-full text-sm font-medium text-brand-blue dark:text-brand-electric mb-6 opacity-0 animate-fade-in">
              <span className="w-1.5 h-1.5 bg-brand-blue dark:bg-brand-electric rounded-full animate-pulse" />
              CODE ORIGIN.AI
            </div>

            <h1 id="hero-title" className="text-display font-bold text-gray-900 dark:text-white mb-6 opacity-0 animate-slide-up animate-delay-100">
              Engineering Intelligence for a Digital World
            </h1>

            <p className="text-body-lg text-gray-600 dark:text-gray-400 max-w-xl mb-8 opacity-0 animate-slide-up animate-delay-200">
              We build intelligent software, AI-powered platforms, secure digital ecosystems, and scalable cloud solutions that help organizations transform complex challenges into measurable business outcomes.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 opacity-0 animate-slide-up animate-delay-300">
              <Button href="/contact" size="lg">Talk to Our Experts</Button>
              <Button href="/services" variant="secondary" size="lg">Explore Our Capabilities</Button>
            </div>
          </div>

          {/* Visual */}
          <div ref={visualRef} className="hidden lg:flex items-center justify-center" aria-hidden="true">
            <div className="relative w-full max-w-[500px] aspect-square">
              {/* Orbital rings */}
              <div className="absolute inset-[5%] border border-brand-blue/20 dark:border-brand-blue/30 rounded-full animate-orbit" style={{ animationDuration: '25s' }} />
              <div className="absolute inset-[15%] border border-brand-electric/15 dark:border-brand-electric/20 rounded-full animate-orbit" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
              <div className="absolute inset-[25%] border border-brand-blue/25 dark:border-brand-blue/35 rounded-full animate-orbit" style={{ animationDuration: '15s' }} />
              {/* Center core */}
              <div className="absolute inset-[35%] bg-gradient-to-br from-brand-blue/10 to-brand-electric/10 dark:from-brand-blue/20 dark:to-brand-electric/20 border border-brand-blue/20 dark:border-brand-blue/30 rounded-full flex items-center justify-center">
                <div className="w-[60%] h-[60%] bg-gradient-to-br from-brand-blue to-brand-electric rounded-full opacity-80 animate-pulse-slow" />
              </div>
              {/* Floating nodes */}
              <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-brand-blue rounded-full animate-float" />
              <div className="absolute top-[30%] right-[10%] w-2 h-2 bg-brand-electric rounded-full animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-brand-blue rounded-full animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute top-[50%] right-[25%] w-1.5 h-1.5 bg-brand-cyan rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
