import { portfolioData } from "@/data/portfolio-data";
import { useDecode } from "./hooks";

const { personal } = portfolioData;

/* Running head + drawing title block. Copy follows the truth ledger where the
   handoff's reference text was stale (title order, experience line). */

export const RunningHead = () => (
  <div>
    <div className="flex flex-wrap items-baseline justify-between gap-2 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
      <span>Doc &middot; Portfolio-Spec / Hadi-Yaqoobi</span>
      <span>Rev 2026.2 &mdash; Boston, MA</span>
    </div>
    <div className="border-t-2 border-ink" />
  </div>
);

export const TitleBlock = ({ reduced }: { reduced: boolean }) => {
  const classification = useDecode(
    "IT Business Systems Analyst / Applied AI",
    reduced
  );

  const cells: { label: string; value: React.ReactNode }[] = [
    { label: "Prepared by", value: personal.name },
    { label: "Experience", value: "Enterprise (S&P 500) + applied AI" },
    {
      label: "Status",
      value: (
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-[7px] w-[7px] rounded-full"
            style={{
              background: "var(--ok)",
              animation: reduced ? "none" : "pulseDot 2s ease-in-out infinite",
            }}
          />
          Available
        </span>
      ),
    },
    { label: "Authorization", value: "Green Card · no sponsorship" },
    { label: "Based", value: "Boston, MA" },
    {
      label: "Contact",
      value: (
        <a href={`mailto:${personal.email}`} className="link">
          {personal.email}
        </a>
      ),
    },
  ];

  return (
    <header id="sec-top" className="scroll-mt-6 pt-9">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
        Subject of specification
      </p>
      <h1 className="mt-3 text-[clamp(48px,8.5vw,104px)]">{personal.name}</h1>
      <p
        className="mt-4 font-mono uppercase tracking-[0.08em]"
        style={{ fontSize: "clamp(12px, 1.5vw, 15px)", color: "#4A473E" }}
        aria-label="IT Business Systems Analyst / Applied AI"
      >
        {classification || " "}
      </p>
      <p className="mt-3 font-mono text-[11px] tracking-[0.06em] text-muted">
        Est. read 3 min &middot; 6 sections &middot; Scroll to begin &darr;
        &middot; Press J / K or 1&ndash;6 to jump
      </p>

      <div
        className="mt-7 grid gap-px border-2 border-ink bg-line-2"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {cells.map((c) => (
          <div key={c.label} className="bg-paper px-4 py-3">
            <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
              {c.label}
            </div>
            <div className="mt-0.5 text-[14px] font-semibold text-ink">
              {c.value}
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};
