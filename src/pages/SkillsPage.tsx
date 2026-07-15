import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SkillMap } from "@/components/SkillMap";
import { SKILLS, PROJECTS, certTotal, institutionCount } from "@/data/skillmap";

const stats = [
  { v: SKILLS.length, k: "skills mapped" },
  { v: PROJECTS.length, k: "projects & systems" },
  { v: certTotal, k: "certifications" },
  { v: institutionCount, k: "institutions" },
];

const SkillsPage = () => (
  <div className="min-h-screen bg-paper flex flex-col">
    <Navigation />

    <main className="flex-1 w-full">
      <section className="mx-auto w-full max-w-3xl px-5 sm:px-6 py-10 sm:py-12">
        <p className="kicker mb-3">Interactive · every claim wired to its evidence</p>
        <h1>The skill map</h1>
        <p className="prose-measure text-ink-soft mt-4">
          Click any skill. The map lights up the projects I built with it and the
          certifications behind it. Counts only, no invented scores.
        </p>

        <p className="font-sans text-sm text-ink-soft mt-6">
          {stats.map((s, i) => (
            <span key={s.k}>
              <span className="font-mono tabular-nums text-ink">{s.v}</span> {s.k}
              {i < stats.length - 1 && <span aria-hidden="true"> · </span>}
            </span>
          ))}
        </p>

        <div className="mt-8">
          <SkillMap />
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default SkillsPage;
