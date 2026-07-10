import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AI360_PROJECTS, type AI360Track } from "@/data/ai360-projects";

type Filter = "all" | AI360Track;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All tracks" },
  { key: "NLP", label: "NLP" },
  { key: "Machine Learning", label: "Machine Learning" },
  { key: "Data Science (R)", label: "Data Science (R)" },
];

const AI360Explorer = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const items = AI360_PROJECTS.filter((p) => filter === "all" || p.track === filter);

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navigation />

      <main className="flex-1">
        <section className="py-14 sm:py-16">
          <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
            <p className="mb-8 font-sans text-sm">
              <Link
                to="/skills"
                className="text-ink-soft hover:text-accent transition-colors duration-150"
              >
                <span aria-hidden="true">&larr;</span> Back to the Skill Map
              </Link>
            </p>

            <header className="mb-8">
              <p className="kicker mb-2">Cornell AI 360 coursework</p>
              <h1>The AI 360 work, in the open</h1>
              <p className="mt-4 prose-measure text-ink-soft">
                Cornell's AI 360 ran across three tracks: NLP in Python, machine learning
                implemented from scratch, and data science in R. Here is what I built in each,
                in my own words. Where I have a write-up or paper, it is linked. The rest are
                described honestly as coursework.
              </p>
            </header>

            {/* Track filter: quiet underline tabs */}
            <div className="flex flex-wrap gap-x-5 gap-y-1 border-b border-line font-sans text-sm">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={filter === f.key}
                  className={`pb-2 -mb-px border-b-2 transition-colors duration-150 ${
                    filter === f.key
                      ? "border-accent text-accent"
                      : "border-transparent text-ink-soft hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <ul className="list-none divide-y divide-line">
              {items.map((p) => (
                <li key={p.id} id={p.id} className="py-7 scroll-mt-20">
                  <p className="font-sans text-[0.8rem] text-muted">{p.track}</p>

                  <h2 className="mt-1 font-sans text-base font-semibold text-ink leading-snug">
                    {p.title}
                  </h2>

                  <p className="mt-2 prose-measure text-[0.95rem] text-ink-soft leading-relaxed">
                    {p.blurb}
                  </p>

                  <div className="mt-3 flex flex-col items-start gap-1 font-sans text-sm">
                    {p.artifact && (
                      <a
                        href={p.artifact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        {p.artifact.label} <span aria-hidden="true">&#8599;</span>
                      </a>
                    )}
                    {p.notebookLinks?.map((n) => (
                      <a
                        key={n.href}
                        href={n.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        {n.label} <span aria-hidden="true">&#8599;</span>
                      </a>
                    ))}
                    {!p.artifact && !p.notebookLinks && (
                      <span className="text-xs text-muted">
                        Coursework. Executed notebook available on request.
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-10 prose-measure font-sans text-xs text-muted leading-relaxed">
              Note on integrity: linked PDFs are my own write-ups and my IEEE-format paper. The
              linked notebooks are my executed work with the course prompts and unit tests
              removed, code and outputs only. eCornell course templates and graded materials are
              not republished.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AI360Explorer;
