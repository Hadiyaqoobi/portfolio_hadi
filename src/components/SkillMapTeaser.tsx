import { Link } from "react-router-dom";
import { SKILLS, PROJECTS, certTotal } from "@/data/skillmap";

export const SkillMapTeaser = () => (
  <section className="mx-auto w-full max-w-3xl px-5 sm:px-6 py-section">
    <p className="kicker mb-3">Skills</p>
    <h2>Explore the skill map</h2>
    <p className="prose-measure text-ink-soft mt-3">
      An interactive graph that wires every skill to the projects and
      certifications behind it. Click PyTorch, see the models. Click SQL, see the
      migration and the bug hunt.
    </p>
    <p className="font-sans text-sm text-ink-soft mt-4">
      <span className="font-mono tabular-nums text-ink">{SKILLS.length}</span> skills
      <span aria-hidden="true"> · </span>
      <span className="font-mono tabular-nums text-ink">{PROJECTS.length}</span> projects
      <span aria-hidden="true"> · </span>
      <span className="font-mono tabular-nums text-ink">{certTotal}</span> certifications
    </p>
    <p className="mt-4">
      <Link to="/skills" className="link font-sans text-sm">
        Open the skill map
      </Link>
    </p>
  </section>
);
