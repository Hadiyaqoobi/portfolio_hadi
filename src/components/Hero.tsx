import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroCodeLab } from "@/components/HeroCodeLab";

export const Hero = () => {
  return (
    <section id="home" className="min-h-[100vh] flex items-center relative pt-20 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/60 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                AI Solutions Architect & Business Systems Analyst · Open to Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-[-0.03em]">
                <span className="text-slate-100">Hadi</span>
                <br />
                <span className="gradient-text">Yaqoobi</span>
              </h1>
              <h2 className="text-base md:text-lg text-slate-400 font-medium tracking-wide mt-3">
                AI Solutions Architect & Business Systems Analyst
              </h2>
            </div>

            {/* Value prop */}
            <p className="text-lg text-slate-400 max-w-md leading-relaxed">
              <span className="text-slate-200 font-medium">I analyze enterprise systems, automate them, and build AI on top of them: a
              zero-incident 135K-account cloud migration at an S&P 500 REIT, five production
              ML models trained at my R&D startup, and a board-approved LLM architecture
              for human-rights monitoring.</span>
            </p>

            {/* Context chips */}
            <div className="flex flex-wrap gap-2">
              {["S&P 500 REIT Experience", "Cornell AI 360 (2026)", "BU Questrom STEM MS", "Springer Research", "Green Card (No Sponsorship)"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs text-slate-400 bg-slate-800/60 border border-slate-700 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4">
              <Link
                to="/projects"
                className="btn-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-medium text-sm"
              >
                View My Work
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="btn-outline inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm"
              >
                <BookOpen size={14} />
                Read My Story
              </Link>
            </div>
          </motion.div>

          {/* Right - Runnable multi-project code lab */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 blur-[80px] opacity-20 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-br from-blue-500/40 via-purple-500/20 to-transparent rounded-3xl" />
            </div>

            <div className="relative">
              <div className="mb-3 flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-blue-500" />
                <span className="text-xs text-slate-500">Real code from my work. Pick a file, hit Run.</span>
              </div>
              <HeroCodeLab />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
