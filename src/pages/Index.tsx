import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { portfolioData } from "@/data/portfolio-data";

const { personal, timeline, projects } = portfolioData;

/* The statement is the truth-passed hero paragraph living in portfolio-data. */
const statement = personal.subtitle;

/* The migration narrative reuses the verified project copy verbatim. */
const migration = projects.find((p) =>
  p.title.startsWith("Zero-Incident Cloud Migration")
);

/* Compact career line. Year, title, and company come from the timeline data
   verbatim; only the selection and the one award note are layout decisions. */
const careerSelection: { title: string; company: string; note?: string }[] = [
  { title: "Business Systems Manager (Contract)", company: "AHRC" },
  { title: "IT Business Systems Analyst", company: "Equity Residential (S&P 500)" },
  {
    title: "Admissions Analyst",
    company: "Questrom School of Business, Boston University",
  },
  {
    title: "Leasing Consultant",
    company: "Equity Residential (S&P 500)",
    note: "Leasing Consultant of the Year",
  },
  { title: "IT Business Systems Analyst", company: "ConnectionHub" },
];

const careerRows = careerSelection.flatMap((row) => {
  const entry = timeline.find(
    (t) => t.title === row.title && t.company === row.company
  );
  return entry
    ? [{ year: entry.year, title: entry.title, company: entry.company, note: row.note }]
    : [];
});

const linkedinLabel = personal.linkedin
  .replace(/^https?:\/\/(www\.)?/, "")
  .replace(/\/$/, "");

const Index = () => {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navigation />

      <main className="mx-auto w-full max-w-3xl px-5 sm:px-6 pt-12 pb-16 flex-1">
        {/* 1. Identity — who, where, authorization, contact. First screen. */}
        <header>
          <h1>{personal.name}</h1>
          <p className="font-sans text-base font-medium text-ink-soft mt-2">
            IT Business Systems Analyst
          </p>

          <dl className="facts mt-8">
            <dt>Location</dt>
            <dd>Boston, MA</dd>

            <dt>Work authorization</dt>
            <dd>
              U.S. permanent resident (Green Card). No sponsorship needed, now
              or later.
            </dd>

            <dt>Email</dt>
            <dd>
              <a href={`mailto:${personal.email}`} className="link">
                {personal.email}
              </a>
            </dd>

            <dt>Resume</dt>
            <dd>
              <a href="/resume.pdf" className="link">
                <span className="font-mono text-[0.85em]">resume.pdf</span>
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
                {linkedinLabel} <span aria-hidden="true">&#8599;</span>
              </a>
            </dd>
          </dl>
        </header>

        <div className="rule" aria-hidden="true" />

        {/* 2. Statement */}
        <section aria-label="Statement">
          <p className="prose-measure text-[1.125rem]">{statement}</p>
        </section>

        <div className="rule" aria-hidden="true" />

        {/* 3. The migration — the one big proof. */}
        <section id="migration">
          <h2>The migration</h2>
          {migration && (
            <p className="prose-measure mt-4">{migration.description}</p>
          )}

          <table className="evidence-table mt-8">
            <caption className="sr-only">
              Migration record, Azure AD B2C, Equity Residential
            </caption>
            <tbody>
              <tr>
                <th scope="row">Accounts</th>
                <td className="num">135,000+</td>
              </tr>
              <tr>
                <th scope="row">Teams</th>
                <td className="num">6</td>
              </tr>
              <tr>
                <th scope="row">Phases</th>
                <td className="num">4</td>
              </tr>
              <tr>
                <th scope="row">Critical incidents</th>
                <td className="num">0</td>
              </tr>
              <tr>
                <th scope="row">Window</th>
                <td className="num">2025-01-24 to 2025-02-17</td>
              </tr>
            </tbody>
          </table>

          <p className="prose-measure mt-6">
            The rest of the enterprise record is on{" "}
            <Link to="/projects" className="link">
              the work page
            </Link>
            .
          </p>
        </section>

        <div className="rule" aria-hidden="true" />

        {/* 4. Career line */}
        <section id="career">
          <h2>Career</h2>
          <ul className="mt-6 border-t border-line">
            {careerRows.map((row) => (
              <li
                key={`${row.year} ${row.title} ${row.company}`}
                className="py-3 border-b border-line sm:grid sm:grid-cols-[10rem_1fr] sm:gap-x-6"
              >
                <span className="block font-mono text-[0.8rem] text-muted tabular-nums pt-0.5">
                  {row.year}
                </span>
                <span className="block">
                  <span className="font-sans text-[0.95rem] font-medium text-ink">
                    {row.title}
                  </span>
                  <span className="font-sans text-[0.9rem] text-ink-soft">
                    {" "}
                    &middot; {row.company}
                  </span>
                  {row.note && (
                    <span className="block font-sans text-[0.85rem] text-muted mt-0.5">
                      {row.note}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <p className="prose-measure mt-6">
            The full record is on{" "}
            <Link to="/timeline" className="link">
              the career page
            </Link>
            .
          </p>
        </section>

        <div className="rule" aria-hidden="true" />

        {/* 5. Where AI fits — subordinate by design. */}
        <section id="research">
          <h2>Where AI fits</h2>
          <div className="prose-measure mt-4 space-y-3">
            <p>
              One product is live:{" "}
              <a
                href="https://alphaseekers.org/en"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                AlphaSeekers <span aria-hidden="true">&#8599;</span>
              </a>
              , an education platform with 200 registered users at zero
              infrastructure cost.
            </p>
            <p>
              I trained 5 ML models across PyTorch and LightGBM for TakveenUp,
              a multilingual workforce-matching platform in development. They
              are listed on{" "}
              <Link to="/projects" className="link">
                the work page
              </Link>
              .
            </p>
            <p>
              My sole-author research on LLM-as-annotator reliability is under
              peer review at Springer&apos;s{" "}
              <em>Empirical Software Engineering</em>.
            </p>
          </div>
        </section>

        <div className="rule" aria-hidden="true" />

        {/* Contact line */}
        <section aria-label="Contact">
          <p className="prose-measure">
            The useful next step is email. Write to{" "}
            <a href={`mailto:${personal.email}`} className="link">
              {personal.email}
            </a>{" "}
            with the role, and I will reply with the parts of my record most
            relevant to it. I am in Boston, on Eastern time.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
