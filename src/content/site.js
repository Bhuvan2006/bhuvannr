/* ------------------------------------------------------------------
   SITE CONTENT — edit everything about the portfolio from this file.
   Sources: resume (Bhuvan_N.R.pdf), LinkedIn export, previous
   portfolio, and the public GitHub READMEs. Nothing here is invented:
   leave a field empty ('' or null) and the UI hides it.
------------------------------------------------------------------- */

export const profile = {
  firstName: 'BHUVAN',
  fullName: 'Bhuvan N.R',
  initials: 'BNR',
  role: 'AI/ML Developer',
  subRole: 'Computer Science Undergraduate',
  location: 'Bengaluru, India',
  timezone: 'Asia/Kolkata',
  // Hero headline. Words in `accent` arrays render in italic serif.
  headline: [
    { t: 'Building' }, { t: 'intelligent', accent: true }, { t: 'experiences' }, { t: 'at the' },
    { t: 'intersection', accent: true }, { t: 'of AI.' },
  ],
  tagline: {
    // Rendered as: Building <em>intelligent</em> experiences at the intersection of AI & technology.
    before: 'Building',
    accent: 'intelligent',
    after: 'experiences at the intersection of AI & technology.',
  },
  email: 'bhuvannr2006@gmail.com',
  website: 'https://bhuvannr.in',
  available: 'Open to internships, research & collaborations',
  status: 'Open to internships',
  edition: 'Edition 2026 · v2.0',
  bio:
    'Computer Science undergraduate (CGPA 8.86) building Machine Learning, Deep Learning and Generative AI applications — RAG systems, AI agents and production ML pipelines.',
  resume: '/resume.pdf',
  portrait: '/images/bhuvan-portrait.webp',
  portraitAlt: '/images/bhuvan-portrait-alt.webp',
  portraitSmall: '/images/bhuvan-portrait-sm.webp',
  // Background-removed portrait for the hero (transparent WebP). 1155×940 and 640w versions.
  cutout: '/images/bhuvan-cutout.webp',
  cutoutSmall: '/images/bhuvan-cutout-640.webp',
  cutoutSize: [1155, 940],
};

export const socials = [
  { label: 'GitHub', handle: '@Bhuvan2006', href: 'https://github.com/Bhuvan2006' },
  { label: 'LinkedIn', handle: 'in/bhuvan-n-r', href: 'https://www.linkedin.com/in/bhuvan-n-r-957a62315/' },
  { label: 'X / Twitter', handle: '@Bhuvan_N_R', href: 'https://x.com/Bhuvan_N_R' },
];

export const about = {
  kicker: 'About',
  // Scroll-revealed statement (word by word)
  statement:
    "I'm a Computer Science undergraduate at Dayananda Sagar University who builds Machine Learning, Deep Learning and Generative AI applications — from RAG systems and model optimisation to AI agents that orchestrate tools and automate real workflows.",
  paragraphs: [
    'My work sits where models meet products: retrieval pipelines with LangChain, ChromaDB and embeddings; ML models tuned with Scikit-learn, XGBoost and Optuna; and agent workflows wired together with MCP integrations and tool calling.',
    'I learn by shipping. Field research at NIT Puducherry, enterprise systems at Page Industries, and full-stack product work at KrowdKraft have taught me that intelligent software is only as good as the problem it actually solves.',
  ],
  facts: [
    { label: 'Studying', value: 'B.Tech CSE, DSU' },
    { label: 'CGPA', value: '8.86' },
    { label: 'Focus', value: 'GenAI · RAG · Agents' },
    { label: 'Based in', value: 'Bengaluru, IN' },
  ],
};

/* Projects — `image` is optional. Put a screenshot in /public/images/projects/
   and set image: '/images/projects/docuquery.webp' to replace the generative preview. */
export const projectFilters = ['All', 'GenAI', 'Agents', 'ML', 'Web', 'Hackathon'];

export const projects = [
  {
    id: 'docuquery',
    filters: ['GenAI'],
    title: 'DocuQuery',
    category: 'Retrieval-Augmented Generation',
    year: '2026',
    summary:
      'A document question-answering system: ask questions of PDF and TXT files and get context-aware answers grounded in the retrieved passages.',
    points: [
      'Unstructured text extraction with character-based chunking (800–1,000 chars, 20-char overlap)',
      'Semantic retrieval with Google embeddings + ChromaDB (cosine similarity, top-3 chunks)',
      'Runs on Google Gemini or a local Qwen 2.5 3B via Ollama for cost-efficient inference',
    ],
    tags: ['Python', 'LangChain', 'ChromaDB', 'Gemini', 'Ollama', 'RAG'],
    github: 'https://github.com/Bhuvan2006/DocuQuery',
    live: '',
    image: '',
    hue: 18,
  },
  {
    id: 'trendpilot',
    filters: ['Agents', 'GenAI'],
    title: 'TrendPilot AI',
    category: 'Multi-Agent System',
    year: '2026',
    summary:
      'A multi-agent system that finds live AI and behavioural-science discussions, scores them against content pillars, drafts LinkedIn and Instagram posts, reviews them, and publishes only what a human approves.',
    points: [
      'Agno workflow with parallel collection, four specialist agents and one bounded revision',
      'Brand, campaign and learning memory stores with capped retrieval',
      'Harness, guardrails and a human approval gate before anything is published',
    ],
    tags: ['Python', 'Agno', 'AI Agents', 'FastAPI', 'Skills', 'Memory'],
    github: 'https://github.com/Bhuvan2006/trendpilot',
    live: '',
    image: '',
    hue: 265,
  },
  {
    id: 'medilocker',
    filters: ['Web'],
    title: 'Medilocker',
    category: 'Health-Tech Platform',
    year: '2026',
    summary:
      'A secure medical-records platform for patients and doctors, with record management, QR-based sharing, a doctor dashboard and an assistant chatbot.',
    points: [
      'Separate patient and doctor views with records, profiles and onboarding',
      'QR code generation and scanning to share a patient’s records',
      'Health score, prediction views and an in-app chatbot',
    ],
    tags: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    github: 'https://github.com/Bhuvan2006/medilocker-new',
    live: '',
    image: '',
    hue: 160,
  },
  {
    id: 'flood-nav',
    filters: ['ML', 'Hackathon'],
    title: 'Flood-Aware Navigation',
    category: 'Disaster Management · Hackathon',
    year: '2026',
    summary:
      'A disaster-management platform that uses NASA elevation data and live weather to assess flood risk and recommend safer travel routes. 2nd Runner-Up at Sentinel 6.0.',
    points: [
      'Flood-risk scoring from rainfall intensity, accumulation and terrain elevation',
      'Weighted A* / Dijkstra routing that avoids low-lying areas and reroutes to shelters',
      'Weather dashboard, impact estimation and an interactive simulation module',
    ],
    tags: ['Python', 'Flask', 'Node.js', 'Pathfinding', 'Gemini'],
    github: 'https://github.com/Bhuvan2006/Sentil_hack',
    live: '',
    image: '',
    hue: 200,
  },
  {
    id: 'nasa-rul',
    filters: ['ML'],
    title: 'Turbofan RUL Pipeline',
    category: 'Predictive Maintenance · MLOps',
    year: '2026',
    summary:
      'Real-time Remaining-Useful-Life inference on NASA’s C-MAPSS turbofan dataset — from model training in Python to a production Java microservice.',
    points: [
      'XGBoost and Random Forest models evaluated with RMSE and the NASA asymmetric score',
      'Model exported to ONNX and served inside a Spring Boot service with ONNX Runtime',
      'Sliding-window features, degradation alerts, PostgreSQL storage and a live dashboard',
    ],
    tags: ['Python', 'XGBoost', 'ONNX', 'Java', 'Spring Boot', 'PostgreSQL'],
    github: 'https://github.com/Bhuvan2006/Nasa_Engine_pipe',
    live: '',
    image: '',
    hue: 40,
  },
  {
    id: 'hermes',
    filters: ['Agents'],
    title: 'Hermes Workflows',
    category: 'AI Agent Automation',
    year: '2026',
    summary:
      'Agent workflows built on Hermes: a scheduled Telegram daily briefing and a custom research skill for discovering trending agentic-AI repositories.',
    points: [
      'Daily briefing that pulls calendar and workspace data, summarises the day and builds task lists',
      'Custom research skill using Agent Reach CLI to discover, validate and rank GitHub repos',
      'Tool calling and MCP integrations for automated, scheduled runs',
    ],
    tags: ['Hermes', 'MCP', 'Agent Reach CLI', 'Telegram', 'Automation'],
    github: '',
    live: '',
    image: '',
    hue: 330,
  },
];

export const experience = [
  {
    role: 'Full-stack Developer',
    org: 'KrowdKraft',
    period: 'Jan 2026 — Present',
    year: '2026',
    type: 'Work',
    location: 'Bengaluru',
    description:
      'Building full-stack applications and contributing to product development in a collaborative startup environment.',
  },
  {
    role: 'Intern',
    org: 'Page Industries Limited',
    period: 'Jan 2026 — Feb 2026',
    year: '2026',
    type: 'Internship',
    location: 'Bengaluru',
    description:
      'Practised key SAP transaction codes, mapped the end-to-end order-to-warehouse workflow across three departments, and identified manual steps eligible for streamlining.',
  },
  {
    role: 'Research Intern',
    org: 'NIT Puducherry',
    period: 'May 2025 — Jul 2025',
    year: '2025',
    type: 'Research',
    location: 'Puducherry',
    description:
      'Field interviews with truck drivers on causes of road accidents, analysis of risk patterns, exploration of ML techniques to predict contributing causes, and contributions to a Road Safety Audit Report.',
  },
  {
    role: 'Student Intern',
    org: 'Humans Care Foundation',
    period: 'Feb 2025 — Mar 2025',
    year: '2025',
    type: 'Internship',
    location: 'Bengaluru',
    description:
      'Hands-on student internship focused on community impact and social initiatives.',
  },
  {
    role: 'Management Staff',
    org: 'AI_WORKS@DSU',
    period: 'Jan 2025 — Present',
    year: '2025',
    type: 'Leadership',
    location: 'Bengaluru',
    description:
      'Management staff of the university AI club — organising, networking and taking initiative in team and leadership roles.',
  },
  {
    role: 'B.Tech, Computer Science & Engineering',
    org: 'Dayananda Sagar University',
    period: 'Sep 2024 — Dec 2028',
    year: '2024',
    type: 'Education',
    location: 'Bengaluru',
    description: 'CGPA 8.86. Relevant coursework: Data Structures, Web Development, Databases.',
  },
];

export const techStack = {
  // Shown on the interactive 3D sphere
  sphere: [
    'Python', 'Java', 'C', 'SQL', 'React', 'FastAPI', 'PyTorch', 'TensorFlow', 'Keras',
    'scikit-learn', 'XGBoost', 'Optuna', 'Pandas', 'NumPy', 'LangChain', 'ChromaDB',
    'Ollama', 'RAG', 'LLMs', 'Embeddings', 'AI Agents', 'MCP', 'Hermes', 'Agno',
    'Prompt Eng.', 'Power BI', 'RapidMiner', 'ONNX', 'Spring Boot', 'Supabase', 'Git',
  ],
  groups: [
    { title: 'Languages', items: ['Python', 'Java', 'C', 'SQL', 'JavaScript'] },
    { title: 'ML & Deep Learning', items: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'XGBoost', 'Optuna', 'Pandas', 'NumPy'] },
    { title: 'Generative AI', items: ['LangChain', 'RAG', 'LLMs', 'Embeddings', 'ChromaDB', 'Ollama', 'Prompt Engineering'] },
    { title: 'Agents & Tooling', items: ['AI Agents', 'MCP', 'Hermes', 'Agent Reach CLI', 'Tool Calling'] },
    { title: 'Build & Data', items: ['React', 'FastAPI', 'Supabase', 'Power BI', 'RapidMiner', 'Git'] },
  ],
};

export const achievements = [
  {
    title: '2nd Runner-Up — Sentinel 6.0 Hackathon',
    issuer: 'KSIT College',
    date: 'Mar 2026',
    kind: 'Hackathon',
    detail: 'Built a disaster-management platform using NASA elevation data to assess flood risk and recommend safer travel routes.',
    href: 'https://github.com/Bhuvan2006/Sentil_hack',
  },
  {
    title: 'Agentblazer Champion 2026',
    issuer: 'Salesforce Trailhead',
    date: 'Aug 2026',
    kind: 'Certification',
    detail: 'Completed the Agentblazer Champion path on AI agents.',
    href: '',
  },
  {
    title: 'OCI 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    date: 'Nov 2025',
    kind: 'Certification',
    detail: 'Oracle Cloud Infrastructure AI Foundations certification.',
    href: '',
  },
  {
    title: 'Programming in Java',
    issuer: 'NPTEL',
    date: 'Nov 2025',
    kind: 'Certification',
    detail: 'NPTEL certification course in Java programming.',
    href: '',
  },
  {
    title: 'Aurora Tech Fest 2025 — Codethon',
    issuer: 'Aurora Tech Fest',
    date: '2025',
    kind: 'Competition',
    detail: 'Participation certificate, Codethon.',
    href: '',
  },
];

export const contact = {
  heading: ['Let’s build', 'something', 'extraordinary.'],
  // Contact form delivery. FormSubmit forwards messages to your email with no backend.
  // The very first submission sends a one-time activation email to this address.
  // Swap for Formspree / Web3Forms / your own API by changing the endpoint.
  formEndpoint: 'https://formsubmit.co/ajax/bhuvannr2006@gmail.com',
};

/* ------------------------------------------------------------------
   FEATURES — switch whole parts of the site on or off.
   services: the /services page (freelance showcase, packages and the
   ₹20 prompt store), its nav link, the Expertise card that links to it
   and the "Website project" / "Design prompt" contact options.
------------------------------------------------------------------- */
export const features = {
  services: true,
};

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { route: '/services', label: 'Services', feature: 'services' },
  { route: '/blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

/** Nav items whose feature (if any) is switched on. */
export const visibleNav = () => nav.filter((n) => !n.feature || features[n.feature]);

/* ------------------------------------------------------------------
   PAYMENTS — Razorpay (UPI, cards, netbanking).
   1. Razorpay Dashboard → Payment Pages → Create → "Digital product".
   2. Price ₹20. Add fields: Email (required), Phone, "Website type"
      (dropdown: Portfolio, Restaurant / Café, Business landing page,
      Personal brand, Other) and "Describe what you want" (text).
   3. Publish and paste the page link (https://rzp.io/rzp/… or
      https://pages.razorpay.com/…) into promptPageUrl below.
   Until it is set, the Buy button opens a pre-filled email instead.
------------------------------------------------------------------- */
/* ------------------------------------------------------------------
   ANALYTICS — Umami Cloud (free Hobby plan, cookieless).
   1. Sign up at https://cloud.umami.is/signup
   2. Add website → domain bhuvannr.in → copy its Website ID
   3. Paste it below. Visits are only counted on the domains listed,
      so testing on localhost never shows up in your stats.
------------------------------------------------------------------- */
export const analytics = {
  umamiWebsiteId: '',
  domains: 'bhuvannr.in,www.bhuvannr.in',
  scriptUrl: 'https://cloud.umami.is/script.js',
};

export const payments = {
  provider: 'Razorpay',
  promptPageUrl: '',
};

export const services = {
  intro:
    'I design and build cinematic, fast websites with Claude as my co-pilot — from first prompt to deployed site. Every project is quoted to its scope, so you only pay for what you actually need.',
  // Claude-built sites. Add more objects to feature more work.
  showcase: [
    {
      id: 'udupi-cinematic',
      title: 'UDUPI ARADYA',
      edition: 'Cinematic edition',
      summary:
        'A dark, cinematic scroll film built from food photography — pinned chapters, a drag gallery, menu and cart, order-ahead and reservation flows, and Web Audio kitchen ambience.',
      stack: ['Vanilla JS', 'CSS', 'No libraries', 'Built with Claude'],
      image: '/images/showcase/udupi-cinematic.webp',
      imageAlt: '/images/showcase/udupi-cinematic-2.webp',
      live: '',
    },
    {
      id: 'udupi-heritage',
      title: 'Udupi Aradya',
      edition: 'Heritage edition',
      summary:
        'A warm, festive single-page site for a pure-vegetarian Udupi restaurant — scroll-scrubbed hero, clip-path feast reveal, WhatsApp ordering and reservations, and a mobile bottom action bar.',
      stack: ['React', 'Vite', 'GSAP', 'Lenis', 'Built with Claude'],
      image: '/images/showcase/udupi-heritage.webp',
      imageAlt: '',
      live: '',
    },
  ],
  // Quote on request — no prices shown.
  packages: [
    {
      id: 'portfolio',
      name: 'Portfolio',
      for: 'Students, developers, designers & creators',
      includes: [
        'Custom design in your personal style',
        'Smooth scroll & motion, mobile-first',
        'Projects, experience, blog-ready',
        'Contact form & deployment',
      ],
    },
    {
      id: 'business',
      name: 'Business & Restaurant',
      for: 'Restaurants, cafés, studios & local brands',
      includes: [
        'Cinematic landing with your photography',
        'Menu / services, gallery, location',
        'WhatsApp ordering or booking flow',
        'SEO basics & fast loading',
      ],
      featured: true,
    },
    {
      id: 'landing',
      name: 'Landing page',
      for: 'Launches, products, events & campaigns',
      includes: [
        'One high-impact page',
        'Sections built around your story',
        'Lead capture or payment link',
        'Analytics-ready',
      ],
    },
  ],
  process: [
    { title: 'Brief', text: 'Tell me about your idea, audience and references.' },
    { title: 'Quote', text: 'You get a scoped quote and timeline — no surprises.' },
    { title: 'Design & build', text: 'I prototype with Claude and refine with you.' },
    { title: 'Launch', text: 'Deployed, tested on mobile, handed over with notes.' },
  ],
  prompt: {
    price: 20,
    currency: '₹',
    title: 'Claude design prompt',
    summary:
      'A detailed, ready-to-paste prompt that tells Claude exactly how to build the website or portfolio you want — structure, sections, motion, styling and tech stack.',
    includes: [
      'Tailored to your site type and style',
      'Section-by-section build instructions',
      'Design system: type, colour, motion',
      'Delivered to your email',
    ],
    types: ['Portfolio', 'Restaurant / Café', 'Business landing', 'Personal brand', 'Other'],
    delivery: 'Delivered by email after payment.',
  },
};
