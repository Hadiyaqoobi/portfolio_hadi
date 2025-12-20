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
  // FEATURED / CORE CERTIFICATIONS - Harvard CS50 Series
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
    priority: 4,
  },
  
  // ============================================
  // Computer Science & Software Foundations
  // ============================================
  
  // Discrete Mathematics
  {
    id: "discrete-math",
    title: "Introduction to Discrete Mathematics for Computer Science",
    provider: "UC San Diego",
    providerLogo: "/logos/ucsd.png",
    skills: ["Combinatorics", "Probability", "Graph Theory", "Number Theory", "Cryptography"],
    date: "2025",
    pdfUrl: "/certs/discrete_math.pdf",
    featured: false,
    category: "Computer Science & Software Foundations",
    priority: 5,
  },
  
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
    priority: 6,
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
    priority: 7,
  },
  
  {
    id: "delft-unix-tools",
    title: "Unix Tools: Data, Software and Production Engineering",
    provider: "TU Delft",
    providerLogo: "/logos/delft.png",
    skills: ["Unix", "Shell Scripting", "Data Processing", "Production Engineering"],
    date: "2021",
    pdfUrl: "/certs/delft_unix_tools.pdf",
    featured: false,
    category: "Computer Science & Software Foundations",
    priority: 8,
  },
  
  {
    id: "delft-software-testing",
    title: "Automated Software Testing: Unit Testing, Coverage & Design for Testability",
    provider: "TU Delft",
    providerLogo: "/logos/delft.png",
    skills: ["Unit Testing", "Test Coverage", "TDD", "Software Quality"],
    date: "2021",
    pdfUrl: "/certs/delft_software_testing.pdf",
    featured: false,
    category: "Computer Science & Software Foundations",
    priority: 9,
  },
  
  // ============================================
  // Data Science, Analytics & Machine Learning
  // ============================================
  
  {
    id: "google-bi",
    title: "Google Business Intelligence Professional Certificate",
    provider: "Google",
    providerLogo: "/logos/google.png",
    skills: ["Data Modeling", "ETL Pipelines", "Dashboards", "BigQuery"],
    date: "2024",
    pdfUrl: "/certs/google_bi.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 1,
  },
  
  {
    id: "harvard-fat-chance",
    title: "Fat Chance: Probability from the Ground Up",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["Probability Theory", "Statistics", "Mathematical Reasoning"],
    date: "2021",
    pdfUrl: "/certs/harvard_fat_chance.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 2,
  },
  
  {
    id: "harvard-probability",
    title: "STAT110x: Introduction to Probability",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["Probability", "Statistics", "Random Variables", "Distributions"],
    date: "2021",
    pdfUrl: "/certs/harvard_probability.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 3,
  },
  
  {
    id: "harvard-data-viz",
    title: "Data Science: Visualization",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["Data Visualization", "ggplot2", "R", "Exploratory Data Analysis"],
    date: "2021",
    pdfUrl: "/certs/harvard_data_science_visualization.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 4,
  },
  
  {
    id: "harvard-data-prob",
    title: "Data Science: Probability",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["Probability", "Monte Carlo", "Random Variables", "Central Limit Theorem"],
    date: "2021",
    pdfUrl: "/certs/harvard_data_science_probability.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 5,
  },
  
  {
    id: "harvard-data-inference",
    title: "Data Science: Inference and Modeling",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["Statistical Inference", "Modeling", "Confidence Intervals", "p-values"],
    date: "2021",
    pdfUrl: "/certs/harvard_data_science_inference.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 6,
  },
  
  {
    id: "harvard-data-wrangling",
    title: "Data Science: Wrangling",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["Data Wrangling", "Web Scraping", "String Processing", "Data Import"],
    date: "2021",
    pdfUrl: "/certs/harvard_data_science_wrangling.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 7,
  },
  
  {
    id: "harvard-data-productivity",
    title: "Data Science: Productivity Tools",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["R", "RStudio", "Git", "Unix", "Reproducible Research"],
    date: "2021",
    pdfUrl: "/certs/harvard_data_science_productivity.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 8,
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
    priority: 9,
  },
  
  {
    id: "harvard-linear-regression",
    title: "Data Science: Linear Regression",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["Linear Regression", "Statistical Modeling", "R", "Prediction"],
    date: "2025",
    pdfUrl: "/certs/harvard_data_science_regression.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 10,
  },
  
  {
    id: "harvard-high-dimensional",
    title: "High-Dimensional Data Analysis",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["PCA", "Clustering", "Machine Learning", "Bioinformatics"],
    date: "2021",
    pdfUrl: "/certs/harvard_high_dimensional.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 11,
  },
  
  {
    id: "columbia-statistical-thinking",
    title: "Statistical Thinking for Data Science and Analytics",
    provider: "Columbia University",
    providerLogo: "/logos/nyu.png",
    skills: ["Statistical Thinking", "Data Analytics", "Exploratory Analysis", "Hypothesis Testing"],
    date: "2021",
    pdfUrl: "/certs/columbia_statistical_thinking.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 12,
  },
  
  {
    id: "columbia-ml",
    title: "Machine Learning for Data Science and Analytics",
    provider: "Columbia University",
    providerLogo: "/logos/nyu.png",
    skills: ["Machine Learning", "Classification", "Clustering", "Feature Engineering"],
    date: "2021",
    pdfUrl: "/certs/columbia_ml_data_science.pdf",
    featured: false,
    category: "Data Science, Analytics & Machine Learning",
    priority: 13,
  },
  
  // ============================================
  // IT Systems, DevOps & Automation
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
    id: "linux-serverless-kubernetes",
    title: "Introduction to Serverless on Kubernetes",
    provider: "The Linux Foundation",
    providerLogo: "/logos/linux-foundation.png",
    skills: ["Kubernetes", "Serverless", "OpenFaaS", "Cloud Native"],
    date: "2021",
    pdfUrl: "/certs/linux_serverless_kubernetes.pdf",
    featured: false,
    category: "IT Systems, DevOps & Automation",
    priority: 3,
  },
  
  {
    id: "linux-jenkins",
    title: "Introduction to Jenkins",
    provider: "The Linux Foundation",
    providerLogo: "/logos/linux-foundation.png",
    skills: ["Jenkins", "CI/CD", "Automation", "DevOps"],
    date: "2021",
    pdfUrl: "/certs/linux_jenkins.pdf",
    featured: false,
    category: "IT Systems, DevOps & Automation",
    priority: 4,
  },
  
  {
    id: "linux-networking",
    title: "Introduction to Open Source Networking Technologies",
    provider: "The Linux Foundation",
    providerLogo: "/logos/linux-foundation.png",
    skills: ["SDN", "NFV", "OpenStack", "Network Automation"],
    date: "2021",
    pdfUrl: "/certs/linux_networking.pdf",
    featured: false,
    category: "IT Systems, DevOps & Automation",
    priority: 5,
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
    priority: 6,
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
  
  {
    id: "curtin-iot-bigdata",
    title: "IoT Programming and Big Data",
    provider: "Curtin University",
    providerLogo: "/logos/curtin.png",
    skills: ["IoT Programming", "Big Data", "Data Analytics"],
    date: "2018",
    pdfUrl: "/certs/curtin_iot_bigdata.pdf",
    featured: false,
    category: "IT Systems, DevOps & Automation",
    priority: 7,
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
  
  {
    id: "delft-responsible-innovation",
    title: "Responsible Innovation: Ethics, Safety and Technology",
    provider: "TU Delft",
    providerLogo: "/logos/delft.png",
    skills: ["Ethics", "Responsible Tech", "Safety Engineering", "Innovation"],
    date: "2021",
    pdfUrl: "/certs/delft_responsible_innovation.pdf",
    featured: false,
    category: "Ethics, Security & Responsible Technology",
    priority: 2,
  },
  
  // ============================================
  // Business, Strategy & Project Management
  // ============================================
  
  {
    id: "umd-marketing",
    title: "Marketing Management",
    provider: "University of Maryland",
    providerLogo: "/logos/umich.png",
    skills: ["Marketing Strategy", "Consumer Behavior", "Market Analysis", "Brand Management"],
    date: "2021",
    pdfUrl: "/certs/maryland_marketing.pdf",
    featured: false,
    category: "Business, Strategy & Project Management",
    priority: 1,
  },
  
  {
    id: "umd-project-info-hubs",
    title: "Designing Project Information Hubs for Program and Project Performance",
    provider: "University of Maryland",
    providerLogo: "/logos/umich.png",
    skills: ["Project Management", "Information Architecture", "Program Performance", "Stakeholder Communication"],
    date: "2021",
    pdfUrl: "/certs/maryland_project_info_hubs.pdf",
    featured: false,
    category: "Business, Strategy & Project Management",
    priority: 2,
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
