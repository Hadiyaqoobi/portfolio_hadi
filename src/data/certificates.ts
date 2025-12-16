export type CertificateCategory = 
  | "Computer Science & Software Foundations"
  | "Data Science, Analytics & Machine Learning"
  | "IT Systems, DevOps & Automation"
  | "Product, UX & Systems Analysis"
  | "Business, Strategy & Project Management"
  | "Ethics, Security & Responsible Technology";

export const categoryIcons: Record<CertificateCategory, string> = {
  "Computer Science & Software Foundations": "🧠",
  "Data Science, Analytics & Machine Learning": "📊",
  "IT Systems, DevOps & Automation": "⚙️",
  "Product, UX & Systems Analysis": "🧩",
  "Business, Strategy & Project Management": "🏢",
  "Ethics, Security & Responsible Technology": "🔐",
};

export const categoryOrder: CertificateCategory[] = [
  "Computer Science & Software Foundations",
  "Data Science, Analytics & Machine Learning",
  "IT Systems, DevOps & Automation",
  "Product, UX & Systems Analysis",
  "Business, Strategy & Project Management",
  "Ethics, Security & Responsible Technology",
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
  priority?: number; // Lower = more important within category
};

export const certificates: Certificate[] = [
  // ============================================
  // FEATURED / CORE CERTIFICATIONS
  // ============================================
  
  // Stanford Algorithms - CS Foundations (FEATURED)
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
    priority: 1,
  },
  
  // Discrete Mathematics - CS Foundations (FEATURED)
  {
    id: "discrete-math",
    title: "Introduction to Discrete Mathematics for Computer Science",
    provider: "UC San Diego",
    providerLogo: "/logos/ucsd.png",
    skills: ["Combinatorics", "Probability", "Graph Theory", "Number Theory", "Cryptography"],
    date: "2025",
    pdfUrl: "/certs/discrete_math.pdf",
    featured: true,
    category: "Computer Science & Software Foundations",
    priority: 2,
  },
  
  // Google BI - Data Science (FEATURED)
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
  
  // Google IT Automation - DevOps (FEATURED)
  {
    id: "google-it-automation",
    title: "Google IT Automation with Python Professional Certificate",
    provider: "Google",
    providerLogo: "/logos/google.png",
    skills: ["Python", "Git", "Configuration Management", "Cloud Automation"],
    date: "2020",
    pdfUrl: "/certs/google_it_automation.pdf",
    featured: true,
    category: "IT Systems, DevOps & Automation",
    priority: 1,
  },
  
  // ============================================
  // Computer Science & Software Foundations
  // ============================================
  
  {
    id: "python-everybody",
    title: "Python for Everybody Specialization",
    provider: "University of Michigan",
    providerLogo: "/logos/umich.png",
    skills: ["Python", "Data Structures", "Web Scraping", "Databases"],
    date: "2020",
    pdfUrl: "/certs/python_for_everybody.pdf",
    featured: false,
    category: "Computer Science & Software Foundations",
    priority: 3,
  },
  
  {
    id: "linux-oss-dev",
    title: "Open Source Software Development, Linux and Git Specialization",
    provider: "The Linux Foundation",
    providerLogo: "/logos/linux-foundation.png",
    skills: ["Linux", "Git", "Open Source", "Shell Scripting"],
    date: "2021",
    pdfUrl: "/certs/linux_foundation_oss.pdf",
    featured: false,
    category: "Computer Science & Software Foundations",
    priority: 4,
  },
  
  // ============================================
  // Data Science, Analytics & Machine Learning
  // ============================================
  
  // (Placeholder for HarvardX Data Science series - user will add more)
  
  // ============================================
  // IT Systems, DevOps & Automation
  // ============================================
  
  {
    id: "google-it-support",
    title: "Google IT Support Professional Certificate",
    provider: "Google",
    providerLogo: "/logos/google.png",
    skills: ["Networking", "Operating Systems", "System Administration", "IT Security"],
    date: "2019",
    pdfUrl: "/certs/google_it_support.pdf",
    featured: false,
    category: "IT Systems, DevOps & Automation",
    priority: 2,
  },
  
  {
    id: "curtin-iot-intro",
    title: "Introduction to the Internet of Things (IoT)",
    provider: "Curtin University",
    providerLogo: "/logos/curtin.png",
    skills: ["IoT Fundamentals", "Sensors", "Embedded Systems"],
    date: "2018",
    pdfUrl: "/certs/curtin_iot_intro.pdf",
    featured: false,
    category: "IT Systems, DevOps & Automation",
    priority: 5,
  },
  
  {
    id: "curtin-iot-networks",
    title: "IoT Networks and Protocols",
    provider: "Curtin University",
    providerLogo: "/logos/curtin.png",
    skills: ["Network Protocols", "IoT Architecture", "Data Communication"],
    date: "2018",
    pdfUrl: "/certs/curtin_iot_networks.pdf",
    featured: false,
    category: "IT Systems, DevOps & Automation",
    priority: 6,
  },
  
  // ============================================
  // Ethics, Security & Responsible Technology
  // ============================================
  
  {
    id: "ibm-cybersecurity",
    title: "IT Fundamentals for Cybersecurity Specialization",
    provider: "IBM",
    providerLogo: "/logos/ibm.png",
    skills: ["Cybersecurity", "Digital Forensics", "Cryptography", "OS Security"],
    date: "2019",
    pdfUrl: "/certs/ibm_cybersecurity.pdf",
    featured: false,
    category: "Ethics, Security & Responsible Technology",
    priority: 1,
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
