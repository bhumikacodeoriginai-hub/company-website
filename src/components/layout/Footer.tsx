import Link from 'next/link';
import { Linkedin, Github } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About', href: '/company' },
    { label: 'Values', href: '/company#values' },
    { label: 'Global Presence', href: '/company#global' },
    { label: 'Careers', href: '/careers' },
  ],
  services: [
    { label: 'AI & Machine Learning', href: '/services/ai-machine-learning' },
    { label: 'Software Engineering', href: '/services/software-engineering' },
    { label: 'Cloud & DevOps', href: '/services/cloud-devops' },
    { label: 'Cybersecurity', href: '/services/cybersecurity' },
    { label: 'Data & Analytics', href: '/services/data-analytics' },
    { label: 'Digital Transformation', href: '/services/digital-transformation' },
  ],
  products: [
    { label: 'AI Platforms', href: '/products' },
    { label: 'Enterprise SaaS', href: '/products' },
    { label: 'Cybersecurity', href: '/products' },
    { label: 'Automation', href: '/products' },
  ],
  resources: [
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy dark:bg-[#060d1a] text-gray-300" role="contentinfo">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 pb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-electric flex items-center justify-center text-white text-xs font-bold">
                CO
              </div>
              <span className="text-lg font-bold text-white">Code Origin.AI</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-6">
              An AI-first global technology company engineering intelligent software, cloud platforms, cybersecurity systems, and digital solutions.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-brand-electric hover:border-brand-electric/50 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-brand-electric hover:border-brand-electric/50 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2026 Code Origin.AI Private Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/security" className="text-sm text-gray-500 hover:text-white transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
