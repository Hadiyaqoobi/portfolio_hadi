/**
 * Skill Map data layer.
 *
 * HONESTY RULES (brief Phase 3):
 *  - No invented percentages. The panel shows COUNTS and a years figure only.
 *  - Years are conservative, from FIRST PROFESSIONAL USE.
 *  - Cert clusters use real counts sourced from memory/18 (the 48 edX receipts)
 *    + the curated certificates.ts. The headline total is COMPUTED from this
 *    data (see certTotal), never hardcoded, so it always matches the itemized sum.
 *  - PLANNED credentials render dashed with a PLANNED tag (a roadmap, not a claim).
 *
 * Sources: memory/09 (model skills), memory/10 (AI 360 coursework),
 * memory/18 (certificate archive), src/data/certificates.ts, portfolio-data.ts.
 */

export type Domain = "data" | "ai" | "cloud" | "ba";

export const DOMAIN_LABELS: Record<Domain, string> = {
  data: "Data & SQL",
  ai: "AI / Machine Learning",
  cloud: "Cloud & Security",
  ba: "Business & Delivery",
};

export interface Skill {
  id: string;
  name: string;
  domain: Domain;
  /** Years from first professional use. */
  years: number;
  /** normalized canvas position (0..1) */
  x: number;
  y: number;
}

export type ProjectKind = "eqr" | "model" | "research" | "live" | "dev" | "course";

export interface SkillProject {
  id: string;
  name: string;
  metric: string;
  kind: ProjectKind;
  skills: string[];
  href?: string;
}

export interface SkillCert {
  id: string;
  name: string;
  issuer: string;
  year: string;
  skills: string[];
  /** how many certificates this entry represents (clusters > 1) */
  count: number;
  planned?: boolean;
  pdf?: string;
}

/* ============================================================
 * SKILLS  (years from brief Phase 3 §5.2 - first professional use)
 * ============================================================ */
export const SKILLS: Skill[] = [
  { id: "sql", name: "SQL / T-SQL", domain: "data", years: 6, x: 0.13, y: 0.26 },
  { id: "pg", name: "PostgreSQL", domain: "data", years: 6, x: 0.1, y: 0.52 },
  { id: "pbi", name: "Power BI", domain: "data", years: 2, x: 0.22, y: 0.76 },
  { id: "r", name: "R / Statistics", domain: "data", years: 2, x: 0.34, y: 0.9 },
  { id: "py", name: "Python", domain: "ai", years: 5, x: 0.38, y: 0.16 },
  { id: "pt", name: "PyTorch / DL", domain: "ai", years: 1.5, x: 0.55, y: 0.09 },
  { id: "ml", name: "Machine Learning", domain: "ai", years: 3, x: 0.52, y: 0.36 },
  { id: "nlp", name: "NLP", domain: "ai", years: 2, x: 0.67, y: 0.2 },
  { id: "llm", name: "LLM & RAG", domain: "ai", years: 2, x: 0.73, y: 0.45 },
  { id: "az", name: "Azure", domain: "cloud", years: 2, x: 0.3, y: 0.44 },
  { id: "cloud", name: "Cloud & DevOps", domain: "cloud", years: 4, x: 0.5, y: 0.63 },
  { id: "sec", name: "Security", domain: "cloud", years: 2, x: 0.68, y: 0.76 },
  { id: "ba", name: "Requirements / BA", domain: "ba", years: 6, x: 0.87, y: 0.28 },
  { id: "agile", name: "Agile Delivery", domain: "ba", years: 4, x: 0.89, y: 0.58 },
  { id: "cs", name: "CS Foundations", domain: "ba", years: 5, x: 0.84, y: 0.85 },
];

export const YEARS_FOOTNOTE = "Years are from first professional use.";

/* ============================================================
 * PROJECTS  (metrics match the verified record / Phase 1 truth-pass)
 * ============================================================ */
export const PROJECTS: SkillProject[] = [
  { id: "b2c", name: "Azure B2C Migration · 135K accounts", metric: "0 critical incidents", kind: "eqr", skills: ["az", "sql", "sec", "ba", "agile"], href: "/projects" },
  { id: "rubs", name: "RUBS Bug Hunt · dynamic SQL audit", metric: "80 combinations/property", kind: "eqr", skills: ["sql"], href: "/#bug-hunt" },
  { id: "sproc", name: "Delinquency-campaign stored procedure", metric: "104 manual runs to 0", kind: "eqr", skills: ["sql"], href: "/projects" },
  { id: "fee", name: "Fee Transparency · 4 workstreams", metric: "multi-state compliance", kind: "eqr", skills: ["sql", "ba"], href: "/projects" },
  { id: "dash", name: "EQR Power BI dashboards", metric: "488,320+ records · 304 properties", kind: "eqr", skills: ["pbi", "sql"], href: "/projects" },
  { id: "agiletx", name: "Waterfall to Agile (CTO request)", metric: "one quarter", kind: "eqr", skills: ["agile", "ba"], href: "/projects" },
  { id: "ner", name: "ROE-ResumeNER (XLM-RoBERTa)", metric: "F1 0.55 to 0.7476", kind: "model", skills: ["pt", "py", "nlp", "ml"], href: "/projects" },
  { id: "embed", name: "ROE-Embed (multilingual-e5)", metric: "24/25 codes separated", kind: "model", skills: ["pt", "py", "nlp", "llm"], href: "/projects" },
  { id: "whisper", name: "ROE-WhisperDari (LoRA)", metric: "Afghan Dari ASR v1.0", kind: "model", skills: ["pt", "py", "nlp"], href: "/projects" },
  { id: "match", name: "ROE-Match (LightGBM)", metric: "calibrated + leakage gates", kind: "model", skills: ["ml", "py"], href: "/projects" },
  { id: "mirage", name: "Mirage Paper · Springer EMSE", metric: "90.3% FDR · under review", kind: "research", skills: ["py", "r", "ml", "llm", "nlp"], href: "/projects" },
  { id: "alpha", name: "AlphaSeekers · live platform", metric: "200 users · RAG assistant", kind: "live", skills: ["pg", "llm", "cloud", "py"], href: "https://alphaseekers.onrender.com/en" },
  { id: "makermind", name: "MakerMind · multi-agent pipeline", metric: "69K lines TypeScript", kind: "dev", skills: ["llm", "cloud"], href: "/projects/makermind" },
  { id: "takvenops", name: "TakveenOps · agentic PM tool", metric: "spec + prototype", kind: "dev", skills: ["llm", "agile", "py"], href: "/projects" },
  { id: "ahrc", name: "AHRC architecture + infrastructure", metric: "$170K+/yr secured", kind: "dev", skills: ["llm", "cloud", "sec", "az", "ba"], href: "/projects" },
  { id: "ch", name: "ConnectionHub platform · 5 web properties", metric: "1,182 students org-wide", kind: "eqr", skills: ["pg", "ba", "sql"], href: "/projects" },
  { id: "vpl", name: "visual-python-learning (Pyodide)", metric: "30 chapters · in-browser Python", kind: "dev", skills: ["cs", "py"], href: "/projects" },
];

/* ============================================================
 * CERTIFICATES
 * Individual featured entries + verified clusters (memory/18 §C).
 * Clusters carry real counts; the headline total is computed below.
 * PLANNED entries are a roadmap, rendered dashed.
 * ============================================================ */
export const CERTS: SkillCert[] = [
  // Cornell (completed 2026) - see memory/02, /10
  { id: "cornell-ai360", name: "AI 360 Certificate", issuer: "Cornell University", year: "2026", skills: ["ml", "pt", "llm", "py"], count: 1 },
  { id: "cornell-aisol", name: "Designing & Building AI Solutions", issuer: "Cornell University", year: "2026", skills: ["llm", "ml"], count: 1 },
  { id: "cornell-nlp", name: "Natural Language Processing With Python", issuer: "Cornell University", year: "2026", skills: ["nlp", "py"], count: 1 },
  { id: "cornell-ds", name: "Data Science Certificate", issuer: "Cornell University", year: "2026", skills: ["r", "ml"], count: 1 },
  // Harvard / HarvardX
  { id: "cs50x", name: "CS50x: Introduction to Computer Science", issuer: "Harvard University", year: "2025", skills: ["cs", "py", "sql"], count: 1, pdf: "/certs/harvard_cs50x.pdf" },
  { id: "cs50p", name: "CS50P: Programming with Python", issuer: "Harvard University", year: "2025", skills: ["py", "cs"], count: 1, pdf: "/certs/harvard_cs50p.pdf" },
  { id: "cs50sql", name: "CS50 SQL: Databases with SQL", issuer: "Harvard University", year: "2024", skills: ["sql", "pg"], count: 1, pdf: "/certs/harvard_cs50_sql.pdf" },
  { id: "harvard-pyresearch", name: "Using Python for Research", issuer: "HarvardX", year: "2021", skills: ["py"], count: 1, pdf: "/certs/harvard_python_research.pdf" },
  { id: "harvard-ds-series", name: "Data Science Professional Series", issuer: "HarvardX", year: "2021", skills: ["r", "ml", "py"], count: 6 },
  { id: "harvard-prob", name: "Probability (STAT110) + Fat Chance", issuer: "HarvardX", year: "2021", skills: ["r"], count: 2 },
  { id: "harvard-highdim", name: "High-Dimensional Data + Urban Analytics", issuer: "HarvardX", year: "2021", skills: ["r", "ml"], count: 2 },
  // Google
  { id: "google-bi", name: "Business Intelligence Professional", issuer: "Google", year: "2024", skills: ["pbi", "sql"], count: 1, pdf: "/certs/google_bi.pdf" },
  { id: "google-itauto", name: "IT Automation with Python", issuer: "Google", year: "2020", skills: ["py", "cloud"], count: 1, pdf: "/certs/google_it_automation.pdf" },
  // Stanford
  { id: "stanford-algo", name: "Algorithms Specialization", issuer: "Stanford University", year: "2025", skills: ["cs"], count: 1, pdf: "/certs/stanford_algorithms.pdf" },
  // Columbia
  { id: "columbia-ml", name: "Machine Learning for Data Science", issuer: "Columbia University", year: "2021", skills: ["ml"], count: 1, pdf: "/certs/columbia_ml_data_science.pdf" },
  { id: "columbia-stat", name: "Statistical Thinking", issuer: "Columbia University", year: "2021", skills: ["r", "ml"], count: 1, pdf: "/certs/columbia_statistical_thinking.pdf" },
  // Clusters (memory/18 §C)
  { id: "linux-cluster", name: "Cloud & DevOps cluster (Linux, Serverless, Kubernetes)", issuer: "The Linux Foundation", year: "2021", skills: ["cloud"], count: 10 },
  { id: "umd-cluster", name: "Project Management & Communication cluster", issuer: "USMx / Maryland", year: "2019", skills: ["ba", "agile"], count: 10 },
  { id: "nyu-cluster", name: "CS MicroBachelors Certificate (Networking, OS, Programming)", issuer: "NYU (edX)", year: "2022", skills: ["cs"], count: 3 },
  { id: "ibm-cluster", name: "Cloud, Data Science & Python", issuer: "IBM", year: "2020", skills: ["cloud", "ml", "py"], count: 3 },
  { id: "uw-cyber", name: "Cybersecurity (2 courses)", issuer: "University of Washington", year: "2019", skills: ["sec"], count: 2 },
  // PLANNED - roadmap, not a claim
  { id: "aws-aip", name: "AWS Certified AI Practitioner", issuer: "Amazon Web Services", year: "planned", skills: ["cloud", "llm"], count: 0, planned: true },
  { id: "az-ai102", name: "Azure AI Engineer (AI-102)", issuer: "Microsoft", year: "planned", skills: ["az", "llm"], count: 0, planned: true },
  { id: "pmp", name: "Project Management Professional (PMP)", issuer: "PMI", year: "in progress", skills: ["ba", "agile"], count: 0, planned: true },
];

/* ============================================================
 * Derived totals (computed, never hardcoded)
 * ============================================================ */
export const certTotal = CERTS.filter((c) => !c.planned).reduce((a, c) => a + c.count, 0);
export const institutionCount = new Set(
  CERTS.filter((c) => !c.planned).map((c) => c.issuer)
).size;

export const projectsForSkill = (skillId: string) =>
  PROJECTS.filter((p) => p.skills.includes(skillId));
export const certsForSkill = (skillId: string) =>
  CERTS.filter((c) => c.skills.includes(skillId));
export const certCountForSkill = (skillId: string) =>
  certsForSkill(skillId)
    .filter((c) => !c.planned)
    .reduce((a, c) => a + c.count, 0);
