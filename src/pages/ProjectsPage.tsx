import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Background } from "@/components/Background";
import { WorkLedger } from "@/components/WorkLedger";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Background />
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary mb-6" asChild>
              <Link to="/">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Link>
            </Button>

            <div className="accent-line mb-5" />
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              The <span className="gradient-text">Work</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Every project on one calm screen. Filter by status or tech, search, and open any row to
              read the story and peek the real code. Nothing is more than one click deep.
            </p>
          </motion.div>

          {/* AI 360 coursework explorer link */}
          <Link
            to="/projects/ai360"
            className="block glass-card p-5 mb-8 transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300">
                  ▲ Cornell AI 360
                </span>
                <p className="text-foreground font-semibold mt-1">Explore my AI 360 coursework</p>
                <p className="text-muted-foreground text-sm">
                  20 projects across NLP, machine learning, and data science in R, each wired into the Skill Map.
                </p>
              </div>
              <ExternalLink size={18} className="text-muted-foreground group-hover:text-primary shrink-0" />
            </div>
          </Link>

          <WorkLedger />
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
