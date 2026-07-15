import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { SYSTEMS, STATUS_LABEL, type SystemStatus, type Lang } from "@/data/systems";

/* ---- compact ts/py highlighter, token colors only: comments muted,
   strings ink-soft, keywords bold ink. Everything else inherits ink. ---- */
const KW: Record<Lang, { comment: string; words: string[] }> = {
  ts: {
    comment: "//",
    words: ["export", "async", "await", "const", "let", "return", "function", "for", "if", "else", "new", "throw", "Error", "JSON", "Array", "true", "false"],
  },
  py: {
    comment: "#",
    words: ["import", "from", "for", "in", "if", "else", "def", "return", "range", "lambda", "while", "and", "or", "not", "None", "True", "False", "class", "with"],
  },
};
function buildRegex(lang: Lang) {
  const words = [...KW[lang].words].sort((a, b) => b.length - a.length);
  return new RegExp("(\"[^\"]*\"|'[^']*'|`[^`]*`)|(\\b(?:" + words.join("|") + ")\\b)", "g");
}
const REGEX: Record<Lang, RegExp> = { ts: buildRegex("ts"), py: buildRegex("py") };
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
    const [full, str, kw] = m;
    if (str) nodes.push(<span key={nodes.length} className="text-ink-soft">{str}</span>);
    else if (kw) nodes.push(<span key={nodes.length} className="font-semibold text-ink">{kw}</span>);
    last = m.index + full.length;
  }
  if (last < code.length) nodes.push(code.slice(last));
  if (comment) nodes.push(<span key="c" className="text-muted">{comment}</span>);
  return <div key={key} className="whitespace-pre">{nodes.length ? nodes : " "}</div>;
}

export const ArchitectureDiagram = () => {
  const [sysId, setSysId] = useState(SYSTEMS[0].id);
  const sys = SYSTEMS.find((s) => s.id === sysId) ?? SYSTEMS[0];
  const [stageId, setStageId] = useState(sys.stages[0].id);
  const stageIdx = Math.max(0, sys.stages.findIndex((s) => s.id === stageId));
  const stage = sys.stages[stageIdx] ?? sys.stages[0];

  const selectSystem = (id: string) => {
    const s = SYSTEMS.find((x) => x.id === id);
    if (!s) return;
    setSysId(id);
    setStageId(s.stages[0].id);
  };

  const status = (st: SystemStatus) =>
    st === "live" ? (
      <span className="inline-flex items-center gap-1.5 font-sans text-sm text-ok">
        <span className="w-1.5 h-1.5 rounded-full bg-ok" aria-hidden="true" />
        {STATUS_LABEL.live}
      </span>
    ) : (
      <span className="font-sans text-sm text-muted">{STATUS_LABEL[st]}</span>
    );

  return (
    <div>
      {/* system selector */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-line" role="tablist" aria-label="Systems">
        {SYSTEMS.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={s.id === sysId}
            onClick={() => selectSystem(s.id)}
            className={`pb-2 -mb-px border-b-2 font-sans text-sm transition-colors duration-150 ${
              s.id === sysId
                ? "border-accent text-accent"
                : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* tagline + status + link */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mt-5 mb-5">
        <p className="prose-measure text-ink-soft">{sys.tagline}</p>
        <div className="flex items-baseline gap-4 shrink-0">
          {status(sys.status)}
          {sys.link &&
            (sys.link.external ? (
              <a
                href={sys.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link font-sans text-sm"
              >
                {sys.link.label} <span aria-hidden="true">&#8599;</span>
              </a>
            ) : (
              <Link to={sys.link.href} className="link font-sans text-sm">
                {sys.link.label}
              </Link>
            ))}
        </div>
      </div>

      {/* the flow */}
      <div className="flex flex-col md:flex-row md:items-stretch">
        {sys.stages.map((st, i) => (
          <Fragment key={st.id}>
            <button
              onClick={() => setStageId(st.id)}
              aria-pressed={st.id === stageId}
              aria-label={`${st.label} stage`}
              className={`md:flex-1 text-left rounded-md border p-3.5 transition-colors duration-150 ${
                st.id === stageId
                  ? "border-accent bg-accent-soft"
                  : "border-line bg-paper-raised hover:border-ink-soft"
              }`}
            >
              <div className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</div>
              <div className="font-sans text-sm font-semibold text-ink mt-0.5">{st.label}</div>
              {st.agent && <div className="font-sans text-xs text-ink-soft mt-0.5 truncate">{st.agent}</div>}
              {sys.status === "designed" && (
                <div className="font-sans text-xs text-muted mt-1">design</div>
              )}
            </button>
            {i < sys.stages.length - 1 && (
              <div className="shrink-0 flex items-center justify-center py-1 md:py-0 md:px-1" aria-hidden="true">
                <div className="md:hidden w-px h-4 bg-line" />
                <div className="hidden md:block h-px w-5 bg-line" />
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {/* detail: description + real code */}
      <div className="mt-4 space-y-4">
        <div className="border border-line bg-paper-raised rounded-md p-5">
          <p className="kicker">
            {sys.name} · step {stageIdx + 1} of {sys.stages.length}
          </p>
          <h3 className="mt-1.5">
            {stage.label}
            {stage.agent && <span className="font-sans text-sm font-normal text-ink-soft"> · {stage.agent}</span>}
          </h3>
          <p className="font-sans text-sm text-ink-soft mt-2 leading-relaxed">{stage.desc}</p>
          <p className="font-sans text-xs text-muted mt-3">{stage.tech.join(" · ")}</p>
          {stage.file && <p className="font-mono text-xs text-muted mt-3 break-all">{stage.file}</p>}
        </div>

        <div className="border border-line bg-paper-raised rounded-md overflow-hidden">
          {stage.code ? (
            <>
              <div className="px-4 py-2 border-b border-line">
                <span className="font-mono text-xs text-muted">real code · sanitized</span>
              </div>
              <pre className="p-4 font-mono text-[0.8rem] leading-relaxed text-ink overflow-x-auto">
                {stage.code.split("\n").map((line, i) => highlight(line, stage.lang ?? "ts", i))}
              </pre>
            </>
          ) : sys.status === "designed" ? (
            <div className="text-center px-6 py-10">
              <p className="font-sans text-sm text-ink">Part of the approved design</p>
              <p className="font-sans text-sm text-muted mt-1">
                Build in progress, so there is no shipped code to show for this stage yet.
              </p>
            </div>
          ) : (
            <div className="text-center px-6 py-10">
              <p className="font-sans text-sm text-ink">Trained model</p>
              <p className="font-sans text-sm text-muted mt-1">
                This stage ships inside the product; the code excerpt is not bundled in this view.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
