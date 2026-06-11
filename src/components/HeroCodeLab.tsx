import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Loader2, ArrowUpRight } from "lucide-react";

/**
 * The hero code window, upgraded to a 4-tab runnable editor.
 * Every snippet is REAL code from Hadi's repos, sanitized (no secrets, no
 * proprietary identifiers; table/column names genericized). The console is a
 * labeled SIMULATION ("simulated output · real code") and only ever prints
 * canonical, verified numbers. Nothing auto-plays; Run is click-only and
 * reduced-motion prints instantly.
 */

type Lang = "ts" | "sql" | "py";
type Line = { text: string; tone?: "ok" | "accent" | "dim" };

type Tab = {
  id: string;
  filename: string;
  lang: Lang;
  badge: string;
  caption: string;
  project: { label: string; href: string; external?: boolean };
  code: string;
  output: Line[];
};

const TABS: Tab[] = [
  {
    id: "orchestrator",
    filename: "Orchestrator.ts",
    lang: "ts",
    badge: "Multi-agent · TypeScript",
    caption: "MakerMind turns plain English into safe firmware: Claude plans, GPT-4 codes, Gemini guards.",
    project: { label: "MakerMind", href: "/projects/makermind" },
    code: `async processRequest(
  request: UserRequest,
  context: ProjectContext
) {
  // Step 1 -> Claude plans
  const plan = await this
    .runPlannerLLM(request, context);

  // Step 2 -> GPT-4 writes patches
  const patches = await this
    .runCoderLLM(request, plan);

  // Step 3 -> Gemini Guardian validates
  const final = await this
    .runGuardianLLM(patches);

  return { success: true, plan, final };
}`,
    output: [
      { text: "Claude        -> plan: 3 steps" },
      { text: "GPT-4         -> 2 patches generated" },
      { text: "Gemini Guard  -> validation passed", tone: "ok" },
      { text: "patch applied · firmware ready", tone: "dim" },
    ],
  },
  {
    id: "rubs",
    filename: "rubs_audit.sql",
    lang: "sql",
    badge: "T-SQL · S&P 500 REIT",
    caption: "The dynamic SQL audit that caught a post-launch utility billing bug nobody else noticed.",
    project: { label: "The bug hunt", href: "/#bug-hunt" },
    code: `-- reconcile ledger truth vs stored estimate
-- charge codes ru1..ru20  x  bedroom types 0..3
SELECT
  CASE
    WHEN ABS(r.calc - a.amt) < 0.01 THEN 'MATCH'
    WHEN a.amt IS NULL              THEN 'MISSING'
    ELSE 'DIFFERENT'
  END AS status,
  r.charge_code, r.beds, r.calc, a.amt
FROM   #ledger_truth   r
FULL OUTER JOIN #stored_estimate a
  ON  a.charge_code = r.charge_code
  AND a.beds        = r.beds
ORDER BY status;`,
    output: [
      { text: "scanned 80 combinations (20 codes x 4 beds)" },
      { text: "79 MATCH" },
      { text: "1 DIFFERENT -> ru7 x 2BR flagged", tone: "accent" },
      { text: "root cause: bedroom-grouping edge case", tone: "dim" },
    ],
  },
  {
    id: "ner",
    filename: "train_ner.py",
    lang: "py",
    badge: "Python · spaCy NER",
    caption: "ROE-JobParse fine-tunes NER to pull skills and certifications out of messy job posts.",
    project: { label: "Skill Map", href: "/skills?s=nlp" },
    code: `# ROE-JobParse: fine-tune NER for SKILL / CERT / TITLE
import spacy
from spacy.training import Example
from spacy.util import minibatch, compounding

nlp = spacy.blank("en")
ner = nlp.add_pipe("ner")
for label in entity_types:        # SKILL, CERT, TITLE
    ner.add_label(label)

optimizer = nlp.begin_training()
best_loss, no_improve = float("inf"), 0

for epoch in range(epochs):
    random.shuffle(train_data)
    losses = {}
    for batch in minibatch(train_data,
                           size=compounding(4, 16, 1.001)):
        examples = [Example.from_dict(nlp.make_doc(t), a)
                    for t, a in batch]
        nlp.update(examples, drop=0.3, sgd=optimizer,
                   losses=losses)
    if losses["ner"] >= best_loss:
        no_improve += 1
        if no_improve >= patience:
            break                 # early stopping
nlp.to_disk(out_dir)              # versioned export`,
    output: [
      { text: "loaded synthetic annotations · SKILL / CERT / TITLE" },
      { text: "spaCy blank('en') · begin_training()" },
      { text: "training... epoch 1 -> 8 -> 17 -> 21" },
      { text: "early stopping at epoch 21 (patience reached)", tone: "dim" },
      { text: "evaluated with seqeval · precision / recall / F1", tone: "ok" },
      { text: "saved -> roe-jobparse-v5", tone: "dim" },
    ],
  },
  {
    id: "rag",
    filename: "retrieval.ts",
    lang: "ts",
    badge: "RAG · pgvector",
    caption: "AlphaSeekers finds the right textbook passage for a student's question, on free-tier infra.",
    project: { label: "AlphaSeekers", href: "https://alphaseekers.onrender.com/en", external: true },
    code: `// AlphaSeekers RAG: cosine search over pgvector (Neon)
export async function similaritySearch(
  queryEmbedding: number[],
  topK = aiConfig.rag.topK,                  // 3
  threshold = aiConfig.rag.similarityThreshold, // 0.72
): Promise<StoredChunk[]> {
  const vec = "[" + queryEmbedding.join(",") + "]";
  const rows = await prisma.$queryRawUnsafe<StoredChunk[]>(
    \`SELECT id, content, "sourceTitle", "chunkIndex",
            1 - (embedding <=> $1::vector) AS similarity
       FROM "DocumentChunk"
      WHERE embedding IS NOT NULL
      ORDER BY embedding <=> $1::vector
      LIMIT $2\`,
    vec, topK,
  );
  // keep only chunks above the similarity threshold
  return rows.filter((r) => r.similarity >= threshold);
}`,
    output: [
      { text: 'query: "how does photosynthesis work?"' },
      { text: "embed query · HF embeddings" },
      { text: "pgvector cosine search (embedding <=> query)" },
      { text: "top-3 chunks above 0.72 threshold", tone: "ok" },
      { text: "  light reactions · the Calvin cycle · chlorophyll", tone: "dim" },
      { text: "measured retrieval precision: 89%", tone: "accent" },
    ],
  },
];

/* ---- lightweight syntax highlighter (ts / sql / py) ---- */
const KW: Record<Lang, { comment: string; words: string[] }> = {
  ts: {
    comment: "//",
    words: ["async", "await", "const", "let", "return", "export", "function", "for", "if", "else", "new", "this", "import", "from", "type", "interface", "of", "Promise", "number", "string", "boolean"],
  },
  sql: {
    comment: "--",
    words: ["SELECT", "FROM", "FULL OUTER JOIN", "JOIN", "ON", "WHERE", "CASE", "WHEN", "THEN", "ELSE", "END", "AS", "AND", "OR", "ORDER BY", "IS", "NULL", "ABS", "COUNT", "LIMIT", "INSERT", "INTO", "VALUES", "DISTINCT"],
  },
  py: {
    comment: "#",
    words: ["import", "from", "for", "in", "if", "else", "elif", "break", "continue", "def", "return", "range", "lambda", "while", "and", "or", "not", "None", "True", "False", "class", "with"],
  },
};

function buildRegex(lang: Lang) {
  const words = [...KW[lang].words].sort((a, b) => b.length - a.length).map((w) => w.replace(/ /g, "\\s+"));
  return new RegExp(
    "(\"[^\"]*\"|'[^']*')|" + // strings
      "(\\b(?:" + words.join("|") + ")\\b)|" + // keywords
      "(\\b\\d+\\.?\\d*\\b)|" + // numbers
      "([A-Za-z_]\\w*(?=\\())", // function calls
    "g"
  );
}
const REGEX: Record<Lang, RegExp> = { ts: buildRegex("ts"), sql: buildRegex("sql"), py: buildRegex("py") };

function highlight(line: string, lang: Lang, key: number) {
  const cmt = KW[lang].comment;
  const ci = line.indexOf(cmt);
  const code = ci >= 0 ? line.slice(0, ci) : line;
  const comment = ci >= 0 ? line.slice(ci) : "";
  const nodes: React.ReactNode[] = [];
  const re = REGEX[lang];
  re.lastIndex = 0;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    if (m.index > last) nodes.push(code.slice(last, m.index));
    const [full, str, kw, num, fn] = m;
    if (str) nodes.push(<span key={nodes.length} className="code-string">{str}</span>);
    else if (kw) nodes.push(<span key={nodes.length} className="code-keyword">{kw}</span>);
    else if (num) nodes.push(<span key={nodes.length} className="code-number">{num}</span>);
    else if (fn) nodes.push(<span key={nodes.length} className="code-function">{fn}</span>);
    last = m.index + full.length;
  }
  if (last < code.length) nodes.push(code.slice(last));
  if (comment) nodes.push(<span key="c" className="code-comment">{comment}</span>);
  return (
    <div key={key} className="whitespace-pre">{nodes.length ? nodes : " "}</div>
  );
}

export const HeroCodeLab = () => {
  const [tabId, setTabId] = useState(TABS[0].id);
  const [execLine, setExecLine] = useState(-1);
  const [outN, setOutN] = useState(0);
  const [running, setRunning] = useState(false);
  const reduce = useReducedMotion();
  const timers = useRef<number[]>([]);

  const tab = TABS.find((t) => t.id === tabId) ?? TABS[0];
  const lines = tab.code.split("\n");

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const selectTab = (id: string) => {
    clearTimers();
    setTabId(id);
    setExecLine(-1);
    setOutN(0);
    setRunning(false);
  };

  const run = () => {
    clearTimers();
    if (reduce) {
      setExecLine(lines.length - 1);
      setOutN(tab.output.length);
      setRunning(false);
      return;
    }
    setRunning(true);
    setExecLine(0);
    setOutN(0);
    const step = 52;
    lines.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setExecLine(i), i * step));
    });
    const afterCode = lines.length * step + 180;
    tab.output.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setOutN(i + 1), afterCode + i * 230));
    });
    timers.current.push(
      window.setTimeout(() => {
        setExecLine(-1);
        setRunning(false);
      }, afterCode + tab.output.length * 230 + 250)
    );
  };

  const showConsole = outN > 0 || running;

  return (
    <div id="hero-code-lab" className="rounded-2xl overflow-hidden border border-slate-700 bg-[#1E293B] shadow-xl shadow-black/20">
      {/* chrome: traffic lights + editor tabs */}
      <div className="flex items-center gap-3 px-3 py-2.5 border-b border-slate-700">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        </div>
        <div role="tablist" aria-label="Code samples" className="flex gap-1 overflow-x-auto scrollbar-thin -mb-2.5 pb-2.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={t.id === tabId}
              onClick={() => selectTab(t.id)}
              className={`shrink-0 px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                t.id === tabId
                  ? "bg-slate-900/70 text-slate-100 border border-slate-600"
                  : "text-slate-500 hover:text-slate-300 border border-transparent"
              }`}
            >
              {t.filename}
            </button>
          ))}
        </div>
      </div>

      {/* badge + run */}
      <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-slate-800">
        <span className="text-[10px] font-medium uppercase tracking-wider text-blue-400 truncate">{tab.badge}</span>
        <button
          onClick={run}
          disabled={running}
          aria-label={`Run ${tab.filename}`}
          className="inline-flex items-center gap-1.5 shrink-0 rounded-md bg-blue-500/15 border border-blue-500/40 text-blue-300 hover:bg-blue-500/25 px-2.5 py-1 text-[11px] font-semibold transition-colors disabled:opacity-60"
        >
          {running ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
          {running ? "Running" : "Run"}
        </button>
      </div>

      {/* code */}
      <div className="font-mono text-[11.5px] leading-[1.65] h-[238px] overflow-auto scrollbar-thin">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`px-4 ${
              execLine === i ? "bg-blue-500/10 border-l-2 border-blue-500 pl-[14px]" : "border-l-2 border-transparent"
            }`}
          >
            {highlight(line, tab.lang, i)}
          </div>
        ))}
      </div>

      {/* console */}
      {showConsole && (
        <div className="border-t border-slate-700 bg-[#0B1120] px-4 py-2.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.14em] text-slate-500">simulated output · real code</span>
          </div>
          <div className="font-mono text-[11px] max-h-[120px] overflow-auto scrollbar-thin">
            {tab.output.slice(0, outN).map((l, i) => (
              <div
                key={i}
                className={`whitespace-pre ${
                  l.tone === "ok"
                    ? "text-emerald-300"
                    : l.tone === "accent"
                    ? "text-blue-300"
                    : l.tone === "dim"
                    ? "text-slate-500"
                    : "text-slate-300"
                }`}
              >
                {l.text}
              </div>
            ))}
            {running && outN < tab.output.length && <span className="text-blue-400">_</span>}
          </div>
        </div>
      )}

      {/* caption + project link */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-t border-slate-800">
        <span className="text-[10.5px] text-slate-500 leading-snug">{tab.caption}</span>
        {tab.project.external ? (
          <a
            href={tab.project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-0.5 text-[11px] font-medium text-blue-400 hover:text-blue-300"
          >
            {tab.project.label}
            <ArrowUpRight size={12} />
          </a>
        ) : (
          <Link
            to={tab.project.href}
            className="shrink-0 inline-flex items-center gap-0.5 text-[11px] font-medium text-blue-400 hover:text-blue-300"
          >
            {tab.project.label}
            <ArrowUpRight size={12} />
          </Link>
        )}
      </div>
    </div>
  );
};
