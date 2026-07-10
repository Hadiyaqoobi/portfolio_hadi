import { Fragment, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  WORK,
  STATUS_META,
  STATUS_ORDER,
  statusCount,
  TECH_FILTERS,
  type WorkStatus,
  type WorkItem,
  type CodePeek,
} from "@/data/work";

const SHORT: Record<WorkStatus, string> = {
  live: "Live",
  dev: "In dev",
  research: "Research",
  enterprise: "Enterprise",
  coursework: "Coursework",
};

const statusTab = (active: boolean) =>
  `font-sans text-sm pb-2 -mb-px border-b-2 transition-colors duration-150 ${
    active ? "text-ink border-accent" : "text-muted border-transparent hover:text-ink-soft"
  }`;

const techTab = (active: boolean) =>
  `font-sans text-xs pb-0.5 border-b-2 transition-colors duration-150 ${
    active ? "text-ink border-accent" : "text-muted border-transparent hover:text-ink-soft"
  }`;

/** Status as a small text label; only a live product earns the green dot. */
const StatusLabel = ({ status }: { status: WorkStatus }) =>
  status === "live" ? (
    <span className="font-sans text-xs text-ok">
      <span aria-hidden="true">&#9679; </span>
      Live
    </span>
  ) : (
    <span className="font-sans text-xs text-muted">{SHORT[status]}</span>
  );

/** Inline code peek: quiet ruled block on raised paper, real sanitized code. */
const Peek = ({ peek }: { peek: CodePeek }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(peek.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable; nothing to do */
    }
  };

  return (
    <figure className="overflow-hidden rounded-md border border-line bg-paper-raised">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-3.5 py-2">
        <span className="truncate font-mono text-xs text-muted">{peek.filePath}</span>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 font-sans text-xs text-muted transition-colors duration-150 hover:text-ink"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <pre className="overflow-x-auto px-3.5 py-3 font-mono text-[0.8rem] leading-relaxed text-ink-soft">
        <code>{peek.code}</code>
      </pre>
    </figure>
  );
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
      if (n.has(id)) {
        n.delete(id);
      } else {
        n.add(id);
      }
      return n;
    });

  const filtered = WORK.filter((w) => {
    if (status !== "all" && w.status !== status) return false;
    if (tech !== "all") {
      const q = tech.toLowerCase();
      // Single-letter filters (R) need exact-token match; substring would hit "React", "PyTorch"…
      const hit = w.tech.some((t) => (q.length <= 2 ? t.toLowerCase() === q : t.toLowerCase().includes(q)));
      if (!hit) return false;
    }
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
      <div className="mb-8">
        <div className="flex flex-wrap gap-x-5 gap-y-1 border-b border-line" role="group" aria-label="Filter by status">
          <button
            type="button"
            onClick={() => setStatus("all")}
            aria-pressed={status === "all"}
            className={statusTab(status === "all")}
          >
            All <span className="text-muted">{WORK.length}</span>
          </button>
          {STATUS_ORDER.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(status === s ? "all" : s)}
              aria-pressed={status === s}
              className={statusTab(status === s)}
            >
              {STATUS_META[s].label} <span className="text-muted">{statusCount(s)}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2" role="group" aria-label="Filter by tech">
          <span className="font-sans text-xs text-muted">Tech</span>
          {TECH_FILTERS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTech(tech === t ? "all" : t)}
              aria-pressed={tech === t}
              className={techTab(tech === t)}
            >
              {t}
            </button>
          ))}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the work"
            aria-label="Search projects"
            className="ml-auto w-full min-w-0 rounded-md border border-line bg-paper-raised px-3 py-1.5 font-sans text-sm text-ink transition-colors duration-150 placeholder:text-muted focus:border-ink focus:outline-none sm:w-auto sm:min-w-[180px]"
          />
        </div>

        <p className="mt-4 font-sans text-xs text-muted">
          Showing <span className="text-ink">{sorted.length}</span> of {WORK.length} projects
        </p>
      </div>

      {/* the ledger */}
      {sorted.length === 0 ? (
        <p className="border-y border-line py-10 text-center font-sans text-sm text-muted">
          No projects match that filter.
        </p>
      ) : (
        <div className="border-b border-line">
          {sorted.map((w: WorkItem, i) => {
            const isOpen = open.has(w.id);
            const flagHeader = grouped && i === 0 && w.featured;
            const moreHeader = grouped && !w.featured && (i === 0 || sorted[i - 1].featured);
            return (
              <Fragment key={w.id}>
                {flagHeader && <p className="kicker pb-2">Flagship work</p>}
                {moreHeader && (
                  <p className={`kicker pb-2 ${i === 0 ? "" : "mt-8 border-t border-line pt-4"}`}>More work</p>
                )}
                <div className="border-t border-line">
                  <button
                    type="button"
                    onClick={() => toggle(w.id)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-baseline gap-4 py-4 text-left"
                  >
                    <span className="w-24 shrink-0">
                      <StatusLabel status={w.status} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-sans text-[0.95rem] font-medium leading-snug text-ink">
                        {w.title}
                      </span>
                      {w.tech.length > 0 && (
                        <span className="mt-1 block font-sans text-xs text-muted">
                          {w.tech.slice(0, 5).join(" · ")}
                        </span>
                      )}
                    </span>

                    <span className="inline-flex shrink-0 items-center gap-1 self-center font-sans text-xs text-muted transition-colors duration-150 group-hover:text-ink">
                      <span className="hidden sm:inline">{w.peek ? "Peek code" : "Details"}</span>
                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-6">
                      <div className={`grid gap-5 ${w.peek ? "md:grid-cols-2" : ""}`}>
                        <div className="min-w-0">
                          <p className="max-w-[68ch] font-serif text-[0.95rem] leading-relaxed text-ink-soft">
                            {w.description}
                          </p>
                          {w.confidential && (
                            <p className="mt-2 font-sans text-xs italic text-muted">
                              Confidential client work. Identifiers removed; the excerpt is sanitized.
                            </p>
                          )}
                          {w.links.length > 0 && (
                            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm">
                              {w.links.map((l) =>
                                l.external ? (
                                  <a
                                    key={l.href + l.label}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link"
                                  >
                                    {l.label} <span aria-hidden="true">&#8599;</span>
                                  </a>
                                ) : (
                                  <Link key={l.href + l.label} to={l.href} className="link">
                                    {l.label}
                                  </Link>
                                )
                              )}
                            </p>
                          )}
                        </div>

                        {w.peek && (
                          <div className="min-w-0">
                            <Peek peek={w.peek} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};
