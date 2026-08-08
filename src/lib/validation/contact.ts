import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Please describe your project (minimum 10 characters)').max(5000),
  budget: z.string().optional(),
  contactMethod: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
