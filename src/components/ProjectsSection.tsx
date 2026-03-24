import { motion } from "framer-motion";
import { ArrowRight, Code2, Database, LineChart, Shield, Cpu, GraduationCap, Lock, BrainCircuit, BookText, Network, MapPin, BarChart3 } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";
import { Link } from "react-router-dom";

const projectIcons: Record<string, typeof Code2> = {
  "MakerMind": Cpu,
  "Azure B2C": Shield,
  "Fee Transparency": Database,
  "TakveenUp": BrainCircuit,
  "AlphaSeekers": GraduationCap,
  "Yaqoobi": Code2,
  "Neural Network": LineChart,
  "Predictive": LineChart,
  "Visual Python": GraduationCap,
  "ConnectionHub": Database,
  "Human Rights": Shield,
  "RAKE": BookText,
  "Topic Discovery": BookText,
  "PageRank": Network,
  "Traffic Congestion": BarChart3,
  "COVID-19": MapPin,
};

function getIcon(title: string) {
  for (const [key, Icon] of Object.entries(projectIcons)) {
    if (title.includes(key)) return Icon;
  }
  return Code2;
}

const categoryColors: Record<string, { bg: string; border: string; text: string; glow: string; glowClass: string }> = {
  enterprise: { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400", glow: "via-indigo-500/15", glowClass: "glow-enterprise" },
  rnd: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", glow: "via-emerald-500/15", glowClass: "glow-rnd" },
  consulting: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", glow: "via-amber-500/15", glowClass: "glow-consulting" },
  academic: { bg: "bg-sky-500/10", border: "border-sky-500/30", text: "text-sky-400", glow: "via-sky-500/15", glowClass: "glow-academic" },
};

export const ProjectsSection = () => {
  const featuredProjects = portfolioData.projects.filter(p => p.featured).slice(0, 6);
  // First 2 get large treatment, rest get standard
  const heroProjects = featuredProjects.slice(0, 2);
  const restProjects = featuredProjects.slice(2);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-6xl mx-auto"
        >
          <div className="accent-line mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
            Featured Work
          </h2>
          <p className="text-slate-400 text-base max-w-lg">
            Problem → approach → outcome, from S&P 500 enterprise systems to AI products built from scratch
          </p>
        </motion.div>

        {/* ─── HERO PROJECTS — Large cards, 2 columns ─── */}
        <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto mb-5">
          {heroProjects.map((project, index) => {
            const Icon = getIcon(project.title);
            const isInternal = project.demo?.startsWith("/");
            const accent = categoryColors[(project as any).category] || categoryColors.enterprise;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <div className={`glass-card ${accent.glowClass} p-7 md:p-8 h-full flex flex-col overflow-hidden`}>
                  {/* Accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${accent.glow} to-transparent`} />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-10 h-10 rounded-xl ${accent.bg} ${accent.border} border flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${accent.text}`} />
                    </div>
                    <div className="flex gap-2 items-center">
                      {(project as any).confidential && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 px-2 py-0.5 bg-slate-800/50 border border-slate-700 rounded-md">
                          <Lock size={8} />
                          Internal
                        </span>
                      )}
                      {(project as any).company && (
                        <span className="text-[10px] text-slate-400 px-2 py-0.5 bg-slate-800/50 border border-slate-700 rounded-md">
                          {(project as any).company}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-3 group-hover:text-slate-200 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-400 mb-6 leading-relaxed flex-grow line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack visual */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.slice(0, 6).map((tech, i) => (
                      <span key={i} className="px-2 py-1 text-[10px] text-slate-400 bg-slate-800/50 border border-slate-700 rounded-md">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 6 && (
                      <span className="px-2 py-1 text-[10px] text-slate-400 bg-slate-800/50 rounded-md">
                        +{project.tech.length - 6}
                      </span>
                    )}
                  </div>

                  {/* Link or confidential badge */}
                  {(project as any).confidential ? (
                    <span className="text-xs text-slate-400 flex items-center gap-1.5 mt-auto">
                      <Lock size={10} />
                      Internal Enterprise System
                    </span>
                  ) : project.demo && project.demo !== "#" ? (
                    isInternal ? (
                      <Link
                        to={project.demo}
                        className="text-sm font-medium flex items-center gap-1.5 text-slate-400 hover:text-slate-300 transition-colors mt-auto"
                      >
                        View Case Study
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium flex items-center gap-1.5 text-slate-400 hover:text-slate-300 transition-colors mt-auto"
                      >
                        View Details
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    )
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── REST OF PROJECTS — 4 smaller cards ─── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {restProjects.map((project, index) => {
            const Icon = getIcon(project.title);
            const isInternal = project.demo?.startsWith("/");
            const accent = categoryColors[(project as any).category] || categoryColors.enterprise;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="group"
              >
                <div className={`glass-card ${accent.glowClass} p-5 h-full flex flex-col overflow-hidden`}>
                  <div className={`w-8 h-8 rounded-lg ${accent.bg} ${accent.border} border flex items-center justify-center mb-4`}>
                    <Icon className={`w-4 h-4 ${accent.text}`} />
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 mb-2 group-hover:text-slate-200 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 mb-4 leading-relaxed flex-grow line-clamp-3">
                    {project.description}
                  </p>

                  <div className="text-[10px] text-slate-400 mb-3">
                    {project.tech.slice(0, 3).join(" · ")}
                  </div>

                  {(project as any).confidential ? (
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Lock size={8} />
                      Internal
                    </span>
                  ) : project.demo && project.demo !== "#" ? (
                    isInternal ? (
                      <Link to={project.demo} className="text-xs text-slate-400 hover:text-slate-300 flex items-center gap-1 transition-colors">
                        View <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ) : (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-300 flex items-center gap-1 transition-colors">
                        View <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    )
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 max-w-6xl mx-auto"
        >
          <Link
            to="/projects"
            className="btn-outline inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium text-sm group"
          >
            View All Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
