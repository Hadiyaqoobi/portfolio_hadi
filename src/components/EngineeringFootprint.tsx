import { motion } from "framer-motion";
import {
  ExternalLink,
  Database,
  Cloud,
  BarChart3,
  Bot,
  Terminal,
  Users,
  FolderGit2,
} from "lucide-react";
import { useGitHubAnalytics } from "@/hooks/useGitHubAnalytics";

const technicalCapabilities = [
  {
    icon: Database,
    domain: "SQL & Data Engineering",
    proof: "960+ data points validated per property across ~300 properties",
    tools: "SQL Server, PostgreSQL, Snowflake, T-SQL Stored Procedures",
    context: "Built validation engines, ETL pipelines, and data migration scripts at enterprise scale. Authored stored procedures that catch every billing discrepancy before it reaches the resident.",
    accent: "emerald",
  },
  {
    icon: Cloud,
    domain: "Cloud & Identity Architecture",
    proof: "135,000+ accounts migrated with zero incidents",
    tools: "Azure B2C, Entra ID, Key Vault, mTLS, CyberArk",
    context: "Led full SDLC for Azure B2C authentication migration across 7 teams. Managed JWT tokens, mTLS certificates, and secrets rotation across environments.",
    accent: "violet",
  },
  {
    icon: BarChart3,
    domain: "Data Visualization & Analytics",
    proof: "488,320+ survey records surfaced for self-service across 304 properties, 11 states",
    tools: "Power BI, Excel/VBA, T-SQL",
    context: "Built dashboards for fee transparency compliance, property analytics, and cross-state regulatory reporting. Translated raw SQL outputs into self-service analytics for non-technical stakeholders.",
    accent: "rose",
  },
  {
    icon: Terminal,
    domain: "Python & Automation",
    proof: "Synthetic data and training pipelines behind 5 trained ML models",
    tools: "Python, PyTorch, FastAPI, Optuna",
    context: "Built the Python pipelines behind TakveenUp: synthetic data generation with a multi-gate quality protocol, FastAPI services with three-level fallback chains, and automated leakage detection that blocks training on contaminated data.",
    accent: "amber",
  },
  {
    icon: Bot,
    domain: "AI & Machine Learning",
    proof: "5 production ML models trained, research under review at Springer",
    tools: "LLM APIs (Anthropic, OpenAI, Gemini), scikit-learn, PyTorch, pgvector",
    context: "Designed the multi-agent LLM pipeline behind MakerMind and the ML architecture behind TakveenUp; research on LLM statistical reliability under review at Springer.",
    accent: "sky",
  },
  {
    icon: Users,
    domain: "Methods & Stakeholder Management",
    proof: "6 enterprise teams coordinated across 4 deployment phases",
    tools: "Agile/Scrum, Waterfall, SDLC, Azure DevOps, ServiceNow",
    context: "Author BRDs/FRDs, facilitate requirements workshops, run UAT cycles, and manage cross-functional alignment between CloudOps, SecOps, DevOps, Infrastructure, Legal, and Finance.",
    accent: "indigo",
  },
];

const accentColors: Record<string, { bg: string; border: string; text: string }> = {
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-400" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400" },
  sky: { bg: "bg-sky-500/10", border: "border-sky-500/30", text: "text-sky-400" },
  indigo: { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400" },
};

export const EngineeringFootprint = () => {
  const { summary, languages, loading, isLive } = useGitHubAnalytics();

  return (
    <section id="systems" className="py-section relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-6xl mx-auto"
        >
          <div className="accent-line mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
            Systems & Implementation
          </h2>
          <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
            Every tool tied to a real outcome. SQL validation engines, cloud migrations,
            ML architectures, and the frameworks that keep them running.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Live GitHub Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-5 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FolderGit2 className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-300">GitHub</span>
                {!loading && summary && (
                  <span className="text-sm text-slate-500">
                    {summary.total_repos} repositories · {summary.languages_count} languages
                  </span>
                )}
              </div>
              {isLive && (
                <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live from GitHub API
                </span>
              )}
            </div>

            {/* Language bar */}
            {languages.length > 0 && (
              <>
                <div className="flex rounded-full overflow-hidden h-2 mb-3">
                  {languages.slice(0, 6).map((lang, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color || 'hsl(var(--muted))',
                      }}
                      className="transition-all duration-500"
                      title={`${lang.name}: ${lang.percentage.toFixed(1)}%`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {languages.slice(0, 6).map((lang, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: lang.color || 'hsl(var(--muted))' }}
                      />
                      <span className="text-[11px] text-slate-500">
                        {lang.name}{" "}
                        <span className="text-slate-400">{lang.percentage.toFixed(1)}%</span>
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-3 h-3 border border-slate-600 border-t-slate-400 rounded-full animate-spin" />
                Loading from GitHub API...
              </div>
            )}
          </motion.div>

          {/* Capability Stacked List - 2 Columns on Desktop */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div className="space-y-0">
              {technicalCapabilities.slice(0, 3).map((cap, idx) => {
                const Icon = cap.icon;
                const colors = accentColors[cap.accent];

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group px-4 py-4 hover:bg-slate-800/30 transition-colors duration-300 border-b border-slate-800 last:border-b-0 cursor-default"
                  >
                    {/* Icon + Domain + Proof */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-slate-100">{cap.domain}</h3>
                        <p className={`text-xs font-medium ${colors.text} mt-0.5`}>{cap.proof}</p>
                      </div>
                    </div>

                    {/* Context + Tools */}
                    <div className="ml-11">
                      <p className="text-xs text-slate-500 leading-relaxed mb-1.5">
                        {cap.context}
                      </p>
                      <div className="flex flex-wrap gap-1 text-[10px] text-slate-400">
                        {cap.tools.split(", ").map((tool, toolIdx) => (
                          <span key={tool}>
                            {tool}
                            {toolIdx < cap.tools.split(", ").length - 1 && <span className="mx-1">·</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column */}
            <div className="space-y-0">
              {technicalCapabilities.slice(3, 6).map((cap, idx) => {
                const Icon = cap.icon;
                const colors = accentColors[cap.accent];
                const actualIdx = idx + 3;

                return (
                  <motion.div
                    key={actualIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: actualIdx * 0.08 }}
                    className="group px-4 py-4 hover:bg-slate-800/30 transition-colors duration-300 border-b border-slate-800 last:border-b-0 cursor-default"
                  >
                    {/* Icon + Domain + Proof */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-slate-100">{cap.domain}</h3>
                        <p className={`text-xs font-medium ${colors.text} mt-0.5`}>{cap.proof}</p>
                      </div>
                    </div>

                    {/* Context + Tools */}
                    <div className="ml-11">
                      <p className="text-xs text-slate-500 leading-relaxed mb-1.5">
                        {cap.context}
                      </p>
                      <div className="flex flex-wrap gap-1 text-[10px] text-slate-400">
                        {cap.tools.split(", ").map((tool, toolIdx) => (
                          <span key={tool}>
                            {tool}
                            {toolIdx < cap.tools.split(", ").length - 1 && <span className="mx-1">·</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* GitHub Link */}
          <div className="text-center">
            <a
              href="https://github.com/Hadiyaqoobi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-100 transition-colors"
            >
              View GitHub Profile
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
