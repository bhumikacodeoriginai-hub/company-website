export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  capabilities: string[];
  technologies: string[];
  icon: string;
  challenges: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  capabilities: string[];
  status: 'concept' | 'in-development' | 'available';
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string;
  challenges: string[];
  solutions: string[];
  services: string[];
  technologies: string[];
  icon: string;
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
}

export interface JobPosting {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  experience: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  service: string;
  message: string;
  budget: string;
  contactMethod: string;
}
