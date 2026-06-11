import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SYSTEMS, STATUS_LABEL, type SystemStatus, type Lang } from "@/data/systems";

/* ---- compact ts/py highlighter, site code-* colors ---- */
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
  return new RegExp(
    "(\"[^\"]*\"|'[^']*'|`[^`]*`)|(\\b(?:" + words.join("|") + ")\\b)|(\\b\\d+\\.?\\d*\\b)|([A-Za-z_]\\w*(?=\\())",
    "g"
  );
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
    const [full, str, kw, num, fn] = m;
    if (str) nodes.push(<span key={nodes.length} className="code-string">{str}</span>);
    else if (kw) nodes.push(<span key={nodes.length} className="code-keyword">{kw}</span>);
    else if (num) nodes.push(<span key={nodes.length} className="code-number">{num}</span>);
    else if (fn) nodes.push(<span key={nodes.length} className="code-function">{fn}</span>);
    last = m.index + full.length;
  }
  if (last < code.length) nodes.push(code.slice(last));
  if (comment) nodes.push(<span key="c" className="code-comment">{comment}</span>);
  return <div key={key} className="whitespace-pre">{nodes.length ? nodes : " "}</div>;
}

const statusBadge: Record<SystemStatus, string> = {
  live: "text-emerald-300 border-emerald-500/40 bg-emerald-500/10",
  dev: "text-blue-300 border-blue-500/40 bg-blue-500/10",
  designed: "text-slate-300 border-slate-600 bg-slate-700/30",
};
const statusDot: Record<SystemStatus, string> = {
  live: "bg-emerald-400",
  dev: "bg-blue-400",
  designed: "bg-slate-400",
};

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

  return (
    <div>
      {/* system selector */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Systems">
        {SYSTEMS.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={s.id === sysId}
            onClick={() => selectSystem(s.id)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              s.id === sysId
                ? "border-blue-500 text-blue-300 bg-blue-500/10"
                : "border-slate-700 text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[s.status]}`} />
            {s.name}
          </button>
        ))}
      </div>

      {/* tagline + status + link */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <p className="text-slate-400 text-[15px] max-w-2xl leading-relaxed">{sys.tagline}</p>
        <div className="flex items-center gap-3 shrink-0">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusBadge[sys.status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[sys.status]}`} />
            {STATUS_LABEL[sys.status]}
          </span>
          {sys.link &&
            (sys.link.external ? (
              <a href={sys.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-[12px] font-medium text-blue-400 hover:text-blue-300">
                {sys.link.label}
                <ArrowUpRight size={13} />
              </a>
            ) : (
              <Link to={sys.link.href} className="inline-flex items-center gap-0.5 text-[12px] font-medium text-blue-400 hover:text-blue-300">
                {sys.link.label}
                <ArrowUpRight size={13} />
              </Link>
            ))}
        </div>
      </div>

      {/* the flow */}
      <div className="glass-card p-5 md:p-7 mb-4">
        <div className="flex flex-col md:flex-row md:items-stretch">
          {sys.stages.map((st, i) => (
            <Fragment key={st.id}>
              <button
                onClick={() => setStageId(st.id)}
                aria-pressed={st.id === stageId}
                aria-label={`${st.label} stage`}
                className={`md:flex-1 text-left rounded-xl border p-4 transition-all ${
                  st.id === stageId
                    ? "border-blue-500 bg-blue-500/10 shadow-[0_0_24px_-8px_rgba(59,130,246,0.5)]"
                    : "border-slate-700 bg-slate-900/30 hover:border-slate-500"
                }`}
              >
                <div className="text-[10px] font-mono text-slate-500">{String(i + 1).padStart(2, "0")}</div>
                <div className="text-sm font-bold text-slate-100 mt-0.5">{st.label}</div>
                {st.agent && <div className="text-[11px] text-blue-300 font-medium mt-0.5 truncate">{st.agent}</div>}
                {sys.status === "designed" && (
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 mt-1.5">design</div>
                )}
              </button>
              {i < sys.stages.length - 1 && (
                <div className="shrink-0 flex items-center justify-center py-1.5 md:py-0 md:px-1.5" aria-hidden="true">
                  <div className="md:hidden w-[2px] h-5 rounded flow-line-y" />
                  <div className="hidden md:block h-[2px] w-9 rounded flow-line-x" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* detail: description + real code */}
      <div className="grid md:grid-cols-[1fr_1.25fr] gap-4 items-stretch">
        <div className="glass-card p-5">
          <div className="text-[11px] uppercase tracking-[0.14em] text-blue-400 mb-1.5">
            {sys.name} · step {stageIdx + 1} of {sys.stages.length}
          </div>
          <h3 className="text-xl font-bold text-slate-100">
            {stage.label}
            {stage.agent && <span className="text-slate-400 text-sm font-normal"> · {stage.agent}</span>}
          </h3>
          <p className="text-slate-400 text-sm mt-2.5 leading-relaxed">{stage.desc}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {stage.tech.map((t) => (
              <span key={t} className="text-[10.5px] text-slate-400 border border-slate-700 rounded px-2 py-0.5">
                {t}
              </span>
            ))}
          </div>
          {stage.file && <div className="text-[11px] text-slate-600 font-mono mt-4 break-all">{stage.file}</div>}
        </div>

        <div className="rounded-xl border border-slate-700 bg-[#0B1120] overflow-hidden flex flex-col">
          {stage.code ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono ml-1">real code · sanitized</span>
              </div>
              <pre className="p-4 font-mono text-[11.5px] leading-[1.65] text-slate-300 overflow-auto scrollbar-thin flex-1">
                {stage.code.split("\n").map((line, i) => highlight(line, stage.lang ?? "ts", i))}
              </pre>
            </>
          ) : sys.status === "designed" ? (
            <div className="m-auto text-center text-slate-500 px-6 py-12">
              <div className="text-3xl text-slate-600 mb-3">◆</div>
              <div className="text-slate-300 text-sm font-medium">Part of the approved design</div>
              <div className="text-[12.5px] mt-1.5 leading-relaxed">
                Build in progress, so there is no shipped code to show for this stage yet.
              </div>
            </div>
          ) : (
            <div className="m-auto text-center text-slate-500 px-6 py-12">
              <div className="text-3xl text-slate-600 mb-3">◆</div>
              <div className="text-slate-300 text-sm font-medium">Trained model</div>
              <div className="text-[12.5px] mt-1.5 leading-relaxed">
                This stage ships inside the product; the code excerpt is not bundled in this view.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
