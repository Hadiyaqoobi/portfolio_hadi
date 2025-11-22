export type Certificate = {
  id: string;
  title: string;
  provider: string;
  providerLogo: string;
  skills: string[];
  date?: string;
  pdfUrl: string;
  featured?: boolean;
  category?: string;
};

export const certificates: Certificate[] = [
  {
    id: "cs50",
    title: "CS50's Introduction to Computer Science",
    provider: "Harvard University",
    providerLogo: "/logos/harvard.png",
    skills: ["Algorithms", "C Programming", "Problem Solving"],
    date: "2023",
    pdfUrl: "/certs/harvard_cs50_certificate.pdf",
    featured: true,
    category: "Computer Science",
  },
  {
    id: "google-data-analytics",
    title: "Google Data Analytics Professional Certificate",
    provider: "Google",
    providerLogo: "/logos/google.png",
    skills: ["Data Analysis", "SQL", "Tableau", "R"],
    date: "2023",
    pdfUrl: "/certs/google_data_analytics.pdf",
    featured: true,
    category: "Data Science",
  },
  {
    id: "python-data-science",
    title: "Python for Data Science and Machine Learning",
    provider: "Columbia University",
    providerLogo: "/logos/columbia.png",
    skills: ["Python", "Machine Learning", "Data Science"],
    date: "2024",
    pdfUrl: "/certs/columbia_python_ml.pdf",
    featured: true,
    category: "Data Science",
  },
  {
    id: "azure-fundamentals",
    title: "Microsoft Azure Fundamentals",
    provider: "Microsoft",
    providerLogo: "/logos/microsoft.png",
    skills: ["Cloud Computing", "Azure", "DevOps"],
    date: "2024",
    pdfUrl: "/certs/microsoft_azure.pdf",
    featured: false,
    category: "Cloud",
  },
  // Add more certificates here - this is just sample data
];

export const certificateProviders = Array.from(
  new Set(certificates.map((cert) => cert.provider))
).sort();

export const certificateCategories = Array.from(
  new Set(certificates.map((cert) => cert.category).filter(Boolean))
).sort();
