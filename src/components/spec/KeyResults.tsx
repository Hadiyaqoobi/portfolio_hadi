import { portfolioData } from "@/data/portfolio-data";
import { SectionHeader } from "./Chrome";
import { useReveal, revealStyle, useCountUp } from "./hooks";

const { personal } = portfolioData;

/* §01 Summary + §02 Key results (leader-dot rows with count-ups).
   Result 3's framing is deliberate and ruled: lead with "sole-author study"
   and "Springer"; the 90.3% stays a muted clarifier, never a big number. */

export const Summary = ({ reduced }: { reduced: boolean }) => {
  const { ref, revealed } = useReveal<HTMLElement>();
  return (
    <section
      id="sec-summary"
      ref={ref}
      data-reveal=""
      className="mt-[clamp(44px,6vw,72px)] scroll-mt-6"
      style={revealStyle(reduced ? true : revealed)}
    >
      <SectionHeader num="01" title="Summary" tag="Abstract" />
      <p
        className="mt-6 max-w-[30ch] font-serif font-bold text-ink"
        style={{ fontSize: "clamp(21px, 3vw, 31px)", lineHeight: 1.32 }}
      >
        The rare part isn't the data or the AI. It's{" "}
        <span className="text-accent">both</span>.
      </p>
      <p className="mt-5 max-w-[66ch] text-[16px] leading-[1.65] text-ink-soft">
        I've spent years deep in enterprise data at S&amp;P 500 scale, and the
        last few building and fine-tuning AI models myself. Most people work one
        side. I bring the same discipline to both: I build
        for the version that survives real use.
      </p>
    </section>
  );
};

const CountValue = ({
  target,
  comma,
  active,
  reduced,
  suffix,
}: {
  target: number;
  comma?: boolean;
  active: boolean;
  reduced: boolean;
  suffix?: string;
}) => {
  const value = useCountUp(target, { active, comma, reduced });
  return (
    <>
      {value}
      {suffix}
    </>
  );
};

const RESULTS: {
  n: string;
  label: string;
  value: (active: boolean, reduced: boolean) => React.ReactNode;
  clarifier: string;
  accent?: boolean;
}[] = [
  {
    n: "2.1",
    label: "Azure AD B2C migration — I owned validation & stabilization",
    value: (a, r) => <CountValue target={135000} comma active={a} reduced={r} />,
    clarifier: "· accounts, six teams",
    accent: true,
  },
  {
    n: "2.2",
    label: "ML models I built (LoRA fine-tunes + gradient boosting)",
    value: (a, r) => <CountValue target={5} active={a} reduced={r} />,
    clarifier: "· on synthetic data",
  },
  {
    n: "2.3",
    label: "LLM-annotator reliability — sole-author study, 90.3% false-discovery rate",
    value: () => "Springer",
    clarifier: "· under review",
    accent: true,
  },
  {
    n: "2.4",
    label: "Learners on a platform I shipped for a refugee-education org",
    value: (a, r) => <CountValue target={285} active={a} reduced={r} />,
    clarifier: "· ConnectionHub",
  },
];

export const KeyResults = ({ reduced }: { reduced: boolean }) => {
  const { ref, revealed } = useReveal<HTMLElement>();
  const shown = reduced ? true : revealed;
  return (
    <section
      id="sec-results"
      ref={ref}
      data-reveal=""
      className="mt-[clamp(44px,6vw,72px)] scroll-mt-6"
      style={revealStyle(shown)}
    >
      <SectionHeader num="02" title="Key results" tag="Signals" />
      <div className="mt-4">
        {RESULTS.map((r) => (
          <div
            key={r.n}
            className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line py-4 transition-[padding-left] duration-150 hover:pl-2"
          >
            <span className="w-[46px] shrink-0 font-mono text-[12px] text-accent">
              {r.n}
            </span>
            <span className="text-[15.5px] font-semibold text-ink">
              {r.label}
            </span>
            <span
              aria-hidden="true"
              className="mx-1 hidden min-w-[3rem] flex-1 self-center sm:block"
              style={{ borderBottom: "1px dotted var(--leader)" }}
            />
            <span
              className={`font-serif text-[22px] font-bold ${
                r.accent ? "text-accent" : "text-ink"
              }`}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {r.value(shown, reduced)}
            </span>
            {r.clarifier && (
              <span className="font-mono text-[11px] text-muted">
                {r.clarifier}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
