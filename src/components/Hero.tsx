import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

/* Floating code card content — real code from MakerMind */
const codeSnippet = `async processRequest(
  request: UserRequest,
  context: ProjectContext
) {
  // Step 1 → Claude plans
  const plan = await this
    .runPlannerLLM(request, context);

  // Step 2 → GPT-4 codes
  const patches = await this
    .runCoderLLM(request, plan);

  // Step 3 → Gemini validates
  const final = await this
    .runGuardianLLM(patches);

  return { success: true, plan };
}`;

export const Hero = () => {
  return (
    <section id="home" className="min-h-[100vh] flex items-center relative pt-20 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left — Text */}
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
                IT Business Systems Analyst & AI Product Builder · Open to Opportunities
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
                IT Business Systems Analyst & AI Product Builder
              </h2>
            </div>

            {/* Value prop */}
            <p className="text-lg text-slate-400 max-w-md leading-relaxed">
              <span className="text-slate-200 font-medium">Started as the end user filing
              maintenance tickets. Then became the IT Business Systems Analyst managing the
              full SDLC, authoring BRDs and FRDs, writing SQL stored procedures, building
              dashboards, and shipping Python automations. Now building AI products.</span>
            </p>

            {/* Context chips */}
            <div className="flex flex-wrap gap-2">
              {["S&P 500 REIT Experience", "Cornell AI360", "BU Questrom STEM MS", "PMP Candidate", "Green Card (No Sponsorship)"].map((tag) => (
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

          {/* Right — Floating code card */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 blur-[80px] opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-blue-500/40 via-purple-500/20 to-transparent rounded-3xl" />
            </div>

            {/* Context label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-3 flex items-center gap-2"
            >
              <div className="w-1 h-4 rounded-full bg-blue-500" />
              <span className="text-xs text-slate-500">From my latest project,</span>
              <Link to="/projects/makermind" className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">
                MakerMind
              </Link>
            </motion.div>

            {/* The code card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-[#1E293B] shadow-xl shadow-black/20">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono ml-2">Orchestrator.ts</span>
                </div>

                {/* Code with syntax highlighting */}
                <div className="p-5 font-mono text-[12px] leading-[1.8] overflow-hidden">
                  {codeSnippet.split('\n').map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.04 }}
                      className="whitespace-pre"
                    >
                      {highlightCodeLine(line)}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating accent badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-[10px] text-blue-400 font-medium backdrop-blur-sm"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                Multi-Agent AI Pipeline
              </motion.div>

              {/* Floating tech badge */}
              <motion.div
                className="absolute -top-3 -right-3 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400 font-medium backdrop-blur-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                TypeScript · React · Node
              </motion.div>
            </motion.div>

            {/* Description below card */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-[11px] text-slate-500 mt-4 text-center leading-relaxed max-w-sm mx-auto"
            >
              This orchestrator coordinates 3 AI models to generate microcontroller firmware from plain English
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* Simple syntax highlighter for the hero code card */
function highlightCodeLine(line: string): JSX.Element {
  if (line.trim().startsWith('//')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  return (
    <span className="text-slate-400">
      {line
        .replace(/(async|await|const|return)/g, '\u00A7KW\u00A7$1\u00A7/KW\u00A7')
        .replace(/(\.[a-zA-Z]+)\(/g, '\u00A7FN\u00A7$1\u00A7/FN\u00A7(')
        .replace(/(true|false)/g, '\u00A7BL\u00A7$1\u00A7/BL\u00A7')
        .replace(/(".*?")/g, '\u00A7ST\u00A7$1\u00A7/ST\u00A7')
        .split(/\u00A7(KW|FN|BL|ST|\/KW|\/FN|\/BL|\/ST)\u00A7/)
        .reduce((acc: (string | JSX.Element)[], part, i, arr) => {
          if (part === 'KW') {
            acc.push(<span key={i} className="text-blue-400">{arr[i + 1]}</span>);
          } else if (part === 'FN') {
            acc.push(<span key={i} className="text-amber-400">{arr[i + 1]}</span>);
          } else if (part === 'BL') {
            acc.push(<span key={i} className="text-orange-400">{arr[i + 1]}</span>);
          } else if (part === 'ST') {
            acc.push(<span key={i} className="text-emerald-400">{arr[i + 1]}</span>);
          } else if (!['KW', 'FN', 'BL', 'ST', '/KW', '/FN', '/BL', '/ST'].includes(part) &&
            !arr.slice(0, i).some((p, j) => ['KW', 'FN', 'BL', 'ST'].includes(p as string) && j === i - 1)) {
            acc.push(<span key={i}>{part}</span>);
          }
          return acc;
        }, [])}
    </span>
  );
}
