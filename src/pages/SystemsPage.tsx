import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

const SystemsPage = () => (
  <div className="relative min-h-screen">
    <Background />
    <Navigation />

    <main className="relative z-10 pt-20">
      <section className="py-section relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="accent-line mb-5" />
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-2">
            The systems, not the sentences
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-100 tracking-[-0.02em]">
            Under the <span className="gradient-text">hood</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mt-3 text-[15px] leading-relaxed">
            How my flagship builds actually work, stage by stage. Click any step to see what it
            does and the real code behind it. Each system is labeled with its honest status.
          </p>

          <div className="mt-8">
            <ArchitectureDiagram />
          </div>
        </div>
      </section>
    </main>
  </div>
);

export default SystemsPage;
