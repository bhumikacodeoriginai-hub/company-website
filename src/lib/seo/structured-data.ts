export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Code Origin.AI Private Limited',
    url: 'https://codeorigin.ai',
    description: 'AI-first global technology company building intelligent software, digital platforms, cloud solutions, cybersecurity systems, and enterprise applications.',
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Code Origin.AI',
    url: 'https://codeorigin.ai',
  };
}

export function serviceSchema(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Code Origin.AI Private Limited',
    },
  };
}
