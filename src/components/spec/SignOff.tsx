import { Link } from "react-router-dom";
import { portfolioData } from "@/data/portfolio-data";
import { SectionHeader } from "./Chrome";
import { useReveal, revealStyle } from "./hooks";

const { personal } = portfolioData;

/* §05 Sign-off: contact actions + the OPEN TO WORK stamp and signature. */
export const SignOff = ({ reduced }: { reduced: boolean }) => {
  const { ref, revealed } = useReveal<HTMLElement>();
  const shown = reduced ? true : revealed;

  return (
    <section
      id="sec-signoff"
      ref={ref}
      data-reveal=""
      className="mt-[clamp(44px,6vw,72px)] scroll-mt-6"
      style={revealStyle(shown)}
    >
      <SectionHeader num="05" title="Sign-off" tag="Contact" />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
        <div className="max-w-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            Approved for
          </p>
          <p
            className="mt-1.5 font-serif text-ink"
            style={{ fontSize: "clamp(19px, 2.4vw, 26px)", lineHeight: 1.3 }}
          >
            Full-lifecycle ownership, requirements to production.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="border border-ink bg-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-paper transition-colors duration-150 hover:border-accent hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              {personal.email} &rarr;
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink transition-colors duration-150 hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              LinkedIn &#8599;
            </a>
            <a
              href="https://github.com/Hadiyaqoobi"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink transition-colors duration-150 hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              GitHub &#8599;
            </a>
          </div>
        </div>

        <div className="text-right">
          <div
            className="inline-block border-2 border-accent px-4 py-2 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-accent"
            style={{
              transform: "rotate(-9deg)",
              animation:
                shown && !reduced
                  ? "stampIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.3s both"
                  : "none",
            }}
          >
            Open to work
          </div>
          <p className="mt-4 font-serif text-[34px] italic leading-none text-ink">
            {personal.name.replace("M. ", "")}
          </p>
          <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
            Boston &middot; 2026
          </p>
        </div>
      </div>
    </section>
  );
};

export const SpecFooter = () => (
  <footer className="mt-[clamp(44px,6vw,72px)]">
    <div className="border-t-2 border-ink pt-3 pb-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
        <span>&mdash; End of document &mdash;</span>
        <span className="flex flex-wrap gap-x-3">
          <Link to="/projects" className="link">Work</Link>
          <Link to="/systems" className="link">Systems</Link>
          <Link to="/skills" className="link">Skills</Link>
          <Link to="/education" className="link">Education</Link>
          <Link to="/about" className="link">About</Link>
        </span>
        <span>Portfolio-Spec &middot; Rev 2026.2</span>
      </div>
    </div>
  </footer>
);
