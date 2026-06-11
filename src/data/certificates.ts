export type CertificateCategory =
  | "Computer Science & Software Foundations"
  | "Data Science, Analytics & Machine Learning"
  | "AI & Intelligent Systems"
  | "IT Systems, DevOps & Automation"
  | "Product, Business & Project Management";

export const categoryIcons: Record<CertificateCategory, string> = {
  "AI & Intelligent Systems": "🧠",
  "Computer Science & Software Foundations": "💻",
  "Data Science, Analytics & Machine Learning": "📊",
  "IT Systems, DevOps & Automation": "⚙️",
  "Product, Business & Project Management": "🏢",
};

export const categoryOrder: CertificateCategory[] = [
  "AI & Intelligent Systems",
  "Computer Science & Software Foundations",
  "Data Science, Analytics & Machine Learning",
  "IT Systems, DevOps & Automation",
  "Product, Business & Project Management",
];

export type Certificate = {
  id: string;
  title: string;
  provider: string;
  providerLogo: string;
  skills: string[];
  date?: string;
  pdfUrl: string;
  featured?: boolean;
  category: CertificateCategory;
  priority?: number;
  inProgress?: boolean;
};

export const certificates: Certificate[] = [
  // ============================================
  // FEATURED - AI & Intelligent Systems
  // ============================================
  {
    id: "cornell-ai360",
    title: "AI 360 Certificate: Artificial Intelligence & Machine Learning (Completed 2026)",
    provider: "Cornell University",
    providerLogo: "/logos/cornell.png",
    skills: ["Machine Learning", "Neural Networks", "NLP", "Prompt Engineering", "Python"],
    date: "Completed May 2026",
    pdfUrl: "#",
    featured: true,
    category: "AI & Intelligent Systems",
    priority: 1,
  },
  {
    id: "cornell-ai-solutions",
    title: "Designing and Building AI Solutions",
    provider: "Cornell University",
    providerLogo: "/logos/cornell.png",
    skills: ["GenAI Product Design", "Prompt Engineering", "AI Ethics", "Neural Networks"],
    date: "May 2026",
    pdfUrl: "#",
    featured: true,
    category: "AI & Intelligent Systems",
    priority: 2,
  },
  {
    id: "cornell-nlp",
    title: "Natural Language Processing With Python",
    provider: "Cornell University",
    providerLogo: "/logos/cornell.png",
    skills: ["NLP", "TF-IDF", "Word2Vec", "Topic Modeling", "Sentiment Analysis"],
    date: "May 2026",
    pdfUrl: "#",
    featured: true,
    category: "AI & Intelligent Systems",
    priority: 3,
  },
  {
    id: "cornell-data-science",
    title: "Data Science Certificate",
    provider: "Cornell University",
    providerLogo: "/logos/cornell.png",
    skills: ["R", "Clustering", "Regression", "Forecasting", "H2O"],
    date: "March 2026",
    pdfUrl: "#",
    featured: true,
    category: "Data Science, Analytics & Machine Learning",
    priority: 1,
  },

  // ============================================
  // FEATURED - CS Foundations
  // ============================================
  {
    id: "harvard-cs50x",
    title: "CS50x: Introduction to Computer Science",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["C", "Python", "SQL", "Algorithms", "Data Structures"],
    date: "2025",
    pdfUrl: "/certs/harvard_cs50x.pdf",
    featured: true,
    category: "Computer Science & Software Foundations",
    priority: 1,
  },
  {
    id: "harvard-cs50p",
    title: "CS50P: Introduction to Programming with Python",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["Python", "OOP", "Unit Testing", "File I/O"],
    date: "2025",
    pdfUrl: "/certs/harvard_cs50p.pdf",
    featured: true,
    category: "Computer Science & Software Foundations",
    priority: 2,
  },
  {
    id: "harvard-cs50-sql",
    title: "CS50 SQL: Introduction to Databases with SQL",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["SQL", "Database Design", "Query Optimization", "SQLite"],
    date: "2024",
    pdfUrl: "/certs/harvard_cs50_sql.pdf",
    featured: true,
    category: "Computer Science & Software Foundations",
    priority: 3,
  },
  {
    id: "stanford-algorithms",
    title: "Algorithms Specialization",
    provider: "Stanford University",
    providerLogo: "/logos/stanford.png",
    skills: ["Divide & Conquer", "Graph Algorithms", "Dynamic Programming", "NP-Complete Problems"],
    date: "2025",
    pdfUrl: "/certs/stanford_algorithms.pdf",
    featured: true,
    category: "Computer Science & Software Foundations",
    priority: 4,
  },

  // ============================================
  // Data Science & Analytics - Keep best
  // ============================================
  {
    id: "google-bi",
    title: "Google Business Intelligence Professional Certificate",
    provider: "Google",
    providerLogo: "/logos/google.png",
    skills: ["Data Modeling", "ETL Pipelines", "Dashboards", "BigQuery"],
    date: "2024",
    pdfUrl: "/certs/google_bi.pdf",
    featured: true,
    category: "Data Science, Analytics & Machine Learning",
    priority: 1,
  },
  {
    id: "harvard-python-research",
    title: "Using Python for Research",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["Python", "NumPy", "SciPy", "Statistical Learning", "Network Analysis"],
    date: "2021",
    pdfUrl: "/certs/harvard_python_research.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 2,
  },
  {
    id: "columbia-ml",
    title: "Machine Learning for Data Science and Analytics",
    provider: "Columbia University",
    providerLogo: "/logos/columbia.png",
    skills: ["Machine Learning", "Classification", "Clustering", "Feature Engineering"],
    date: "2021",
    pdfUrl: "/certs/columbia_ml_data_science.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 3,
  },

  // ============================================
  // IT Systems & Automation - Keep strongest
  // ============================================
  {
    id: "google-it-automation",
    title: "Google IT Automation with Python Professional Certificate",
    provider: "Google",
    providerLogo: "/logos/google.png",
    skills: ["Python", "Git", "Configuration Management", "Cloud Automation"],
    date: "2020",
    pdfUrl: "/certs/google_it_automation.pdf",
    featured: false,
    category: "IT Systems, DevOps & Automation",
    priority: 1,
  },
  {
    id: "linux-oss-dev",
    title: "Open Source Software Development, Linux and Git",
    provider: "The Linux Foundation",
    providerLogo: "/logos/linux-foundation.png",
    skills: ["Linux", "Git", "Open Source", "Shell Scripting"],
    date: "2021",
    pdfUrl: "/certs/linux_foundation_oss.pdf",
    featured: false,
    category: "IT Systems, DevOps & Automation",
    priority: 2,
  },

  // ============================================
  // Product & PM
  // ============================================
  {
    id: "pmp-in-progress",
    title: "Project Management Professional (PMP)",
    provider: "PMI",
    providerLogo: "/logos/pmi.png",
    skills: ["Project Management", "Agile", "Risk Management", "Stakeholder Management"],
    date: "2025 – In Progress",
    pdfUrl: "#",
    featured: true,
    category: "Product, Business & Project Management",
    priority: 1,
    inProgress: true,
  },
];

// Get unique providers
export const certificateProviders = Array.from(
  new Set(certificates.map((cert) => cert.provider))
).sort();

// Get categories in order
export const certificateCategories = categoryOrder;

// Get featured certificates
export const getFeaturedCertificates = () =>
  certificates
    .filter((cert) => cert.featured)
    .sort((a, b) => (a.priority || 99) - (b.priority || 99));

// Get certificates by category, sorted by priority
export const getCertificatesByCategory = (category: CertificateCategory) =>
  certificates
    .filter((cert) => cert.category === category)
    .sort((a, b) => (a.priority || 99) - (b.priority || 99));

// Get all certificates grouped by category
export const getCertificatesGroupedByCategory = () => {
  const grouped: Record<CertificateCategory, Certificate[]> = {} as any;

  categoryOrder.forEach((category) => {
    const certs = getCertificatesByCategory(category);
    if (certs.length > 0) {
      grouped[category] = certs;
    }
  });

  return grouped;
};
