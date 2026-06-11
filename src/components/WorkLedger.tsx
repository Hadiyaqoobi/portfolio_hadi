import { Fragment, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, ArrowUpRight, Code2 } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import {
  WORK,
  STATUS_META,
  STATUS_ORDER,
  statusCount,
  TECH_FILTERS,
  type WorkStatus,
  type WorkItem,
} from "@/data/work";

const chip = (active: boolean) =>
  `rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors ${
    active
      ? "border-blue-500 text-blue-300 bg-blue-500/10"
      : "border-slate-700 text-slate-400 hover:text-slate-200"
  }`;

const SHORT: Record<WorkStatus, string> = {
  live: "Live",
  dev: "In dev",
  research: "Research",
  enterprise: "Enterprise",
  coursework: "Coursework",
};
const STATUS_PILL: Record<WorkStatus, string> = {
  live: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
  dev: "border-blue-500/40 text-blue-300 bg-blue-500/10",
  research: "border-violet-500/40 text-violet-300 bg-violet-500/10",
  enterprise: "border-slate-500/50 text-slate-200 bg-slate-600/25",
  coursework: "border-sky-500/40 text-sky-300 bg-sky-500/10",
};

export const WorkLedger = () => {
  const [params, setParams] = useSearchParams();
  const [status, setStatus] = useState<WorkStatus | "all">((params.get("status") as WorkStatus) || "all");
  const [tech, setTech] = useState<string>(params.get("tech") || "all");
  const [query, setQuery] = useState(params.get("q") || "");
  const [open, setOpen] = useState<Set<string>>(new Set());

  useEffect(() => {
    const next = new URLSearchParams();
    if (status !== "all") next.set("status", status);
    if (tech !== "all") next.set("tech", tech);
    if (query) next.set("q", query);
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, tech, query]);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const filtered = WORK.filter((w) => {
    if (status !== "all" && w.status !== status) return false;
    if (tech !== "all" && !w.tech.some((t) => t.toLowerCase().includes(tech.toLowerCase()))) return false;
    if (query) {
      const hay = `${w.title} ${w.tech.join(" ")} ${w.tags.join(" ")} ${w.description}`.toLowerCase();
      if (!hay.includes(query.toLowerCase())) return false;
    }
    return true;
  });
  const sorted = [...filtered].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status) ||
      a.title.localeCompare(b.title)
  );
  const grouped = status === "all" && tech === "all" && !query;

  return (
    <div>
      {/* control strip */}
      <div className="mb-6">
        <div className="text-[12.5px] text-slate-500 mb-3">
          Showing <span className="text-slate-200 font-semibold">{sorted.length}</span> of {WORK.length} ·{" "}
          flagships first, everything one click deep
        </div>

        <div className="flex flex-wrap gap-2 mb-2.5" role="group" aria-label="Filter by status">
          <button onClick={() => setStatus("all")} aria-pressed={status === "all"} className={chip(status === "all")}>
            All
          </button>
          {STATUS_ORDER.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(status === s ? "all" : s)}
              aria-pressed={status === s}
              className={`inline-flex items-center gap-1.5 ${chip(status === s)}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${STATUS_META[s].dot}`} />
              {STATUS_META[s].label}
              <span className="text-slate-500">{statusCount(s)}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-600 mr-0.5">tech</span>
          {TECH_FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => setTech(tech === t ? "all" : t)}
              aria-pressed={tech === t}
              className={`text-[11px] rounded-md border px-2 py-1 transition-colors ${
                tech === t
                  ? "border-blue-500 text-blue-300 bg-blue-500/10"
                  : "border-slate-700 text-slate-500 hover:text-slate-300"
              }`}
            >
              {t}
            </button>
          ))}
          <div className="relative ml-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search the work"
              aria-label="Search projects"
              className="bg-slate-900/60 border border-slate-700 rounded-full text-sm text-slate-200 pl-9 pr-4 py-1.5 min-w-[190px] focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* the ledger */}
      {sorted.length === 0 && (
        <div className="glass-card px-4 py-12 text-center text-slate-500 text-sm">
          No projects match that filter.
        </div>
      )}

      <div className="space-y-2.5">
        {sorted.map((w: WorkItem, i) => {
          const isOpen = open.has(w.id);
          const flagHeader = grouped && i === 0 && w.featured;
          const moreHeader = grouped && !w.featured && (i === 0 || sorted[i - 1].featured);
          return (
            <Fragment key={w.id}>
              {flagHeader && (
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold px-1 pb-0.5">
                  Flagship work
                </div>
              )}
              {moreHeader && (
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold px-1 pt-4 pb-0.5">
                  More work
                </div>
              )}
              <div
                className={`group rounded-xl border bg-slate-900/40 transition-all hover:-translate-y-0.5 hover:bg-slate-800/40 ${
                  isOpen
                    ? "border-blue-500/40 bg-slate-800/40"
                    : w.featured
                    ? "border-slate-600/70"
                    : "border-slate-800"
                }`}
              >
                <button
                  onClick={() => toggle(w.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 flex items-start gap-3.5"
                >
                  <span
                    className={`shrink-0 mt-0.5 inline-flex items-center rounded-full border px-2.5 py-1 text-[10.5px] font-semibold ${STATUS_PILL[w.status]}`}
                  >
                    {SHORT[w.status]}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-semibold text-slate-100 leading-snug group-hover:text-white transition-colors">
                      {w.title}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {w.tech.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="text-[10.5px] text-slate-400 border border-slate-700/80 rounded px-1.5 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="shrink-0 self-center inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-[12px] font-medium text-slate-400 group-hover:border-blue-500/50 group-hover:text-blue-300 transition-colors">
                    {w.peek && <Code2 size={13} />}
                    {w.peek ? "Peek code" : "Details"}
                    <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="border-t border-slate-800 mx-4" />
                      <div className={`p-4 grid gap-5 ${w.peek ? "md:grid-cols-2" : "grid-cols-1"}`}>
                        <div>
                          <p className="text-slate-400 text-sm leading-relaxed">{w.description}</p>
                          {w.confidential && (
                            <p className="text-[11px] text-slate-500 mt-2 italic">
                              Confidential client work. Identifiers removed; the excerpt is sanitized.
                            </p>
                          )}
                          {w.links.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-4">
                              {w.links.map((l) =>
                                l.external ? (
                                  <a
                                    key={l.href + l.label}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[12.5px] font-medium text-blue-400 hover:text-blue-300"
                                  >
                                    {l.label}
                                    <ArrowUpRight size={13} />
                                  </a>
                                ) : (
                                  <Link
                                    key={l.href + l.label}
                                    to={l.href}
                                    className="inline-flex items-center gap-1 text-[12.5px] font-medium text-blue-400 hover:text-blue-300"
                                  >
                                    {l.label}
                                    <ArrowUpRight size={13} />
                                  </Link>
                                )
                              )}
                            </div>
                          )}
                        </div>

                        {w.peek && (
                          <div>
                            <CodeBlock code={w.peek.code} language={w.peek.language} filePath={w.peek.filePath} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
