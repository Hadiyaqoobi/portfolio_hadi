import { useRef, useState } from "react";
import { WORK } from "@/data/work";
import type { CodePeek } from "@/data/work";
import { Link } from "react-router-dom";
import { SectionHeader } from "./Chrome";
import { useReveal, revealStyle } from "./hooks";

/* §03 Selected work: four entries, Problem/Approach/Result rows, progressive-
   disclosure code exhibits sourced from work.ts (real, sanitized peeks).
   Anchored on the two identities: EQR (BSA) + AHRC (AI), with the model core
   and AlphaSeekers as supporting depth. Every claim honesty-checked. */

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
    <div className="mt-4 min-w-0 max-w-full">
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

const PARRow = ({ label, text, result }: { label: string; text: React.ReactNode; result?: boolean }) => (
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

/* Fig 3.2 — the AHRC cascade: cheap model triages, stronger one classifies,
   strongest handles low-confidence, and a person reviews every case. */
const CascadeFigure = ({ reduced }: { reduced: boolean }) => {
  const nodes = [
    { model: "Haiku", role: "triage" },
    { model: "Sonnet", role: "classify" },
    { model: "Opus", role: "escalation only" },
    { model: "Human", role: "reviews every case" },
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
        <span className="text-accent">Fig. 3.2</span> &mdash; Cost-tiered cascade,
        a person over every decision
      </figcaption>
    </figure>
  );
};

/* Fig 3.4 — Dari speech recognition: word-error rate before and after LoRA
   fine-tuning. Shorter bar is better; measured on synthetic held-out data. */
const WerFigure = ({ reduced }: { reduced: boolean }) => {
  const { ref, revealed } = useReveal<HTMLElement>();
  const active = reduced ? true : revealed;
  const bars = [
    { v: "zero-shot", w: 57.8, label: "57.8%", accent: false },
    { v: "fine-tuned", w: 27.3, label: "27.3%", accent: true },
  ];
  return (
    <figure ref={ref} className="mx-0 mt-4 border border-line px-4 py-3.5">
      {bars.map((b, i) => (
        <div key={b.v} className="flex items-center gap-3 py-1.5">
          <span className="w-20 font-mono text-[11px] text-muted">{b.v}</span>
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
        <span className="text-accent">Fig. 3.4</span> &mdash; Dari word-error rate,
        cut from 57.8% to 27.3% (synthetic eval)
      </figcaption>
    </figure>
  );
};

export const SelectedWork = ({ reduced }: { reduced: boolean }) => {
  const { ref, revealed } = useReveal<HTMLElement>();
  const shown = reduced ? true : revealed;

  const sqlPeek = peekFor("regulatory compliance");
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
        tag="Four projects · tap to expand"
      />

      {/* 3.1 — EQR reconciliation (BSA flagship) */}
      <article className="border-b border-line py-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[12px] text-accent">3.1</span>
            <h3 className="font-serif font-bold" style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>
              Utility-billing reconciliation
            </h3>
          </div>
          <Tag>Enterprise · S&amp;P 500</Tag>
        </div>
        <div className="mt-3">
          <PARRow label="Problem" text="Resident utility charges are split by a formula, and I didn't trust that the numbers posting to the ledger matched what the formula said." />
          <PARRow label="Approach" text="I wrote a T-SQL harness that recomputes every average from the raw data and diffs it against the system of record — 80 charge-code and bedroom combinations across 12 months, 960 checks in all." />
          <PARRow result label="Result" text={<>It caught two silent errors that were mis-billing residents: a key stored as <code className="font-mono text-[13px]">ru</code> in one table and <code className="font-mono text-[13px]">RU</code> in another, and a unit number with a trailing space. Run on QA copies only.</>} />
        </div>
        {sqlPeek && <CodeExhibit peek={sqlPeek} exhibitNum="3.1" reduced={reduced} />}
      </article>

      {/* 3.2 — AHRC (AI architecture anchor) */}
      <article className="border-b border-line py-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[12px] text-accent">3.2</span>
            <h3 className="font-serif font-bold" style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>
              AHRC incident-monitoring system
            </h3>
          </div>
          <Tag>AI architecture · Contract</Tag>
        </div>
        <div className="mt-3">
          <PARRow label="Problem" text="Human-rights reports arrive in three languages and have to be classified the same way every time, without ever leaking a detail that could identify a source." />
          <PARRow label="Approach" text="I designed a cost-tiered Claude cascade — a cheap model triages, a stronger one classifies, the strongest only handles low-confidence cases — with a person reviewing every result before it's published, against a UN-treaty taxonomy across 34 provinces." />
          <PARRow result label="Result" text="Built and close to launch. I own the architecture; my team writes the code. It's designed so it can't retain the PII that would put a source at risk." />
        </div>
        <CascadeFigure reduced={reduced} />
        <Link
          to="/systems"
          className="link mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.1em]"
        >
          See architecture &rarr;
        </Link>
      </article>

      {/* 3.3 — AlphaSeekers (live product, supporting) */}
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
          <PARRow label="Problem" text="Learners on 2G networks, where a gigabyte of data costs about $5, and a near-zero budget to work with." />
          <PARRow label="Approach" text="A retrieval-augmented study assistant on pgvector, with an in-memory fallback and circuit-breaker notifications so it degrades instead of going down." />
          <PARRow result label="Result" text="Live for a refugee-education organization. 200 registered users, all on free-tier infrastructure." />
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

      {/* 3.4 — Fine-tuned model core (hands-on AI, supporting) */}
      <article className="py-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[12px] text-accent">3.4</span>
            <h3 className="font-serif font-bold" style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>
              Fine-tuned model core
            </h3>
          </div>
          <Tag>Applied ML · Research</Tag>
        </div>
        <div className="mt-3">
          <PARRow label="Problem" text="Skilled multilingual workers get filtered out by keyword-matching applicant systems. And Dari has almost no speech or language data to build on." />
          <PARRow label="Approach" text="I fine-tuned five models — a LoRA Whisper for Dari speech, an XLM-RoBERTa skill classifier, an e5 bi-encoder for matching, and two calibrated gradient-boosted models — after generating the synthetic data to train them." />
          <PARRow result label="Result" text="Dari speech-recognition error fell from 57.8% to 27.3%, and the skill classifier reached F1 0.95. Both measured on synthetic held-out data — real-world accuracy is still unmeasured, and I say so." />
        </div>
        <WerFigure reduced={reduced} />
        <div className="flex flex-wrap items-center gap-3">
          {nerPeek && <CodeExhibit peek={nerPeek} exhibitNum="3.4" reduced={reduced} />}
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
    </section>
  );
};
