import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, ArrowUpRight } from "lucide-react";
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

export const WorkLedger = () => {
  const [params, setParams] = useSearchParams();
  const [status, setStatus] = useState<WorkStatus | "all">((params.get("status") as WorkStatus) || "all");
  const [tech, setTech] = useState<string>(params.get("tech") || "all");
  const [query, setQuery] = useState(params.get("q") || "");
  const [open, setOpen] = useState<Set<string>>(new Set());

  // keep the URL in sync so a filtered view is shareable
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

  return (
    <div>
      {/* control strip */}
      <div className="mb-5">
        <div className="text-[12.5px] text-slate-500 mb-3">
          Showing <span className="text-slate-200 font-semibold">{sorted.length}</span> of {WORK.length} ·{" "}
          flagships pinned, the rest one click deep
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
      <div className="glass-card overflow-hidden">
        {sorted.length === 0 && (
          <div className="px-4 py-10 text-center text-slate-500 text-sm">No projects match that filter.</div>
        )}
        {sorted.map((w: WorkItem) => {
          const isOpen = open.has(w.id);
          return (
            <div key={w.id} className="border-b border-slate-800 last:border-b-0">
              <button
                onClick={() => toggle(w.id)}
                aria-expanded={isOpen}
                className="w-full text-left px-4 py-3.5 flex items-center gap-3 hover:bg-slate-800/40 transition-colors"
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${STATUS_META[w.status].dot}`} title={STATUS_META[w.status].label} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-100">{w.title}</span>
                    {w.featured && (
                      <span className="text-[8.5px] font-bold uppercase tracking-wider text-blue-300 border border-blue-500/30 rounded px-1 py-0.5">
                        pinned
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono truncate mt-0.5">
                    {w.tech.slice(0, 4).join("  ·  ")}
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 shrink-0 flex items-center gap-1">
                  {w.peek ? "peek code" : "details"}
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
                    <div
                      className={`px-4 pb-5 pt-1 grid gap-5 ${w.peek ? "md:grid-cols-2" : "grid-cols-1"}`}
                    >
                      <div>
                        <p className="text-slate-400 text-sm leading-relaxed">{w.description}</p>
                        {w.confidential && (
                          <p className="text-[11px] text-slate-500 mt-2 italic">
                            Confidential client work. Identifiers removed; the excerpt is sanitized.
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {w.tech.map((t) => (
                            <span key={t} className="text-[10.5px] text-slate-400 border border-slate-700 rounded px-1.5 py-0.5">
                              {t}
                            </span>
                          ))}
                        </div>
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
          );
        })}
      </div>
    </div>
  );
};
