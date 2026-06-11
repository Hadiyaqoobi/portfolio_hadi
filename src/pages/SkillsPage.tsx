import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { SkillMap } from "@/components/SkillMap";
import { SKILLS, PROJECTS, certTotal, institutionCount } from "@/data/skillmap";

const stats = [
  { v: SKILLS.length, k: "skills mapped" },
  { v: PROJECTS.length, k: "projects & systems" },
  { v: certTotal, k: "certifications" },
  { v: institutionCount, k: "institutions" },
];

const SkillsPage = () => (
  <div className="relative min-h-screen">
    <Background />
    <Navigation />

    <main className="relative z-10 pt-20">
      <section className="py-section relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="accent-line mb-5" />
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-2">
            Interactive · every claim wired to its evidence
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-100 tracking-[-0.02em]">
            The <span className="gradient-text">Skill Map</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mt-3 text-[15px] leading-relaxed">
            Click any skill. The map lights up the projects I built with it and the
            certifications behind it. Counts only, no invented scores.
          </p>

          <div className="flex flex-wrap gap-3 my-7">
            {stats.map((s) => (
              <div key={s.k} className="glass-card px-5 py-3 flex items-baseline gap-2.5">
                <span className="text-2xl font-bold text-blue-400">{s.v}</span>
                <span className="text-[11px] uppercase tracking-wider text-slate-500">{s.k}</span>
              </div>
            ))}
          </div>

          <SkillMap />
        </div>
      </section>
    </main>
  </div>
);

export default SkillsPage;
