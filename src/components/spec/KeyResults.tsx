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
        className="mt-6 max-w-[24ch] font-serif font-bold text-ink"
        style={{ fontSize: "clamp(21px, 3vw, 31px)", lineHeight: 1.32 }}
      >
        I analyze enterprise systems, automate them, and put{" "}
        <span className="text-accent">working AI</span> on top.
      </p>
      <p className="mt-5 max-w-[66ch] text-[16px] leading-[1.65] text-ink-soft">
        {personal.subtitle}
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
    label: "Cloud migration, Azure AD B2C",
    value: (a, r) => <CountValue target={135000} comma active={a} reduced={r} suffix="+" />,
    clarifier: "· zero critical incidents",
    accent: true,
  },
  {
    n: "2.2",
    label: "ML models trained from scratch (PyTorch, LightGBM)",
    value: (a, r) => <CountValue target={5} active={a} reduced={r} />,
    clarifier: "",
  },
  {
    n: "2.3",
    label: "LLM-annotator reliability, sole-author study · found 90.3% FDR",
    value: () => "Springer",
    clarifier: "· under review",
    accent: true,
  },
  {
    n: "2.4",
    label: "Live product on $0/mo infrastructure",
    value: (a, r) => <CountValue target={200} active={a} reduced={r} />,
    clarifier: "· registered users",
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
