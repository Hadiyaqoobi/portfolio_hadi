/**
 * Architecture explorer data.
 *
 * Every code excerpt is REAL, pulled from Hadi's repos and sanitized (no
 * secrets; generic identifiers). Stage descriptions are verified. Status is
 * honest: live / in development / designed (build in progress). Numbers shown
 * are canonical only. AHRC is DESIGNED, so its stages describe the design and
 * carry no code.
 */

export type Lang = "ts" | "py";
export type SystemStatus = "live" | "dev" | "designed";

export interface Stage {
  id: string;
  label: string;
  agent?: string; // model/tech shown on the node, e.g. "Claude"
  desc: string;
  tech: string[];
  file?: string;
  lang?: Lang;
  code?: string;
}

export interface SystemDef {
  id: string;
  name: string;
  status: SystemStatus;
  tagline: string;
  link?: { label: string; href: string; external?: boolean };
  stages: Stage[];
}

export const STATUS_LABEL: Record<SystemStatus, string> = {
  live: "Live",
  dev: "In development",
  designed: "Designed, build in progress",
};

export const SYSTEMS: SystemDef[] = [
  {
    id: "makermind",
    name: "MakerMind",
    status: "dev",
    tagline: "Plain English to safe Arduino firmware, through three AI models that check each other.",
    link: { label: "Case study", href: "/projects/makermind" },
    stages: [
      {
        id: "planner",
        label: "Planner",
        agent: "Claude",
        desc: "Decomposes the request into a structured hardware design: components, connections, difficulty. Runs through a provider chain with automatic fallback.",
        tech: ["Claude", "TypeScript"],
        file: "apps/api/.../pipeline/stages/planner.ts",
        lang: "ts",
        code: `export async function executePlannerStage(userRequest, constraints) {
  const systemPrompt = constraints?.board
    ? buildPlannerSystemPrompt(constraints.board)
    : PLANNER_SYSTEM_PROMPT;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: buildPlannerUserMessage(userRequest, constraints) },
  ];

  // provider chain with automatic fallback
  const response = await executeWithFallback({
    messages, config: PROVIDER_CONFIG.planner, stage: "planner",
  });

  return parsePlannerResponse(response.content); // components + connections
}`,
      },
      {
        id: "coder",
        label: "Coder",
        agent: "GPT-4",
        desc: "Generates the firmware, pin map, and library list from the plan, targeting the specific board.",
        tech: ["GPT-4", "TypeScript"],
        file: "apps/api/.../pipeline/stages/coder.ts",
        lang: "ts",
        code: `export async function executeCoderStage(design, boardFqbn) {
  const systemPrompt = buildCoderSystemPrompt(boardFqbn);

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: buildCoderUserMessage(design, boardFqbn) },
  ];

  const response = await executeWithFallback({
    messages, config: PROVIDER_CONFIG.coder, stage: "coder",
  });

  return parseCoderResponse(response.content); // { code, pinMap, libraries }
}`,
      },
      {
        id: "guardian",
        label: "Guardian",
        agent: "Gemini",
        desc: "AI safety validation layered on a deterministic rules engine. It fails closed: when validation errors, the safety score is -1 (unknown), never 'safe by default'.",
        tech: ["Gemini", "Rules engine"],
        file: "apps/api/.../pipeline/stages/guardianAI.ts",
        lang: "ts",
        code: `// Stage 3: AI safety validation on top of a rules engine.
export async function executeGuardianAIStage(design, code, userRequest, rulesResult) {
  const response = await executeWithFallback({
    messages: [
      { role: "system", content: GUARDIAN_SYSTEM_PROMPT },
      { role: "user", content: buildGuardianUserMessage(design, code, userRequest, rulesResult) },
    ],
    config: PROVIDER_CONFIG.guardian, stage: "guardian",
  });
  return parseGuardianResponse(response.content);
}

// Fails closed. A failed check scores -1, never a passing score.
catch (error) {
  return {
    safetyScore: -1, // validation failed = unknown, NOT safe
    additionalIssues: [{ severity: "warning",
      message: "AI safety validation failed, manual review required" }],
  };
}`,
      },
      {
        id: "patcher",
        label: "Patcher",
        desc: "Fixes the issues the Guardian and the rules engine flagged, then re-emits the corrected design and code. Only code that clears validation reaches the board.",
        tech: ["TypeScript", "LLM"],
        file: "apps/api/.../pipeline/stages/patcher.ts",
        lang: "ts",
        code: `// Stage 4: fix the issues the Guardian and rules engine found.
export async function executePatcherStage(design, code, issues) {
  const messages = [
    { role: "system", content: PATCHER_SYSTEM_PROMPT },
    { role: "user", content: buildPatcherUserMessage(design, code, issues) },
  ];

  const response = await executeWithFallback({
    messages, config: PROVIDER_CONFIG.patcher, stage: "patcher",
  });

  return parsePatcherResponse(response.content); // { changes, design }
}`,
      },
    ],
  },
  {
    id: "rag",
    name: "AlphaSeekers RAG",
    status: "live",
    tagline: "Finds the right textbook passage for a student's question, on free-tier infrastructure, for 2G networks.",
    link: { label: "Live demo", href: "https://alphaseekers.org/en", external: true },
    stages: [
      {
        id: "chunk",
        label: "Chunk",
        desc: "Recursive splitting that prefers paragraph, then sentence, then word boundaries, with overlap for context. Dari-aware: it splits on the Dari period and comma, and counts tokens for Arabic script differently.",
        tech: ["RTL / Dari"],
        file: "src/lib/ai/chunker.ts",
        lang: "ts",
        code: `// Dari-aware boundaries. The Dari period and comma are included for RTL.
const SEPARATORS = ["\\n\\n", "\\n", ". ", "۔ ", "، ", ", ", " ", ""];

// English ~4 chars/token. Dari / Arabic script ~2 chars/token.
function estimateTokenCount(text) {
  const hasArabicScript = /[\\u0600-\\u06FF]/.test(text);
  return Math.ceil(text.length / (hasArabicScript ? 2 : 4));
}`,
      },
      {
        id: "embed",
        label: "Embed",
        agent: "all-MiniLM-L6-v2",
        desc: "all-MiniLM-L6-v2 (384-dim) through the HuggingFace Inference API, batched to respect the free tier, with a dimension check.",
        tech: ["HuggingFace", "384-dim"],
        file: "src/lib/ai/embeddings.ts",
        lang: "ts",
        code: `export async function generateEmbedding(text) {
  const { apiToken, model, dimension } = aiConfig.embeddings;

  const res = await fetch(\`\${HF_URL}/\${model}/pipeline/feature-extraction\`, {
    method: "POST",
    headers: { Authorization: \`Bearer \${apiToken}\` },
    body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
  });

  const data = await res.json();
  const embedding = Array.isArray(data[0]) ? data[0] : data;
  if (embedding.length !== dimension) throw new Error("unexpected embedding dim");
  return embedding;
}`,
      },
      {
        id: "retrieve",
        label: "Retrieve",
        agent: "pgvector",
        desc: "pgvector cosine search on Neon. A two-stage, enrollment-aware variant searches the student's own class first, then fills from the global pool, so an English A2 student gets English A2 answers.",
        tech: ["pgvector", "Neon", "0.72 threshold"],
        file: "src/lib/ai/vector-store.ts",
        lang: "ts",
        code: `const rows = await prisma.$queryRawUnsafe(
  \`SELECT id, content, "sourceTitle",
          1 - (embedding <=> $1::vector) AS similarity
     FROM "DocumentChunk"
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> $1::vector
    LIMIT $2\`,
  vec, topK,
);
// keep only chunks above the similarity threshold (0.72)
return rows.filter((r) => r.similarity >= threshold);`,
      },
      {
        id: "answer",
        label: "Answer",
        agent: "Groq Llama 3.1",
        desc: "Groq Llama 3.1 8B streams the answer over SSE (chosen over WebSockets for Afghan ISPs), with a Gemma fallback and an AI safety log. Measured 89% retrieval precision.",
        tech: ["Groq", "SSE", "89% precision"],
        file: "src/lib/ai/rag-pipeline.ts",
        lang: "ts",
        code: `// Orchestrates: query -> embed -> search -> prompt -> stream
// Stream the answer via Groq (Llama 3.1), Gemma fallback.
await streamCompletionWithFallback(messages, {
  onToken: (t)        => controller.enqueue(sse({ type: "token", token: t })),
  onDone:  (latencyMs)=> controller.enqueue(sse({ type: "done", latencyMs })),
});
// then: log the AI interaction + safety check for review`,
      },
    ],
  },
  {
    id: "roe",
    name: "ROE model engine",
    status: "dev",
    tagline: "Turns messy multilingual work history into matched occupations and a retention signal. Five models trained.",
    link: { label: "Skill Map", href: "/skills?s=ml" },
    stages: [
      {
        id: "ner",
        label: "Extract",
        agent: "NER",
        desc: "Fine-tuned NER pulls SKILL, CERT, and TITLE spans out of messy job and resume text across English, Dari, and Pashto.",
        tech: ["spaCy", "Python"],
        file: "ROE-JobParse/train.py",
        lang: "py",
        code: `# fine-tune NER to extract SKILL / CERT / TITLE spans
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
      {
        id: "embed",
        label: "Match",
        agent: "multilingual-e5",
        desc: "A fine-tuned multilingual-e5-large maps work narratives to O*NET occupation codes, separating 24 of 25 after hard-negative mining recovered a failed first version.",
        tech: ["sentence-transformers", "24/25 codes"],
      },
      {
        id: "match",
        label: "Score",
        agent: "LightGBM",
        desc: "A calibrated LightGBM predicts 90-day job retention. Optuna tunes it, monotonic constraints encode domain knowledge, and Platt scaling calibrates the probabilities. Automated leakage detection blocks training on contaminated data.",
        tech: ["LightGBM", "Optuna", "calibration"],
        file: "ROE-Match/train.py",
        lang: "py",
        code: `# Optuna HPO over LightGBM
def objective(trial):
    params = {
        "n_estimators":  trial.suggest_int("n_estimators", 100, 500),
        "num_leaves":    trial.suggest_int("num_leaves", 20, 100),
        "learning_rate": trial.suggest_float("learning_rate", 0.01, 0.1, log=True),
    }
    m = LGBMClassifier(**params)
    # ... cross-validated with early stopping
    return cv_auc

study = optuna.create_study(direction="maximize", study_name="roe_match")
study.optimize(objective, n_trials=cfg["optuna_trials"])

# domain knowledge as monotonic constraints, then calibrate
model = LGBMClassifier(**study.best_params, monotone_constraints=mono_vec)
model = CalibratedClassifierCV(model)  # Platt scaling`,
      },
    ],
  },
  {
    id: "ahrc",
    name: "AHRC monitoring",
    status: "designed",
    tagline: "A board-approved hybrid LLM design for human-rights monitoring, built against a real adversary threat model.",
    link: { label: "What it is", href: "/projects" },
    stages: [
      {
        id: "ingest",
        label: "Ingest",
        desc: "Collects from 10+ Dari, Pashto, and English sources, with multilingual de-duplication so the same incident is not counted twice.",
        tech: ["Multilingual", "Dedup"],
      },
      {
        id: "classify",
        label: "Classify",
        desc: "Commercial LLM API now, a custom first-stage classifier later. The phased path is projected to cut inference cost by about 95%.",
        tech: ["LLM API", "Custom model later"],
      },
      {
        id: "record",
        label: "Record",
        desc: "ICC-aligned incident records: a violation-type taxonomy, geographic and temporal metadata, and a source-verification chain for chain of custody.",
        tech: ["ICC standards"],
      },
      {
        id: "review",
        label: "Review",
        desc: "Human review before anything publishes, immutable audit trails, and row-level security across three sensitivity tiers, with Taliban intelligence services in the threat model.",
        tech: ["Row-level security", "Audit trail"],
      },
    ],
  },
];
