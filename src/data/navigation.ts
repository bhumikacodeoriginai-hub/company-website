import { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
  {
    label: 'Company',
    href: '/company',
    children: [
      { label: 'About Code Origin.AI', href: '/company' },
      { label: 'Our Values', href: '/company#values' },
      { label: 'Technology Vision', href: '/company#vision' },
      { label: 'Global Presence', href: '/company#global' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'AI & Machine Learning', href: '/services/ai-machine-learning' },
      { label: 'Software Engineering', href: '/services/software-engineering' },
      { label: 'Cloud & DevOps', href: '/services/cloud-devops' },
      { label: 'Cybersecurity', href: '/services/cybersecurity' },
      { label: 'Data & Analytics', href: '/services/data-analytics' },
      { label: 'Digital Transformation', href: '/services/digital-transformation' },
    ],
  },
  { label: 'Products', href: '/products' },
  { label: 'Industries', href: '/industries' },
  { label: 'Insights', href: '/insights' },
];

export const secondaryNavItems: NavItem[] = [
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];
