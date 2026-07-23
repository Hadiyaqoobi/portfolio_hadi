import { Link } from "react-router-dom";
import { portfolioData } from "@/data/portfolio-data";

const { personal } = portfolioData;

/* Running head + drawing title block. The hero now LEADS with a five-second
   hook (problem-solver, in his voice) and pulls the EQR + AHRC proof above the
   fold, instead of opening on a dry "Subject of specification" kicker. Copy is
   honesty-checked: architected/owned (not built/led), fine-tuned (not trained),
   under review (not published); the 5 fine-tuned models are kept separate from
   the AHRC cascade. */

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
  // Rendered instantly (no scramble) — the job title is the most load-bearing
  // line in the 7-second scan and must be legible on first paint.
  const classification =
    "Problem-solver — IT Business Systems Analyst · AI Solution Architect";

  const cells: { label: string; value: React.ReactNode }[] = [
    { label: "Experience", value: "Enterprise (S&P 500) + applied AI" },
    { label: "Education", value: "Boston University (STEM MS) · Cornell AI & ML 360 certificate" },
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
      {/* Hook — the 5-second punch, leads above the name */}
      <p
        className="font-serif font-bold text-ink"
        style={{ fontSize: "clamp(21px, 3vw, 33px)", lineHeight: 1.28 }}
      >
        I've always sat between the business side and the engineers
        &mdash; the place where an idea either ships or quietly dies.
      </p>
      <p
        className="mt-2 font-serif text-ink-soft"
        style={{ fontSize: "clamp(16px, 2vw, 21px)", lineHeight: 1.42 }}
      >
        My whole career has been making sure it ships. First in data. Now in AI
        and automation.
      </p>

      <h1 className="mt-6 text-[clamp(44px,7.5vw,92px)]">{personal.name}</h1>

      <p
        className="mt-3 font-mono uppercase tracking-[0.08em]"
        style={{ fontSize: "clamp(12px, 1.5vw, 15px)", color: "#4A473E" }}
        aria-label="Problem-solver — IT Business Systems Analyst and AI Solution Architect"
      >
        {classification || " "}
      </p>

      <p className="mt-5 max-w-[72ch] text-[15.5px] leading-[1.62] text-ink-soft">
        I've spent my career as the analyst between business teams and
        engineering &mdash; most recently at Equity Residential, an S&amp;P 500
        company, where SQL was part of the daily job: pulling data for business
        partners, building dashboards, validating a 135,000-account Azure AD B2C migration.
        On my own I went deep on AI. I fine-tuned five machine-learning models
        in Python. One cut Dari transcription error from 57.8% to 27.3%. I
        architected the incident-monitoring system at the Afghan Human Right
        Center, and wrote a sole-author paper now under review at Springer. Underneath it: a STEM master's from Boston University and
        Cornell's AI and Machine Learning 360 certificate.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link
          to="/projects"
          className="border border-ink bg-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-paper transition-colors duration-150 hover:border-accent hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          See what I fixed &rarr;
        </Link>
        <span className="font-mono text-[10.5px] tracking-[0.06em] text-muted">
          Est. read 3 min &middot; Scroll to begin &darr;
        </span>
      </div>

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
