import { portfolioData } from "./portfolio-data";

/**
 * The Work ledger: every project from portfolio-data, enriched with an honest
 * status and (where it exists) a REAL, sanitized code peek pulled from Hadi's
 * repos. No new content claims: status is a deterministic mapping of existing
 * fields, and every code excerpt is real and sanitized (no secrets, generic
 * identifiers). Projects with no shippable/real code show their links instead,
 * never a fabricated snippet.
 */

export type WorkStatus = "live" | "dev" | "research" | "enterprise" | "coursework";

export const STATUS_META: Record<WorkStatus, { label: string }> = {
  live: { label: "Live" },
  dev: { label: "In development" },
  research: { label: "Research" },
  enterprise: { label: "Shipped (enterprise)" },
  coursework: { label: "Cornell AI & ML 360" },
};
export const STATUS_ORDER: WorkStatus[] = ["live", "dev", "research", "enterprise", "coursework"];

export interface CodePeek {
  code: string;
  language: string;
  filePath: string;
}
export interface WorkLink {
  label: string;
  href: string;
  external?: boolean;
}
export interface WorkItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  tags: string[];
  status: WorkStatus;
  featured: boolean;
  confidential: boolean;
  company?: string;
  peek?: CodePeek;
  links: WorkLink[];
}

const slug = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 48);

function deriveStatus(p: any): WorkStatus {
  const t = (p.title || "").toLowerCase();
  if (t.includes("alphaseekers")) return "live";
  if (p.confidential || /equity residential/i.test(p.company || "")) return "enterprise";
  if (t.includes("connectionhub")) return "enterprise";
  if (
    t.includes("real estate valuations") ||
    t.includes("predictive real estate") ||
    t.includes("entity extraction") ||
    t.includes("matching engine") ||
    t.includes("whisper-dari") ||
    t.includes("retention model") ||
    t.includes("wage prediction")
  )
    return "research";
  if (p.category === "academic") return "coursework";
  return "dev"; // rnd + consulting
}

/* REAL, sanitized code peeks (reused from the repos / systems.ts / hero lab). */
const PEEKS: { match: (t: string) => boolean; peek: CodePeek }[] = [
  {
    match: (t) => t.includes("regulatory compliance") || t.includes("fee transparency"),
    peek: {
      language: "sql",
      filePath: "rubs_audit.sql · sanitized",
      code: `-- reconcile ledger truth vs stored utility estimate
-- charge codes ru1..ru20  x  bedroom types 0..3
SELECT
  CASE
    WHEN ABS(r.calc - a.amt) < 0.01 THEN 'MATCH'
    WHEN a.amt IS NULL              THEN 'MISSING'
    ELSE 'DIFFERENT'
  END AS status,
  r.charge_code, r.beds
FROM   #ledger_truth   r
FULL OUTER JOIN #stored_estimate a
  ON  a.charge_code = r.charge_code
  AND a.beds        = r.beds;`,
    },
  },
  {
    match: (t) => t.includes("makermind"),
    peek: {
      language: "typescript",
      filePath: "orchestrator.ts",
      code: `// MakerMind: three models check each other before code reaches a board
async processRequest(request, context) {
  const plan    = await this.runPlannerLLM(request, context);  // Claude
  const patches = await this.runCoderLLM(request, plan);        // GPT-4
  const checked = await this.runGuardianLLM(patches);           // Gemini
  return { success: true, plan, checked };
}`,
    },
  },
  {
    match: (t) => t.includes("resumener") || t.includes("takveenup"),
    peek: {
      language: "python",
      filePath: "train_ner.py",
      code: `# spaCy NER pipeline: SKILL / CERT / TITLE spans from raw resume text
nlp = spacy.blank("en")
ner = nlp.add_pipe("ner")
for label in entity_types:
    ner.add_label(label)

optimizer = nlp.begin_training()
for epoch in range(epochs):
    for batch in minibatch(train_data, size=compounding(4, 16, 1.001)):
        examples = [Example.from_dict(nlp.make_doc(t), a) for t, a in batch]
        nlp.update(examples, drop=0.3, sgd=optimizer, losses=losses)`,
    },
  },
  {
    match: (t) => t.includes("roe-match") || t.includes("retention"),
    peek: {
      language: "python",
      filePath: "train_match.py",
      code: `# Optuna HPO, then monotonic constraints + Platt calibration
def objective(trial):
    params = {
        "n_estimators":  trial.suggest_int("n_estimators", 100, 500),
        "num_leaves":    trial.suggest_int("num_leaves", 20, 100),
        "learning_rate": trial.suggest_float("learning_rate", 0.01, 0.1, log=True),
    }
    return cross_val_auc(LGBMClassifier(**params))

study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=cfg["optuna_trials"])

model = LGBMClassifier(**study.best_params, monotone_constraints=mono_vec)
model = CalibratedClassifierCV(model)  # Platt scaling`,
    },
  },
  {
    match: (t) => t.includes("alphaseekers"),
    peek: {
      language: "typescript",
      filePath: "retrieval.ts",
      code: `// AlphaSeekers RAG: cosine search over pgvector (Neon)
const rows = await prisma.$queryRawUnsafe(
  \`SELECT id, content, "sourceTitle",
          1 - (embedding <=> $1::vector) AS similarity
     FROM "DocumentChunk"
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> $1::vector
    LIMIT $2\`,
  vec, topK,
);
return rows.filter((r) => r.similarity >= 0.72);`,
    },
  },
];

function deriveLinks(p: any, status: WorkStatus): WorkLink[] {
  const links: WorkLink[] = [];
  const t = (p.title || "").toLowerCase();
  if (p.demo) {
    const external = p.demo.startsWith("http");
    const isPdf = p.demo.endsWith(".pdf");
    links.push({
      label: isPdf ? "Read the write-up (PDF)" : external ? "Live demo" : "Case study",
      href: p.demo,
      // PDFs are static documents — render as hard <a> navigations, never SPA links.
      external: external || isPdf,
    });
  }
  if (p.github && p.github !== "#") links.push({ label: "GitHub", href: p.github, external: true });
  if (
    t.includes("makermind") ||
    t.includes("takveenup") ||
    t.includes("alphaseekers") ||
    t.includes("ai monitoring")
  )
    links.push({ label: "See architecture", href: "/systems" });
  if (status === "coursework") links.push({ label: "Open in AI & ML 360 explorer", href: "/projects/ai360" });
  return links;
}

export const WORK: WorkItem[] = portfolioData.projects.map((p: any) => {
  const status = deriveStatus(p);
  const peek = PEEKS.find((x) => x.match((p.title || "").toLowerCase()))?.peek;
  return {
    id: slug(p.title),
    title: p.title,
    description: p.description,
    tech: p.tech || [],
    tags: p.tags || [],
    status,
    featured: !!p.featured,
    confidential: !!p.confidential,
    company: p.company,
    peek,
    links: deriveLinks(p, status),
  };
});

export const statusCount = (s: WorkStatus) => WORK.filter((w) => w.status === s).length;

/* Tech filters: a curated set that matches the real stacks (substring match). */
export const TECH_FILTERS = ["SQL", "Python", "PyTorch", "TypeScript", "Azure", "LLM", "React", "R"];
