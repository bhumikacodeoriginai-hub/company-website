'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { CheckCircle, AlertCircle } from 'lucide-react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: FormData): boolean => {
    const errs: Record<string, string> = {};
    const name = form.get('fullName') as string;
    const email = form.get('email') as string;
    const message = form.get('message') as string;

    if (!name?.trim()) errs.fullName = 'Full name is required';
    if (!email?.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email address';
    if (!message?.trim()) errs.message = 'Project description is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (!validate(form)) return;

    setState('submitting');
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setState('success');
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="card-base p-8 text-center" role="status">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Message Sent Successfully</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Thank you. Your request has been received. Our team will review it and get back to you.</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="card-base p-8 text-center" role="alert">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-600">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Something Went Wrong</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">We were unable to send your message. Please try again or email us directly.</p>
        <Button onClick={() => setState('idle')} variant="secondary">Try Again</Button>
      </div>
    );
  }

  return (
    <div className="card-base p-8">
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" name="fullName" required error={errors.fullName} placeholder="Your full name" autoComplete="name" />
          <Field label="Business Email" name="email" type="email" required error={errors.email} placeholder="you@company.com" autoComplete="email" />
          <Field label="Company" name="company" placeholder="Your company" autoComplete="organization" />
          <Field label="Phone" name="phone" type="tel" placeholder="+1 (000) 000-0000" autoComplete="tel" />
          <SelectField label="Country" name="country" options={['India', 'United States', 'United Kingdom', 'UAE', 'Singapore', 'Australia', 'Canada', 'Germany', 'Other']} />
          <SelectField label="Area of Interest" name="service" options={['AI & Machine Learning', 'Software Engineering', 'Cloud & DevOps', 'Cybersecurity', 'Data & Analytics', 'Digital Transformation', 'Other']} />
          <div className="sm:col-span-2">
            <Field label="Project Description" name="message" as="textarea" required error={errors.message} placeholder="Tell us about your project, challenges, and what you're looking to achieve..." />
          </div>
          <SelectField label="Budget Range" name="budget" options={['Under $25,000', '$25,000 - $50,000', '$50,000 - $100,000', '$100,000 - $250,000', '$250,000+', 'Not sure yet']} />
          <SelectField label="Preferred Contact" name="contactMethod" options={['Email', 'Phone', 'Video Call']} />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">By submitting this form, you agree that Code Origin.AI may process your information to respond to your inquiry. We will not share your data with third parties without consent.</p>
        <div className="mt-6">
          <Button type="submit" size="lg" className="w-full" disabled={state === 'submitting'}>
            {state === 'submitting' ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
            ) : 'Start a Conversation'}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = 'text', required, error, placeholder, autoComplete, as }: {
  label: string; name: string; type?: string; required?: boolean; error?: string; placeholder?: string; autoComplete?: string; as?: 'textarea';
}) {
  const classes = `w-full px-4 py-3 text-sm bg-white dark:bg-navy border rounded-lg transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue dark:focus:ring-brand-electric/20 dark:focus:border-brand-electric ${error ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`;
  return (
    <div className={as === 'textarea' ? '' : ''}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {as === 'textarea' ? (
        <textarea id={name} name={name} className={`${classes} min-h-[120px] resize-y`} placeholder={placeholder} required={required} aria-invalid={!!error} />
      ) : (
        <input id={name} name={name} type={type} className={classes} placeholder={placeholder} autoComplete={autoComplete} required={required} aria-invalid={!!error} />
      )}
      {error && <p className="text-xs text-red-500 mt-1" role="alert">{error}</p>}
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5">{label}</label>
      <select id={name} name={name} className="w-full px-4 py-3 text-sm bg-white dark:bg-navy border border-gray-200 dark:border-white/10 rounded-lg min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue dark:focus:ring-brand-electric/20 dark:focus:border-brand-electric">
        <option value="">Select...</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}
