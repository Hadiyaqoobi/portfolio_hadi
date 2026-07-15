import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

const SystemsPage = () => (
  <div className="min-h-screen bg-paper flex flex-col">
    <Navigation />

    <main className="flex-1 w-full">
      <section className="mx-auto w-full max-w-3xl px-5 sm:px-6 py-10 sm:py-12">
        <p className="kicker mb-3">The systems, not the sentences</p>
        <h1>Under the hood</h1>
        <p className="prose-measure text-ink-soft mt-4">
          How my flagship builds actually work, stage by stage. Click any step to see what it
          does and the real code behind it. Each system is labeled with its honest status.
        </p>

        <div className="mt-8">
          <ArchitectureDiagram />
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default SystemsPage;
