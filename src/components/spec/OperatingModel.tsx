import { useReveal, revealStyle } from "./hooks";

/* Fig. 00 — the animated operating model: a flowing redline with three pulsing
   nodes, then three stage cells. Always visible near the top. */

const STAGES = [
  {
    num: "01",
    title: "Analyze",
    body: "Sit between the business and engineering; map the system as it is and as it must be.",
    artifacts: "BRD/FRD · gap analysis · SQL",
  },
  {
    num: "02",
    title: "Automate",
    body: "Replace the manual loop with a system that runs without me and fails loudly.",
    artifacts: "pipelines · validation engines",
  },
  {
    num: "03",
    title: "Deploy AI",
    body: "Put AI on top only where it earns its place, with humans over every decision that matters.",
    artifacts: "5 models · RAG · multi-agent",
  },
];

export const OperatingModel = ({ reduced }: { reduced: boolean }) => {
  const { ref, revealed } = useReveal<HTMLElement>();

  return (
    <figure
      ref={ref}
      data-reveal=""
      className="mx-0 mt-10 border-2 border-ink"
      style={revealStyle(revealed)}
    >
      {/* Flow track */}
      <div className="relative mx-4 my-6 h-[46px]">
        <div
          aria-hidden="true"
          className="absolute top-1/2 h-[2px] -translate-y-1/2"
          style={{ left: "8%", right: "8%", background: "var(--line)" }}
        />
        {!reduced && (
          <div
            aria-hidden="true"
            className="absolute top-1/2 h-[2px] -translate-y-1/2"
            style={{
              left: "8%",
              right: "8%",
              backgroundImage:
                "linear-gradient(90deg, transparent, #CB3A24 45%, #CB3A24 55%, transparent)",
              backgroundSize: "34% 100%",
              backgroundRepeat: "no-repeat",
              animation: "flowx 2.6s linear infinite",
            }}
          />
        )}
        {STAGES.map((s, i) => (
          <div
            key={s.num}
            className="absolute top-1/2 flex h-[34px] w-[34px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-paper font-mono text-[11px] font-semibold"
            style={{
              left: ["8%", "50%", "92%"][i],
              animation: reduced
                ? "none"
                : `nodePulse 3s ease-in-out ${i * 0.8}s infinite`,
            }}
          >
            {s.num}
          </div>
        ))}
      </div>

      {/* Stage cells */}
      <div
        className="grid gap-px border-t border-line-3 bg-line-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
      >
        {STAGES.map((s) => (
          <div key={s.title} className="bg-paper px-4 py-3.5">
            <div className="font-serif text-[17px] font-bold text-ink">
              {s.title}
            </div>
            <p className="mt-1 text-[13px] leading-snug text-ink-soft">
              {s.body}
            </p>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
              {s.artifacts}
            </div>
          </div>
        ))}
      </div>

      <figcaption className="flex flex-wrap justify-between gap-2 border-t border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        <span className="text-accent">Fig. 00 &mdash; Operating model</span>
        <span>Analyze &rarr; Automate &rarr; Deploy AI</span>
      </figcaption>
    </figure>
  );
};
