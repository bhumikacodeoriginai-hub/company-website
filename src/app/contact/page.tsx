import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { Container } from '@/components/ui';
import { Mail, MapPin, Linkedin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Code Origin.AI to discuss your technology challenges, project requirements, or partnership opportunities.',
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gray-50 dark:bg-navy-800/50 border-b border-gray-200 dark:border-white/5">
        <Container>
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-blue dark:text-brand-electric">Contact Us</span>
          <h1 className="text-h1 font-bold text-gray-900 dark:text-white mt-3 mb-4">Let&apos;s Build What Comes Next.</h1>
          <p className="text-body-lg text-gray-600 dark:text-gray-400 max-w-2xl">Ready to discuss your technology challenges? Our team is here to understand your requirements and propose solutions.</p>
        </Container>
      </section>
      <section className="section-spacing">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="py-8">
              <h2 className="text-h3 font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
              <p className="text-body text-gray-600 dark:text-gray-400 mb-8">Whether you need a technology partner for a new initiative, want to modernize existing systems, or are exploring AI and cloud solutions, we would like to hear from you.</p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-blue/10 dark:bg-brand-electric/10 flex items-center justify-center text-brand-blue dark:text-brand-electric flex-shrink-0"><Mail className="w-5 h-5" /></div>
                  <div><h4 className="text-sm font-semibold text-gray-900 dark:text-white">Email</h4><p className="text-sm text-gray-600 dark:text-gray-400">contact@codeorigin.ai</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-blue/10 dark:bg-brand-electric/10 flex items-center justify-center text-brand-blue dark:text-brand-electric flex-shrink-0"><MapPin className="w-5 h-5" /></div>
                  <div><h4 className="text-sm font-semibold text-gray-900 dark:text-white">Location</h4><p className="text-sm text-gray-600 dark:text-gray-400">India (Engineering Center)</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-blue/10 dark:bg-brand-electric/10 flex items-center justify-center text-brand-blue dark:text-brand-electric flex-shrink-0"><Linkedin className="w-5 h-5" /></div>
                  <div><h4 className="text-sm font-semibold text-gray-900 dark:text-white">LinkedIn</h4><p className="text-sm text-gray-600 dark:text-gray-400">Connect with us professionally</p></div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
