import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { portfolioData } from "@/data/portfolio-data";

const { personal, projects } = portfolioData;

/* The migration card reuses the verified project copy verbatim. */
const migration = projects.find((p) =>
  p.title.startsWith("Zero-Incident Cloud Migration")
);
const alphaseekers = projects.find((p) => p.title.startsWith("AlphaSeekers"));
const makermind = projects.find((p) => p.title.startsWith("MakerMind"));

const sections = [
  { id: "sec-0", num: "0", label: "Abstract" },
  { id: "sec-1", num: "1", label: "Profile" },
  { id: "sec-2", num: "2", label: "Systems Shipped" },
  { id: "sec-3", num: "3", label: "Verified Outcomes" },
  { id: "sec-4", num: "4", label: "Capabilities" },
  { id: "sec-5", num: "5", label: "Revision History" },
  { id: "sec-6", num: "6", label: "Distribution" },
];

/* Career rows, reverse-chronological. Text matches the timeline data. */
const revisionRows = [
  {
    rev: "2025.2",
    period: "2025 –",
    role: "Business Systems Manager (Contract)",
    org: "Afghan Human Right Center",
  },
  {
    rev: "2024.1",
    period: "2024 – 25",
    role: "IT Business Systems Analyst",
    org: "Equity Residential (S&P 500)",
  },
  {
    rev: "2023.3",
    period: "2023 –",
    role: "Technical Product Lead, Applied R&D",
    org: "Independent R&D (self-funded)",
  },
  {
    rev: "2023.2",
    period: "2023 – 24",
    role: "Admissions Analyst",
    org: "Questrom School of Business, Boston University",
  },
  {
    rev: "2023.1",
    period: "2023 – 24",
    role: "MS in Management Studies, Data Analytics (STEM)",
    org: "Boston University, Questrom",
  },
  {
    rev: "2021.1",
    period: "2021 – 23",
    role: "Leasing Consultant",
    org: "Equity Residential",
    note: "Leasing Consultant of the Year",
  },
  {
    rev: "2019.1",
    period: "2019 – 21",
    role: "IT Business Systems Analyst",
    org: "ConnectionHub, Istanbul",
  },
  {
    rev: "2015.1",
    period: "2015 – 20",
    role: "BA in Aviation Management, High Honors",
    org: "Kocaeli University",
    note: "UNHCR DAFI Scholar · YTB Turkiye Burslari",
  },
];

const outcomes = [
  {
    figure: "135K+",
    text: "Accounts migrated to Azure B2C across six teams, four phases.",
    check: "Zero critical",
  },
  {
    figure: "5",
    text: "ML models trained from scratch across PyTorch and LightGBM.",
    check: "Trained",
  },
  {
    figure: "200",
    text: "Registered users on AlphaSeekers, at zero infrastructure cost.",
    check: "Live",
  },
  {
    figure: "104",
    text: "Manual query executions eliminated per year by one production stored procedure.",
    check: "Automated",
  },
];

const capabilities = [
  {
    key: "Daily Drivers",
    val: "SQL (SQL Server, PostgreSQL) · Python · Excel / VBA · Azure DevOps · Power BI",
  },
  {
    key: "Architecture & Cloud",
    val: "Azure (AD B2C, Entra ID) · Snowflake · Salesforce · React / TypeScript",
  },
  {
    key: "AI & ML",
    val: "PyTorch · XLM-RoBERTa, Whisper, sentence-transformers · LightGBM, scikit-learn · LLM APIs (Anthropic, OpenAI, Gemini) · LoRA, synthetic data",
  },
  {
    key: "Methods",
    val: "Agile / Scrum, SDLC · BRD / FRD authoring · stakeholder management · gap analysis · UAT · process improvement",
  },
];

const SectionMark = ({
  num,
  label,
  children,
}: {
  num: string;
  label: string;
  children?: React.ReactNode;
}) => (
  <div className="sec-mark">
    &sect;{num}
    <br />
    <span>{label}</span>
    {children}
  </div>
);

const SpecCell = ({ k, v }: { k: string; v: string }) => (
  <div>
    <div className="spec-key">{k}</div>
    <div className="spec-val">{v}</div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <Navigation />

      <main className="flex-1 w-full">
        {/* MASTHEAD */}
        <header className="mx-auto w-full max-w-5xl px-5 sm:px-8 pt-14 sm:pt-16 pb-10">
          <p className="kicker">Portfolio &amp; Systems Dossier</p>
          <h1 className="mt-5 text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.96]">
            M. Hadi
            <br />
            Yaqoobi
          </h1>
          <p className="mt-5 font-mono text-[0.82rem] tracking-[0.06em] text-ink-soft">
            IT Business Systems Analyst{" "}
            <span className="text-accent" aria-hidden="true">
              /
            </span>{" "}
            Boston, MA
          </p>

          <dl className="facts mt-9 max-w-2xl">
            <dt>Status</dt>
            <dd className="flex items-center gap-2">
              <span
                className="inline-block w-[7px] h-[7px] rounded-full bg-accent"
                aria-hidden="true"
              />
              Open to work
            </dd>

            <dt>Authorization</dt>
            <dd>
              U.S. permanent resident (Green Card). No sponsorship needed, now
              or later.
            </dd>

            <dt>Contact</dt>
            <dd>
              <a href={`mailto:${personal.email}`} className="link">
                {personal.email}
              </a>
            </dd>

            <dt>Resume</dt>
            <dd>
              <a href="/resume.pdf" className="link font-mono text-[0.85em]">
                resume.pdf
              </a>
            </dd>

            <dt>LinkedIn</dt>
            <dd>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                m-hadi-y <span aria-hidden="true">&#8599;</span>
              </a>
            </dd>
          </dl>
        </header>

        {/* DOCUMENT BODY: contents rail + sections */}
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 pb-10 lg:grid lg:grid-cols-[11rem_1fr] lg:gap-11 lg:items-start">
          {/* CONTENTS RAIL */}
          <aside className="hidden lg:block sticky top-[4.5rem] pt-7">
            <div className="kicker pb-3.5 border-b border-line mb-3.5">
              Contents
            </div>
            <nav
              aria-label="Document contents"
              className="flex flex-col gap-2.5 font-mono text-[0.78rem]"
            >
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex gap-2 text-muted hover:text-ink transition-colors duration-150"
                >
                  <span className="opacity-60">{s.num}</span> {s.label}
                </a>
              ))}
            </nav>
            <div className="mt-5 pt-4 border-t border-line font-mono text-[0.7rem] leading-relaxed tracking-[0.06em] uppercase text-muted">
              Sheet 1 of 1
              <br />
              Rev 2026.2
            </div>
          </aside>

          {/* MAIN */}
          <div>
            {/* §0 ABSTRACT */}
            <section
              id="sec-0"
              className="pt-6 pb-14 scroll-mt-20 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-7"
            >
              <SectionMark num="0" label="Abstract" />
              <p className="mt-4 sm:mt-0 max-w-[60ch] text-[clamp(1.15rem,1.8vw,1.4rem)] leading-normal text-ink">
                At Equity Residential, an S&amp;P 500 REIT with 85,000+
                apartments, I was the analyst between Marketing and
                engineering. I coordinated an Azure AD B2C migration for{" "}
                <span className="text-accent">135,000+ accounts</span> across
                six teams.{" "}
                <span className="border-b-2 border-accent">
                  Zero critical incidents.
                </span>{" "}
                Now I&apos;m the Business Systems Manager (contract) at the
                Afghan Human Right Center, and I build applied AI products
                independently.
              </p>
            </section>

            {/* §1 PROFILE */}
            <section
              id="sec-1"
              className="py-14 border-t border-line scroll-mt-20 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-7"
            >
              <SectionMark num="1" label="Profile">
                <div className="margin-note mt-5 hidden sm:block">
                  &#8600; note:
                  <br />
                  refugee &rarr; analyst.
                  <br />
                  see &sect;5 for
                  <br />
                  the full history.
                </div>
              </SectionMark>
              <div className="mt-4 sm:mt-0 max-w-[64ch]">
                <p className="text-[1.03rem] leading-[1.72] text-ink-soft">
                  I build the bridge between business stakeholders and
                  engineering, and I ship. At ConnectionHub the CEO recruited
                  me to lead the Turkey expansion: field research, board
                  approval, then a 14-person team plus 13 city coordinators
                  shipping a greenfield education platform for about 200
                  refugee students. At Equity Residential I owned the SDLC for
                  the B2C authentication migration, wrote SQL daily across five
                  database environments, and shipped a production stored
                  procedure myself when the dev team had no bandwidth.
                </p>

                <blockquote className="my-10 font-display font-medium italic text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.14] text-ink">
                  &ldquo;Constraints read to me as{" "}
                  <span className="text-accent">design parameters</span>, not
                  blockers.&rdquo;
                </blockquote>

                <p className="text-[1.03rem] leading-[1.72] text-ink-soft">
                  Today I carry two threads. At the Afghan Human Right Center,
                  a 501(c)(3) led by Dr. Sima Samar, I own the
                  organization&apos;s entire technology initiative:
                  infrastructure built from zero across 8 platforms, a
                  Salesforce donor-management and HR foundation, and a
                  board-approved AI monitoring system now in build.
                  Independently, I trained 5 ML models across PyTorch and
                  LightGBM, run one live product, and my sole-author research
                  on LLM-as-annotator reliability is under peer review at
                  Springer&apos;s <em>Empirical Software Engineering</em>.
                </p>
                <p className="mt-5 text-[1.03rem] leading-[1.72] text-ink">
                  I grew up a refugee. That is my engineering edge: I learned
                  to solve problems with whatever existed, question every
                  assumption, and build for people who cannot afford failures.
                </p>
              </div>
            </section>

            {/* §2 SYSTEMS SHIPPED */}
            <section
              id="sec-2"
              className="py-14 border-t border-line scroll-mt-20 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-7"
            >
              <SectionMark num="2" label="Systems Shipped" />
              <div className="mt-4 sm:mt-0">
                {/* SYS-01 */}
                <article className="pb-8">
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <div className="flex items-baseline gap-3.5">
                      <span className="font-mono text-[0.78rem] text-accent">
                        SYS-01
                      </span>
                      <h3 className="font-sans font-bold text-[clamp(1.25rem,2.2vw,1.6rem)] tracking-[-0.01em]">
                        Zero-Incident Cloud Migration
                      </h3>
                    </div>
                    <span className="tag tag-tilt-l">Delivered</span>
                  </div>
                  <p className="mt-3.5 mb-4 max-w-[66ch] text-[0.97rem] leading-relaxed text-ink-soft">
                    {migration?.description}
                  </p>
                  <div className="spec-strip">
                    <SpecCell k="Owner" v="Equity Residential · S&P 500" />
                    <SpecCell k="Role" v="IT BSA · SDLC owner" />
                    <SpecCell k="Stack" v="Azure AD B2C, SQL Server" />
                    <SpecCell k="Outcome" v="135,000+ accounts · 0 critical" />
                  </div>
                </article>

                {/* SYS-02 */}
                <article className="py-8 border-t border-line">
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <div className="flex items-baseline gap-3.5">
                      <span className="font-mono text-[0.78rem] text-accent">
                        SYS-02
                      </span>
                      <h3 className="font-sans font-bold text-[clamp(1.25rem,2.2vw,1.6rem)] tracking-[-0.01em]">
                        AlphaSeekers
                      </h3>
                    </div>
                    <a
                      href="https://alphaseekers.org/en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tag tag-tilt-r"
                    >
                      Live &#8599;
                    </a>
                  </div>
                  <p className="mt-3.5 mb-4 max-w-[66ch] text-[0.97rem] leading-relaxed text-ink-soft">
                    {alphaseekers?.description}
                  </p>
                  <div className="spec-strip">
                    <SpecCell k="Owner" v="Independent R&D" />
                    <SpecCell k="Role" v="Product architect · BRD/FRD" />
                    <SpecCell k="Stack" v="TypeScript, React, pgvector, RAG" />
                    <SpecCell k="Live" v="200 users · $0/mo infra" />
                  </div>
                </article>

                {/* SYS-03 */}
                <article className="py-8 border-t border-line">
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <div className="flex items-baseline gap-3.5">
                      <span className="font-mono text-[0.78rem] text-accent">
                        SYS-03
                      </span>
                      <h3 className="font-sans font-bold text-[clamp(1.25rem,2.2vw,1.6rem)] tracking-[-0.01em]">
                        TakveenUp
                      </h3>
                    </div>
                    <span className="tag tag-tilt-l">5 models trained</span>
                  </div>
                  <p className="mt-3.5 mb-4 max-w-[66ch] text-[0.97rem] leading-relaxed text-ink-soft">
                    Skilled multilingual workers cannot get past keyword ATS
                    systems. I designed the ML architecture for this
                    workforce-matching platform, in development, and personally
                    trained 5 models from scratch. Every model has a 3-level
                    fallback chain (custom model, API, rules) so the system
                    never fails silently.
                  </p>
                  <div className="spec-strip">
                    <SpecCell k="Owner" v="Independent R&D" />
                    <SpecCell k="Role" v="ML architect · training" />
                    <SpecCell k="Stack" v="PyTorch, XLM-R, LightGBM" />
                    <SpecCell k="Best F1" v="0.7476 · resume NER" />
                  </div>
                </article>

                {/* SYS-04 */}
                <article className="py-8 border-t border-line">
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <div className="flex items-baseline gap-3.5">
                      <span className="font-mono text-[0.78rem] text-accent">
                        SYS-04
                      </span>
                      <h3 className="font-sans font-bold text-[clamp(1.25rem,2.2vw,1.6rem)] tracking-[-0.01em]">
                        AI Human-Rights Monitoring
                      </h3>
                    </div>
                    <span className="tag tag-tilt-r">In build</span>
                  </div>
                  <p className="mt-3.5 mb-4 max-w-[66ch] text-[0.97rem] leading-relaxed text-ink-soft">
                    The Afghan Human Right Center needed to automate
                    classification of human rights violations across 10+
                    multilingual news sources. I gathered requirements, ran a
                    gap analysis of 4 competing platforms, and authored the
                    board-approved architecture. A three-tier Claude
                    classification cascade covering Dari, Pashto, and English
                    is built and deployed, and the 100% human-review gate is
                    designed to double as a labeling pipeline for the
                    domain-specific model planned next.
                  </p>
                  <div className="spec-strip">
                    <SpecCell k="Owner" v="AHRC · Contract" />
                    <SpecCell k="Role" v="Business Systems Manager" />
                    <SpecCell k="Stack" v="Claude, Python, ICC standards" />
                    <SpecCell k="Sources" v="10+ multilingual" />
                  </div>
                </article>

                {/* SYS-05 */}
                <article className="pt-8 border-t border-line">
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <div className="flex items-baseline gap-3.5">
                      <span className="font-mono text-[0.78rem] text-accent">
                        SYS-05
                      </span>
                      <h3 className="font-sans font-bold text-[clamp(1.25rem,2.2vw,1.6rem)] tracking-[-0.01em]">
                        MakerMind
                      </h3>
                    </div>
                    <span className="tag tag-tilt-l">In dev</span>
                  </div>
                  <p className="mt-3.5 mb-4 max-w-[66ch] text-[0.97rem] leading-relaxed text-ink-soft">
                    {makermind?.description}
                  </p>
                  <div className="spec-strip">
                    <SpecCell k="Owner" v="Independent R&D" />
                    <SpecCell k="Role" v="Architect · Req. engineering" />
                    <SpecCell k="Stack" v="TS, Claude, GPT-4, Gemini" />
                    <SpecCell k="Scale" v="69K lines · 4 agents" />
                  </div>
                </article>

                <p className="mt-8 text-[0.97rem] text-ink-soft max-w-[66ch]">
                  The full ledger, with runnable code, is on{" "}
                  <Link to="/projects" className="link">
                    the work page
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* §3 VERIFIED OUTCOMES */}
            <section
              id="sec-3"
              className="py-14 border-t border-line scroll-mt-20 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-7"
            >
              <SectionMark num="3" label="Verified Outcomes" />
              <div className="mt-4 sm:mt-0">
                {outcomes.map((o, i) => (
                  <div
                    key={o.figure}
                    className={`flex items-center gap-5 py-4 border-t border-line ${
                      i === outcomes.length - 1 ? "border-b" : ""
                    } flex-wrap sm:flex-nowrap`}
                  >
                    <div className="font-display font-semibold text-[clamp(2rem,3.6vw,3.1rem)] leading-none min-w-[8.5rem] tabular-nums">
                      {o.figure}
                    </div>
                    <div className="flex-1 min-w-[12rem] text-[0.95rem] text-ink-soft">
                      {o.text}
                    </div>
                    <span className="verified">&#10003; {o.check}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* §4 CAPABILITIES */}
            <section
              id="sec-4"
              className="py-14 border-t border-line scroll-mt-20 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-7"
            >
              <SectionMark num="4" label="Capability Matrix" />
              <div className="mt-4 sm:mt-0">
                <div className="border border-line">
                  {capabilities.map((c, i) => (
                    <div
                      key={c.key}
                      className={`grid sm:grid-cols-[12rem_1fr] ${
                        i < capabilities.length - 1
                          ? "border-b border-line"
                          : ""
                      }`}
                    >
                      <div className="px-4 py-4 sm:border-r border-line font-mono text-[0.78rem] tracking-[0.06em] text-ink">
                        {c.key}
                      </div>
                      <div className="px-4 pb-4 sm:py-4 text-[0.92rem] text-ink-soft">
                        {c.val}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-[0.97rem] text-ink-soft">
                  Honest per-skill depth, with years and evidence, is on{" "}
                  <Link to="/skills" className="link">
                    the skills map
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* §5 REVISION HISTORY */}
            <section
              id="sec-5"
              className="py-14 border-t border-line scroll-mt-20 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-7"
            >
              <SectionMark num="5" label="Revision History" />
              <div className="mt-4 sm:mt-0">
                <div className="hidden sm:grid grid-cols-[5.5rem_7rem_1fr] font-mono text-[0.7rem] tracking-[0.12em] uppercase text-muted pb-2.5 border-b border-line">
                  <span>Rev</span>
                  <span>Period</span>
                  <span>Role · Organization</span>
                </div>
                {revisionRows.map((r) => (
                  <div
                    key={r.rev}
                    className="sm:grid sm:grid-cols-[5.5rem_7rem_1fr] items-baseline py-3.5 border-b border-line"
                  >
                    <span className="font-mono text-[0.78rem] text-accent">
                      {r.rev}
                    </span>
                    <span className="font-mono text-[0.78rem] text-muted sm:ml-0 ml-3">
                      {r.period}
                    </span>
                    <span className="block sm:inline text-[0.95rem] text-ink mt-0.5 sm:mt-0">
                      {r.role} <span className="text-muted">&middot;</span>{" "}
                      <span className="text-ink-soft">{r.org}</span>
                      {r.note && (
                        <span className="text-muted text-[0.88rem]">
                          {" "}
                          &middot; {r.note}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
                <p className="mt-6 text-[0.97rem] text-ink-soft">
                  The full record, with what I did at each stop, is on{" "}
                  <Link to="/timeline" className="link">
                    the career page
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* §6 DISTRIBUTION */}
            <section
              id="sec-6"
              className="py-14 border-t border-line scroll-mt-20 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-7"
            >
              <SectionMark num="6" label="Distribution" />
              <div className="mt-4 sm:mt-0">
                <h2 className="text-[clamp(2.2rem,4.5vw,3.4rem)]">
                  Get in <em className="text-accent italic">touch.</em>
                </h2>
                <p className="mt-5 max-w-[52ch] text-[0.97rem] leading-relaxed text-ink-soft">
                  Based in Boston, on Eastern time. Write with the role, and I
                  will reply with the parts of my record most relevant to it.
                  There is also{" "}
                  <Link to="/contact" className="link">
                    a form
                  </Link>{" "}
                  if you prefer.
                </p>

                <div className="mt-8 max-w-xl border-t border-line">
                  {[
                    {
                      k: "Email",
                      label: personal.email,
                      href: `mailto:${personal.email}`,
                      external: false,
                    },
                    {
                      k: "LinkedIn",
                      label: "m-hadi-y",
                      href: personal.linkedin,
                      external: true,
                    },
                    {
                      k: "GitHub",
                      label: "Hadiyaqoobi",
                      href: "https://github.com/Hadiyaqoobi",
                      external: true,
                    },
                    {
                      k: "Resume",
                      label: "resume.pdf",
                      href: "/resume.pdf",
                      external: false,
                    },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="flex items-baseline justify-between gap-6 py-3.5 border-b border-line"
                    >
                      <span className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-muted">
                        {row.k}
                      </span>
                      <a
                        href={row.href}
                        className="link font-sans text-[0.95rem]"
                        {...(row.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {row.label}{" "}
                        {row.external && <span aria-hidden="true">&#8599;</span>}
                      </a>
                    </div>
                  ))}
                </div>

                {/* Signature */}
                <div className="mt-14 flex items-end justify-between gap-6 flex-wrap">
                  <div>
                    <p className="font-display italic font-medium text-[1.9rem] leading-none">
                      M. Hadi Yaqoobi
                    </p>
                    <p className="mt-2.5 pt-2.5 border-t border-line font-mono text-[0.7rem] tracking-[0.14em] uppercase text-muted">
                      Author &middot; Boston &middot; 2026
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
