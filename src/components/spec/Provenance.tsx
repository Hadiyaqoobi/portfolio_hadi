import { Link } from "react-router-dom";
import { SectionHeader } from "./Chrome";
import { useReveal, revealStyle } from "./hooks";

/* §04 Provenance: the career reframed as document revisions. Rows follow the
   truth-passed timeline data; the handoff's stale rows were corrected. */

const ROWS = [
  {
    rev: "0.1",
    period: "2019–2021",
    entry: "ConnectionHub",
    detail:
      "Systems and analysis for a refugee-education nonprofit: a Salesforce CRM data model, a localized (Farsi) WordPress site, and curriculum operations — 285 learners across 753 enrollments, on a free-tier stack.",
  },
  {
    rev: "0.2",
    period: "2024–2025",
    entry: "Equity Residential · S&P 500",
    detail:
      "IT Business Systems Analyst. Daily T-SQL — reconciliation and business-partner data pulls. On a 135,000-account Azure AD B2C migration run across six teams, I owned the validation, the go/no-go reporting, and the stabilization after launch.",
  },
  {
    rev: "1.0",
    period: "2025–now",
    entry: "AHRC + applied AI",
    detail:
      "Business Systems Manager (contract). Architected an AI incident-monitoring system — built and close to launch. Fine-tuned five ML models; a sole-author paper under review at Springer's Empirical Software Engineering.",
  },
];

export const Provenance = ({ reduced }: { reduced: boolean }) => {
  const { ref, revealed } = useReveal<HTMLElement>();
  return (
    <section
      id="sec-provenance"
      ref={ref}
      data-reveal=""
      className="mt-[clamp(44px,6vw,72px)] scroll-mt-6"
      style={revealStyle(reduced ? true : revealed)}
    >
      <SectionHeader num="04" title="Experience" tag="Provenance · revision history" />

      <div className="mt-5 overflow-x-auto">
        <div
          className="grid min-w-[560px] gap-px border-2 border-ink bg-line-2"
          style={{ gridTemplateColumns: "64px 118px 1fr" }}
        >
          <div className="bg-ink px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-paper">
            Rev
          </div>
          <div className="bg-ink px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-paper">
            Period
          </div>
          <div className="bg-ink px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-paper">
            Entry
          </div>
          {ROWS.map((r) => (
            <div key={r.rev} className="contents">
              <div className="bg-paper px-3 py-3 font-mono text-[12px] text-accent">
                {r.rev}
              </div>
              <div className="bg-paper px-3 py-3 font-mono text-[12px] text-muted">
                {r.period}
              </div>
              <div className="bg-paper px-3 py-3">
                <div className="text-[14.5px] font-semibold text-ink">
                  {r.entry}
                </div>
                <div className="mt-0.5 text-[13px] leading-snug text-ink-soft">
                  {r.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.1em] leading-relaxed text-muted">
        References &mdash; Equity Residential &middot; Cornell (AI &amp; Machine
        Learning 360) &middot;
        Boston University (Questrom, STEM MS) &middot; Harvard (CS50) &middot;
        Stanford (Algorithms) &middot; Springer (under review) &middot; NYU (edX
        MicroBachelors) &middot;{" "}
        <Link to="/timeline" className="link normal-case">
          full record
        </Link>
      </p>
    </section>
  );
};
