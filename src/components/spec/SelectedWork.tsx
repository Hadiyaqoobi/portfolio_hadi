import { useRef, useState } from "react";
import { WORK } from "@/data/work";
import type { CodePeek } from "@/data/work";
import { SectionHeader } from "./Chrome";
import { useReveal, revealStyle } from "./hooks";

/* §03 Selected work: four entries, Problem/Approach/Result rows, progressive-
   disclosure code exhibits sourced from work.ts (real, sanitized peeks). */

const peekFor = (needle: string): CodePeek | undefined =>
  WORK.find((w) => w.title.toLowerCase().includes(needle))?.peek;

const CodeExhibit = ({
  peek,
  exhibitNum,
  reduced,
}: {
  peek: CodePeek;
  exhibitNum: string;
  reduced: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 border border-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink transition-colors duration-150 hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200"
          style={{ transform: open ? "rotate(90deg)" : "none" }}
        >
          &#9656;
        </span>
        {open ? "Hide implementation" : "View implementation"}
      </button>
      <div
        ref={panelRef}
        style={{
          maxHeight: open ? panelRef.current?.scrollHeight ?? 600 : 0,
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: reduced
            ? "none"
            : "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
        }}
      >
        <div
          className="mt-3 border p-4"
          style={{ background: "var(--code-bg)", borderColor: "var(--code-border)" }}
        >
          <div className="mb-2 flex justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.1em]">
            <span style={{ color: "var(--accent)" }}>{peek.filePath}</span>
            <span style={{ color: "var(--code-comment)" }}>
              Exhibit {exhibitNum}
            </span>
          </div>
          <pre
            className="overflow-x-auto font-mono text-[12.5px] leading-[1.65]"
            style={{ color: "var(--code-text)" }}
          >
            <code>{peek.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

const PARRow = ({ label, text, result }: { label: string; text: string; result?: boolean }) => (
  <div className="flex flex-col gap-1 py-1.5 sm:flex-row sm:gap-0">
    <span className="w-[84px] shrink-0 font-mono text-[10.5px] uppercase tracking-[0.06em] text-accent">
      {label}
    </span>
    <span
      className={`text-[14.5px] leading-[1.55] ${
        result ? "font-medium text-ink" : "text-ink-soft"
      }`}
    >
      {text}
    </span>
  </div>
);

const Tag = ({ children, live }: { children: React.ReactNode; live?: boolean }) => (
  <span
    className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]"
    style={
      live
        ? {
            color: "var(--ok)",
            borderColor: "var(--ok-border)",
            background: "var(--ok-bg)",
          }
        : { color: "var(--muted)", borderColor: "var(--line)" }
    }
  >
    {children}
  </span>
);

/* Fig 3.2 — the MakerMind pipeline as a smaller flow figure. */
const PipelineFigure = ({ reduced }: { reduced: boolean }) => {
  const nodes = [
    { model: "Claude", role: "plan" },
    { model: "GPT-4", role: "code" },
    { model: "Gemini", role: "validate" },
    { model: "Guardian", role: "guard · 5,531 LOC" },
  ];
  return (
    <figure className="mx-0 mt-4 border border-line">
      <div
        className="grid gap-px bg-line-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
      >
        {nodes.map((n, i) => (
          <div key={n.model} className="bg-paper px-3 py-3 text-center">
            <div
              className="mx-auto flex h-[28px] w-[28px] items-center justify-center rounded-full border-2 border-ink bg-paper font-mono text-[10px] font-semibold"
              style={{
                animation: reduced
                  ? "none"
                  : `nodePulse 3.2s ease-in-out ${i * 0.7}s infinite`,
              }}
            >
              {`0${i + 1}`}
            </div>
            <div className="mt-1.5 font-serif text-[15px] font-bold">{n.model}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
              {n.role}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="border-t border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        <span className="text-accent">Fig. 3.2</span> &mdash; Four stages, three
        models checking each other
      </figcaption>
    </figure>
  );
};

/* Fig 3.4 — TakveenUp NER F1 progress as bars, animated on the figure's own
   reveal so the motion happens in view. */
const F1Figure = ({ reduced }: { reduced: boolean }) => {
  const { ref, revealed } = useReveal<HTMLElement>();
  const active = reduced ? true : revealed;
  const bars = [
    { v: "v1", w: 55, label: "0.55", accent: false },
    { v: "v5", w: 74.76, label: "0.7476", accent: true },
  ];
  return (
    <figure ref={ref} className="mx-0 mt-4 border border-line px-4 py-3.5">
      {bars.map((b, i) => (
        <div key={b.v} className="flex items-center gap-3 py-1.5">
          <span className="w-6 font-mono text-[11px] text-muted">{b.v}</span>
          <div className="h-[14px] flex-1 bg-line-3">
            <div
              className="h-full"
              style={{
                width: active || reduced ? `${b.w}%` : 0,
                background: b.accent ? "var(--accent)" : "var(--ink)",
                transition: reduced
                  ? "none"
                  : `width 1.1s cubic-bezier(0.22,1,0.36,1) ${140 + i * 170}ms`,
              }}
            />
          </div>
          <span
            className={`w-14 text-right font-mono text-[12px] ${
              b.accent ? "text-accent" : "text-ink"
            }`}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {b.label}
          </span>
        </div>
      ))}
      <figcaption className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        <span className="text-accent">Fig. 3.4</span> &mdash; +36% F1 over 5
        training cycles
      </figcaption>
    </figure>
  );
};

export const SelectedWork = ({ reduced }: { reduced: boolean }) => {
  const { ref, revealed } = useReveal<HTMLElement>();
  const shown = reduced ? true : revealed;

  const sqlPeek = peekFor("regulatory compliance");
  const makerPeek = peekFor("makermind");
  const alphaPeek = peekFor("alphaseekers");
  const nerPeek = peekFor("takveenup");

  return (
    <section
      id="sec-work"
      ref={ref}
      data-reveal=""
      className="mt-[clamp(44px,6vw,72px)] scroll-mt-6"
      style={revealStyle(shown)}
    >
      <SectionHeader
        num="03"
        title="Selected work"
        tag="Specifications · 04 — tap to expand"
      />

      {/* 3.1 */}
      <article className="border-b border-line py-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[12px] text-accent">3.1</span>
            <h3 className="font-serif font-bold" style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>
              Zero-Critical-Incident Cloud Migration
            </h3>
          </div>
          <Tag>Enterprise · S&amp;P 500 · Confidential</Tag>
        </div>
        <div className="mt-3">
          <PARRow label="Problem" text="The authentication migration had stalled for months across six teams with no single owner." />
          <PARRow label="Approach" text="Took ownership of the full SDLC: dependency mapping, BRDs, and coordination of CloudOps, Infrastructure, SecOps, AppOps, and DevOps across four phases." />
          <PARRow result label="Result" text="135,000+ resident accounts on Azure B2C with zero critical incidents." />
        </div>
        {sqlPeek && <CodeExhibit peek={sqlPeek} exhibitNum="3.1" reduced={reduced} />}
      </article>

      {/* 3.2 */}
      <article className="border-b border-line py-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[12px] text-accent">3.2</span>
            <h3 className="font-serif font-bold" style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>
              MakerMind
            </h3>
          </div>
          <Tag>AI Architecture · Independent R&amp;D</Tag>
        </div>
        <div className="mt-3">
          <PARRow label="Problem" text="No single LLM reliably plans, codes, and validates microcontroller firmware." />
          <PARRow label="Approach" text="A 4-stage multi-agent pipeline: Claude plans, GPT-4 codes, Gemini validates, and a patch engine applies changes." />
          <PARRow result label="Result" text="A 5,531-line Guardian safety engine checks every output before it reaches hardware." />
        </div>
        <PipelineFigure reduced={reduced} />
        <div className="flex flex-wrap items-center gap-3">
          {makerPeek && <CodeExhibit peek={makerPeek} exhibitNum="3.2" reduced={reduced} />}
          <a
            href="https://github.com/Hadiyaqoobi"
            target="_blank"
            rel="noopener noreferrer"
            className="link mt-4 font-mono text-[11px] uppercase tracking-[0.1em]"
          >
            GitHub &#8599;
          </a>
        </div>
      </article>

      {/* 3.3 */}
      <article className="border-b border-line py-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[12px] text-accent">3.3</span>
            <h3 className="font-serif font-bold" style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>
              AlphaSeekers
            </h3>
          </div>
          <Tag live>Live · Product</Tag>
        </div>
        <div className="mt-3">
          <PARRow label="Problem" text="Learners on 2G networks where data costs $5 per gigabyte, with a near-zero budget." />
          <PARRow label="Approach" text="Dual data store with in-memory fallback, circuit-breaker notifications, RAG on pgvector plus Groq." />
          <PARRow result label="Result" text="Live with 200 registered users at $0/month infrastructure." />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {alphaPeek && <CodeExhibit peek={alphaPeek} exhibitNum="3.3" reduced={reduced} />}
          <a
            href="https://alphaseekers.org/en"
            target="_blank"
            rel="noopener noreferrer"
            className="link mt-4 font-mono text-[11px] uppercase tracking-[0.1em]"
          >
            Live demo &#8599;
          </a>
        </div>
      </article>

      {/* 3.4 */}
      <article className="py-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[12px] text-accent">3.4</span>
            <h3 className="font-serif font-bold" style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>
              TakveenUp
            </h3>
          </div>
          <Tag>ML Systems · In development</Tag>
        </div>
        <div className="mt-3">
          <PARRow label="Problem" text="Skilled multilingual workers get filtered out by keyword-matching ATS systems." />
          <PARRow label="Approach" text="Trained 5 models from scratch (XLM-RoBERTa NER, e5 embeddings, LoRA Whisper for Dari, LightGBM), each with a 3-level fallback chain." />
          <PARRow result label="Result" text="NER F1 0.7476; embeddings correctly separate 24 of 25 occupational codes." />
        </div>
        <F1Figure reduced={reduced} />
        {nerPeek && <CodeExhibit peek={nerPeek} exhibitNum="3.4" reduced={reduced} />}
      </article>
    </section>
  );
};
