import { Link } from "react-router-dom";
import { SYSTEMS } from "@/data/systems";

export const SystemsTeaser = () => (
  <section className="mx-auto w-full max-w-3xl px-5 sm:px-6 py-section">
    <p className="kicker mb-3">Systems</p>
    <h2>See how the systems actually work</h2>
    <p className="prose-measure text-ink-soft mt-3">
      MakerMind's three-model pipeline, AlphaSeekers' Dari-aware RAG, the five-model
      ROE engine, and the AHRC design, as clickable flows. Click any stage to open the
      real code behind it.
    </p>
    <p className="font-sans text-sm text-muted mt-4">
      {SYSTEMS.map((s) => s.name).join(" · ")}
    </p>
    <p className="mt-4">
      <Link to="/systems" className="link font-sans text-sm">
        Explore the systems
      </Link>
    </p>
  </section>
);
