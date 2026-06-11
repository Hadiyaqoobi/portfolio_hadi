import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { AI360_PROJECTS, AI360_TRACKS, type AI360Track } from "@/data/ai360-projects";

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
    <div className="relative min-h-screen">
      <Background />
      <Navigation />

      <main className="relative z-10 pt-20">
        <section className="py-section relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <Link to="/skills" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 mb-6">
              <ArrowLeft size={15} /> Back to the Skill Map
            </Link>

            <div className="accent-line mb-5" />
            <p className="text-xs uppercase tracking-[0.22em] text-sky-300 mb-2">
              ▲ Cornell AI 360 coursework
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-100 tracking-[-0.02em]">
              The <span className="gradient-text">AI 360</span> work, in the open
            </h1>
            <p className="text-slate-400 max-w-2xl mt-3 text-[15px] leading-relaxed">
              Cornell's AI 360 ran across three tracks: NLP in Python, machine learning
              implemented from scratch, and data science in R. Here is what I built in each,
              in my own words. Where I have a write-up or paper, it is linked. The rest are
              described honestly as coursework.
            </p>

            <div className="flex flex-wrap gap-2 my-7">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    filter === f.key
                      ? "border-blue-500 text-blue-300 bg-blue-500/10"
                      : "border-slate-700 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((p) => (
                <div
                  key={p.id}
                  id={p.id}
                  className="glass-card p-5 flex flex-col scroll-mt-24"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300">
                      ▲ Cornell AI 360
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 border border-slate-700 rounded px-1.5 py-0.5">
                      {p.track}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold text-slate-100 leading-snug mb-2">{p.title}</h3>
                  <p className="text-[12.5px] text-slate-400 leading-relaxed flex-1">{p.blurb}</p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.skills.map((s) => (
                      <span key={s} className="text-[10px] text-slate-500 border border-slate-700 rounded px-1.5 py-0.5">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-col gap-1.5">
                    {p.artifact && (
                      <a
                        href={p.artifact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-blue-400 hover:text-blue-300"
                      >
                        {p.artifact.label}
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {p.notebookLinks?.map((n) => (
                      <a
                        key={n.href}
                        href={n.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-sky-300 hover:text-sky-200"
                      >
                        <span className="text-[10px] leading-none">&#9654;</span> {n.label}
                      </a>
                    ))}
                    {!p.artifact && !p.notebookLinks && (
                      <span className="text-[11px] text-slate-600">
                        Coursework. Executed notebook available on request.
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-600 mt-8 max-w-2xl leading-relaxed">
              Note on integrity: linked PDFs are my own write-ups and my IEEE-format paper. The
              linked notebooks are my executed work with the course prompts and unit tests
              removed, code and outputs only. eCornell course templates and graded materials are
              not republished.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AI360Explorer;
