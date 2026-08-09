/**
 * Code Origin.AI — Industries Explorer
 * Interactive industry navigation with detailed panels
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const industryData = {
    finance: {
      badge: 'Financial Services',
      title: 'Transforming Financial Services with <span class="text-gradient">Intelligent Technology</span>',
      desc: 'We help financial institutions harness AI, automation, and cloud-native architecture to manage risk, detect fraud, ensure compliance, and deliver personalized customer experiences at scale.',
      challenges: [
        'Evolving regulatory requirements across jurisdictions',
        'Sophisticated fraud and cyber threats targeting financial data',
        'Legacy system modernization without disrupting operations',
        'Customer demand for real-time, personalized digital experiences'
      ],
      solutions: [
        { title: 'AI-Powered Fraud Detection', desc: 'Real-time transaction monitoring with ML models that adapt to evolving fraud patterns and reduce false positives.' },
        { title: 'Regulatory Compliance Automation', desc: 'Automated reporting, KYC/AML processing, and compliance monitoring using NLP and rule engines.' },
        { title: 'Risk Modeling & Analytics', desc: 'Predictive risk models for credit scoring, market risk assessment, and portfolio optimization.' },
        { title: 'Digital Banking Platforms', desc: 'Cloud-native banking experiences with personalization engines and intelligent customer journeys.' }
      ],
      services: [
        { name: 'AI & Machine Learning', href: 'services.html#ai' },
        { name: 'Data & Analytics', href: 'services.html#data' },
        { name: 'Cybersecurity', href: 'services.html#security' },
        { name: 'Cloud & DevOps', href: 'services.html#cloud' }
      ],
      tech: ['Python', 'TensorFlow', 'Kafka', 'Kubernetes', 'Snowflake', 'PostgreSQL'],
      cta: 'Discuss Financial Services Solutions'
    },
    healthcare: {
      badge: 'Healthcare & Life Sciences',
      title: 'Advancing Healthcare with <span class="text-gradient">AI-Driven Innovation</span>',
      desc: 'We enable healthcare organizations to improve patient outcomes, accelerate research, automate clinical workflows, and build secure health data platforms that meet rigorous compliance standards.',
      challenges: [
        'Fragmented patient data across disconnected health systems',
        'Strict regulatory and privacy requirements (HIPAA, GDPR)',
        'Clinician burnout from administrative burden and manual processes',
        'Need for faster drug discovery and clinical trial optimization'
      ],
      solutions: [
        { title: 'Clinical Decision Support', desc: 'AI-powered diagnostic assistants and treatment recommendation engines trained on medical literature.' },
        { title: 'Medical Imaging AI', desc: 'Computer vision models for radiology, pathology, and ophthalmology that augment physician analysis.' },
        { title: 'Health Data Platforms', desc: 'Secure, HIPAA-compliant data lakes that unify EHR, genomic, and real-world evidence data.' },
        { title: 'Clinical Workflow Automation', desc: 'NLP-powered documentation, coding, and prior authorization to reduce administrative burden.' }
      ],
      services: [
        { name: 'AI & Machine Learning', href: 'services.html#ai' },
        { name: 'Data & Analytics', href: 'services.html#data' },
        { name: 'Software Engineering', href: 'services.html#software' },
        { name: 'Cybersecurity', href: 'services.html#security' }
      ],
      tech: ['PyTorch', 'FHIR', 'Azure Health', 'NLP', 'Computer Vision', 'Kubernetes'],
      cta: 'Discuss Healthcare Solutions'
    },
    manufacturing: {
      badge: 'Manufacturing & Industrial',
      title: 'Smart Manufacturing with <span class="text-gradient-subtle">AI & IoT</span>',
      desc: 'We help manufacturers optimize production, predict equipment failures, automate quality inspection, and build digital twins that transform how physical systems are designed, operated, and maintained.',
      challenges: [
        'Unplanned downtime costing millions in lost production',
        'Quality defects escaping manual inspection processes',
        'Complex supply chains vulnerable to disruption',
        'Difficulty integrating OT systems with modern IT platforms'
      ],
      solutions: [
        { title: 'Predictive Maintenance', desc: 'ML models that analyze sensor data to predict equipment failures before they happen, reducing unplanned downtime.' },
        { title: 'AI Quality Inspection', desc: 'Computer vision systems that detect defects in real-time with higher accuracy than manual inspection.' },
        { title: 'Supply Chain Intelligence', desc: 'AI-powered demand forecasting, inventory optimization, and disruption risk analysis.' },
        { title: 'Digital Twin Platforms', desc: 'Virtual representations of physical assets that enable simulation, optimization, and remote monitoring.' }
      ],
      services: [
        { name: 'AI & Machine Learning', href: 'services.html#ai' },
        { name: 'Cloud & DevOps', href: 'services.html#cloud' },
        { name: 'Data & Analytics', href: 'services.html#data' },
        { name: 'Software Engineering', href: 'services.html#software' }
      ],
      tech: ['IoT', 'Edge Computing', 'TensorFlow', 'AWS IoT', 'Time Series DB', 'Docker'],
      cta: 'Discuss Manufacturing Solutions'
    },
    retail: {
      badge: 'Retail & E-Commerce',
      title: 'Intelligent Commerce with <span class="text-gradient">Personalized Experiences</span>',
      desc: 'We build AI-powered retail platforms that deliver personalized experiences, optimize inventory, forecast demand, and create seamless omnichannel journeys that drive loyalty and conversion.',
      challenges: [
        'Customers expecting hyper-personalized shopping experiences',
        'Inventory optimization across complex distribution networks',
        'Competition from digital-native brands and marketplaces',
        'Fragmented data across physical and digital touchpoints'
      ],
      solutions: [
        { title: 'Personalization Engines', desc: 'Real-time product recommendations, dynamic pricing, and personalized content powered by deep learning.' },
        { title: 'Demand Forecasting', desc: 'ML models that predict demand at SKU level, accounting for seasonality, promotions, and external factors.' },
        { title: 'Intelligent Search & Discovery', desc: 'NLP-powered search, visual product discovery, and conversational shopping assistants.' },
        { title: 'Omnichannel Analytics', desc: 'Unified customer data platforms that connect online and offline interactions for complete journey visibility.' }
      ],
      services: [
        { name: 'AI & Machine Learning', href: 'services.html#ai' },
        { name: 'Software Engineering', href: 'services.html#software' },
        { name: 'Data & Analytics', href: 'services.html#data' },
        { name: 'Product Engineering', href: 'services.html#product' }
      ],
      tech: ['Python', 'React', 'Elasticsearch', 'Redis', 'Spark', 'Recommendation ML'],
      cta: 'Discuss Retail Solutions'
    },
    logistics: {
      badge: 'Logistics & Supply Chain',
      title: 'Optimizing Logistics with <span class="text-gradient-subtle">Intelligent Systems</span>',
      desc: 'We engineer AI-powered logistics platforms that optimize routes, manage fleets, predict disruptions, and automate warehousing to drive efficiency across the entire supply chain.',
      challenges: [
        'Rising delivery expectations with shrinking cost margins',
        'Complex multi-modal transportation networks',
        'Supply chain fragility exposed by global disruptions',
        'Manual warehouse processes limiting throughput and accuracy'
      ],
      solutions: [
        { title: 'Route Optimization AI', desc: 'Dynamic routing algorithms that optimize delivery sequences considering traffic, constraints, and real-time conditions.' },
        { title: 'Fleet Intelligence', desc: 'Real-time fleet tracking, predictive maintenance scheduling, and driver performance optimization.' },
        { title: 'Warehouse Automation', desc: 'Robotic process optimization, intelligent pick-path routing, and automated inventory management.' },
        { title: 'Supply Chain Visibility', desc: 'End-to-end tracking platforms with disruption prediction and automated exception management.' }
      ],
      services: [
        { name: 'AI & Machine Learning', href: 'services.html#ai' },
        { name: 'Cloud & DevOps', href: 'services.html#cloud' },
        { name: 'Software Engineering', href: 'services.html#software' },
        { name: 'Data & Analytics', href: 'services.html#data' }
      ],
      tech: ['Python', 'Kafka', 'PostgreSQL', 'Optimization', 'Real-Time', 'GIS'],
      cta: 'Discuss Logistics Solutions'
    },
    energy: {
      badge: 'Energy & Utilities',
      title: 'Powering the Future with <span class="text-gradient">Smart Energy</span>',
      desc: 'We help energy companies and utilities leverage AI, IoT, and analytics to optimize generation, improve grid reliability, accelerate the clean energy transition, and enhance customer engagement.',
      challenges: [
        'Aging grid infrastructure and increasing demand variability',
        'Integration of distributed renewable energy sources',
        'Regulatory pressure to reduce carbon emissions',
        'Customer expectations for digital energy management'
      ],
      solutions: [
        { title: 'Grid Intelligence', desc: 'AI-powered load forecasting, fault detection, and grid optimization for improved reliability and efficiency.' },
        { title: 'Renewable Integration', desc: 'Forecasting models for solar and wind generation, battery optimization, and demand response systems.' },
        { title: 'Asset Management AI', desc: 'Predictive maintenance for generation and transmission assets using sensor data and ML.' },
        { title: 'Smart Metering Platforms', desc: 'Intelligent metering analytics, consumption insights, and dynamic pricing engines for utility customers.' }
      ],
      services: [
        { name: 'AI & Machine Learning', href: 'services.html#ai' },
        { name: 'Data & Analytics', href: 'services.html#data' },
        { name: 'Cloud & DevOps', href: 'services.html#cloud' },
        { name: 'Digital Transformation', href: 'services.html#transformation' }
      ],
      tech: ['Python', 'Time Series', 'IoT', 'SCADA', 'Azure', 'Edge Computing'],
      cta: 'Discuss Energy Solutions'
    },
    realestate: {
      badge: 'Real Estate & Construction',
      title: 'Building Smarter with <span class="text-gradient-subtle">PropTech Intelligence</span>',
      desc: 'We deliver AI-powered platforms for property valuation, smart building management, tenant experience, construction optimization, and real estate investment analytics.',
      challenges: [
        'Manual and subjective property valuation processes',
        'Rising building management costs and energy consumption',
        'Construction project delays and cost overruns',
        'Tenant expectations for digital-first experiences'
      ],
      solutions: [
        { title: 'AI Property Valuation', desc: 'Machine learning models that analyze comparable sales, market trends, and property features for accurate valuations.' },
        { title: 'Smart Building Systems', desc: 'IoT-enabled building management with AI-optimized HVAC, lighting, and energy consumption.' },
        { title: 'Construction Intelligence', desc: 'Computer vision for progress monitoring, safety compliance, and automated reporting.' },
        { title: 'Tenant Experience Platforms', desc: 'Digital platforms for tenant engagement, service requests, community management, and space booking.' }
      ],
      services: [
        { name: 'AI & Machine Learning', href: 'services.html#ai' },
        { name: 'Software Engineering', href: 'services.html#software' },
        { name: 'Cloud & DevOps', href: 'services.html#cloud' },
        { name: 'Data & Analytics', href: 'services.html#data' }
      ],
      tech: ['Python', 'Computer Vision', 'IoT', 'React', 'GIS', 'PostgreSQL'],
      cta: 'Discuss Real Estate Solutions'
    },
    technology: {
      badge: 'Technology & SaaS',
      title: 'Scaling Technology Products with <span class="text-gradient">AI-Native Architecture</span>',
      desc: 'We partner with technology companies to build AI features, scale platforms, modernize infrastructure, and accelerate product development with intelligent automation and engineering excellence.',
      challenges: [
        'Pressure to integrate AI features into existing products quickly',
        'Technical debt slowing feature velocity and innovation',
        'Scaling challenges as user base and data volumes grow',
        'Recruiting and retaining specialized AI/ML engineering talent'
      ],
      solutions: [
        { title: 'AI Feature Development', desc: 'Design and build production-ready AI features that integrate seamlessly into existing product experiences.' },
        { title: 'Platform Scaling', desc: 'Re-architecture and optimization to handle 10x–100x growth in traffic, data, and computational demand.' },
        { title: 'Developer Tooling & DevEx', desc: 'Internal platforms, CI/CD optimization, and development workflows that accelerate engineering velocity.' },
        { title: 'Infrastructure Modernization', desc: 'Migration from monoliths to microservices, Kubernetes adoption, and cloud-native transformation.' }
      ],
      services: [
        { name: 'Software Engineering', href: 'services.html#software' },
        { name: 'AI & Machine Learning', href: 'services.html#ai' },
        { name: 'Cloud & DevOps', href: 'services.html#cloud' },
        { name: 'Product Engineering', href: 'services.html#product' }
      ],
      tech: ['Kubernetes', 'Go', 'TypeScript', 'React', 'Terraform', 'LangChain'],
      cta: 'Discuss Technology Solutions'
    },
    professional: {
      badge: 'Professional Services',
      title: 'Augmenting Professional Services with <span class="text-gradient-subtle">AI Intelligence</span>',
      desc: 'We help consulting firms, legal practices, and advisory companies leverage AI for knowledge management, document intelligence, workflow automation, and data-driven client advisory.',
      challenges: [
        'Knowledge trapped in documents, emails, and individual expertise',
        'Manual document review consuming billable hours on low-value tasks',
        'Client expectations for faster insights and data-driven recommendations',
        'Difficulty scaling advisory services without proportional headcount'
      ],
      solutions: [
        { title: 'Knowledge Management AI', desc: 'Enterprise search and knowledge graphs that surface relevant expertise and past work across the organization.' },
        { title: 'Document Intelligence', desc: 'NLP models for contract analysis, due diligence automation, and compliance document review.' },
        { title: 'AI Advisory Tools', desc: 'Data-driven advisory platforms that augment consultant expertise with predictive analytics and benchmarks.' },
        { title: 'Workflow Automation', desc: 'Intelligent automation of repetitive processes from intake to delivery, freeing capacity for high-value work.' }
      ],
      services: [
        { name: 'AI & Machine Learning', href: 'services.html#ai' },
        { name: 'Software Engineering', href: 'services.html#software' },
        { name: 'Digital Transformation', href: 'services.html#transformation' },
        { name: 'Data & Analytics', href: 'services.html#data' }
      ],
      tech: ['LangChain', 'RAG', 'NLP', 'Python', 'Elasticsearch', 'Azure AI'],
      cta: 'Discuss Professional Services Solutions'
    }
  };

  // ═══ INDUSTRY EXPLORER INTERACTIONS ═══
  const navBtns = document.querySelectorAll('.ind-nav-btn');
  const panel = document.getElementById('ind-panel');

  if (!navBtns.length || !panel) return;

  function updatePanel(key) {
    const data = industryData[key];
    if (!data) return;

    // Animate out
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(12px)';

    setTimeout(() => {
      // Update badge
      document.getElementById('ind-badge').textContent = data.badge;

      // Update title
      document.getElementById('ind-title').innerHTML = data.title;

      // Update description
      document.getElementById('ind-desc').textContent = data.desc;

      // Update challenges
      document.getElementById('ind-challenges').innerHTML = data.challenges
        .map(c => `<div class="ind-challenge-item">${c}</div>`).join('');

      // Update solutions
      document.getElementById('ind-solutions').innerHTML = data.solutions
        .map(s => `<div class="ind-solution-card"><h5>${s.title}</h5><p>${s.desc}</p></div>`).join('');

      // Update services
      document.getElementById('ind-services').innerHTML = data.services
        .map(s => `<a href="${s.href}" class="ind-service-link">${s.name}</a>`).join('');

      // Update technology
      document.getElementById('ind-tech').innerHTML = data.tech
        .map(t => `<span class="tag">${t}</span>`).join('');

      // Update CTA
      const ctaBtn = panel.querySelector('.ind-panel-cta .btn');
      if (ctaBtn) ctaBtn.textContent = data.cta + ' →';

      // Animate in
      panel.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
    }, 250);
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-ind');

      // Update active state
      navBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      updatePanel(key);
    });
  });

  // Panel transition styles
  if (panel) {
    panel.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  }
});
