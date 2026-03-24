import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ShieldCheck,
  DatabaseZap,
  SearchCheck,
  Zap,
  BarChart3,
  Users,
  Brain,
} from "lucide-react";

/* Animated counter — triggers on scroll */
const AnimatedNumber = ({
  value,
  suffix = "",
  duration = 2,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (decimals > 0) setDisplay(v.toFixed(decimals));
        else setDisplay(Math.round(v).toLocaleString());
      },
    });
    return () => controls.stop();
  }, [isInView, value, duration, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  );
};

export const ImpactResults = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  /*
   * Framed as IMPACT STORIES, not skill labels.
   * Each card: Outcome headline → scale metric → how (the approach proves the skill).
   * Apple: Problem → Approach → Quantified Outcome
   * Google: Metric → Analysis → Business Impact
   */
  const impacts = [
    {
      icon: SearchCheck,
      outcome: "SQL & Data Validation",
      metric: { value: 960, suffix: "+ data points/property", duration: 2 },
      how: "Production stored procedures with 6-table JOINs and 3 nested subquery levels. WHILE-loop validation engine auditing RUBS utility costs across 380+ properties and 8 database tables. Eliminated 104 manual query executions per year. Every billing discrepancy caught before resident impact.",
      scope: "Equity Residential · S&P 500 · 80,000 units",
      accentColor: "emerald" as const,
      span: "md:col-span-2",
    },
    {
      icon: DatabaseZap,
      outcome: "ETL & Data Warehousing",
      metric: { value: 6, suffix: " system integrations", duration: 1.5 },
      how: "Engineered Snowflake data warehouse with star schema (3 fact tables, 8 dimension tables, SCD Type 2). Built ETL pipelines across PostgreSQL, Snowflake, Salesforce, Mailchimp, Google Analytics, and Zoom. Mapped data flows and sync frequencies for each integration point.",
      scope: "ConnectionHub · 1,182 students · 5 countries",
      accentColor: "indigo" as const,
      span: "md:col-span-2",
    },
    {
      icon: BarChart3,
      outcome: "Data Visualization & Analytics",
      metric: { value: 8, suffix: " Tableau dashboards", duration: 1.5 },
      how: "Designed dashboards the board used to track growth to 9,447 learning hours across 5 countries. Built Excel/VBA tracking systems that identified 47 cross-platform listing discrepancies. Predictive modeling pipeline analyzing 10,600+ property transactions with neural networks (R-squared 0.811).",
      scope: "ConnectionHub · Equity Residential · Boston University",
      accentColor: "rose" as const,
      span: "md:col-span-2",
    },
    {
      icon: Brain,
      outcome: "ML Systems Design & Production Models",
      metric: { value: 5, suffix: " models designed & trained", duration: 1.5 },
      how: "Architected end-to-end ML systems from requirements gathering through production deployment. Designed data pipelines, defined evaluation criteria, and iterated 5 models across NER (XLM-RoBERTa, F1=0.7476), multilingual embeddings (24/25 occupational codes), Dari speech recognition (LoRA-finetuned Whisper), job retention prediction (LightGBM, 22 features, Bayesian optimization), and fairness-aware wage modeling. Authored technical specs, built synthetic data generation protocols, and documented model cards for each release.",
      scope: "Nexuss Science · TakveenUp · 5 Production Models",
      accentColor: "cyan" as const,
      span: "md:col-span-2",
    },
    {
      icon: ShieldCheck,
      outcome: "Full SDLC & Cloud Migration",
      metric: { value: 135000, suffix: "+ accounts migrated", duration: 2.2 },
      how: "Managed the full software development lifecycle from requirements gathering through BRDs and FRDs, to UAT coordination, to production deployment. Led 4-phase Azure B2C rollout across 6 cross-functional teams (CloudOps, Infrastructure, SecOps, AppOps, DevOps). Zero authentication incidents.",
      scope: "Equity Residential · Azure B2C · 3 state regulations",
      accentColor: "violet" as const,
      span: "md:col-span-2",
    },
    {
      icon: Zap,
      outcome: "Python & Process Automation",
      metric: { value: 104, suffix: " manual runs → 0", duration: 1.8 },
      how: "Python automation cut student verification from 14 days to 48 hours, tripling enrollment. SQL stored procedure automated weekly delinquency campaigns. Built 79,749-line Python governance framework tested against 51 open-source codebases (49% fewer issues in disciplined repos).",
      scope: "Equity Residential · ConnectionHub · Nexuss Science",
      accentColor: "amber" as const,
      span: "md:col-span-2",
    },
    {
      icon: Users,
      outcome: "Cross-Functional Stakeholder Management",
      metric: { value: 6, suffix: " enterprise teams coordinated", duration: 1.5 },
      how: "Coordinated CloudOps, Infrastructure, SecOps, AppOps, DevOps, and developers through a zero-incident migration. Led 15-person team delivering 2 platforms across 5 countries. Managed 2 resident populations with 2 pricing tiers and 2 construction timelines simultaneously.",
      scope: "Equity Residential · ConnectionHub · AHRC",
      accentColor: "sky" as const,
      span: "md:col-span-2",
    },
  ];

  const colors: Record<string, {
    bg: string; border: string; icon: string; glow: string; number: string; scope: string;
  }> = {
    indigo: {
      bg: "bg-indigo-500/10", border: "border-indigo-500/30", icon: "text-indigo-400",
      glow: "from-indigo-500/0 via-indigo-500/20 to-indigo-500/0",
      number: "from-indigo-400 to-indigo-300", scope: "text-indigo-400",
    },
    violet: {
      bg: "bg-violet-500/10", border: "border-violet-500/30", icon: "text-violet-400",
      glow: "from-violet-500/0 via-violet-500/20 to-violet-500/0",
      number: "from-violet-400 to-violet-300", scope: "text-violet-400",
    },
    emerald: {
      bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: "text-emerald-400",
      glow: "from-emerald-500/0 via-emerald-500/20 to-emerald-500/0",
      number: "from-emerald-400 to-emerald-300", scope: "text-emerald-400",
    },
    amber: {
      bg: "bg-amber-500/10", border: "border-amber-500/30", icon: "text-amber-400",
      glow: "from-amber-500/0 via-amber-500/20 to-amber-500/0",
      number: "from-amber-400 to-amber-300", scope: "text-amber-400",
    },
    rose: {
      bg: "bg-rose-500/10", border: "border-rose-500/30", icon: "text-rose-400",
      glow: "from-rose-500/0 via-rose-500/20 to-rose-500/0",
      number: "from-rose-400 to-rose-300", scope: "text-rose-400",
    },
    sky: {
      bg: "bg-sky-500/10", border: "border-sky-500/30", icon: "text-sky-400",
      glow: "from-sky-500/0 via-sky-500/20 to-sky-500/0",
      number: "from-sky-400 to-sky-300", scope: "text-sky-400",
    },
    cyan: {
      bg: "bg-cyan-500/10", border: "border-cyan-500/30", icon: "text-cyan-400",
      glow: "from-cyan-500/0 via-cyan-500/20 to-cyan-500/0",
      number: "from-cyan-400 to-cyan-300", scope: "text-cyan-400",
    },
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-6xl mx-auto"
        >
          <div className="accent-line mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
            What I've Delivered
          </h2>
          <p className="text-slate-400 text-base max-w-lg">
            SQL, ETL, ML systems design, data visualization, SDLC, and automation across enterprise, nonprofit, and R&D
          </p>
        </motion.div>

        {/* Impact story stacked rows */}
        <div
          ref={sectionRef}
          className="max-w-6xl mx-auto space-y-0"
        >
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            const c = colors[impact.accentColor];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative py-7 px-6 border-b border-slate-800 transition-all duration-300 hover:bg-slate-900/20"
              >
                {/* Left accent bar (3px) */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  impact.accentColor === 'emerald' ? 'bg-emerald-500' :
                  impact.accentColor === 'indigo' ? 'bg-indigo-500' :
                  impact.accentColor === 'rose' ? 'bg-rose-500' :
                  impact.accentColor === 'violet' ? 'bg-violet-500' :
                  impact.accentColor === 'amber' ? 'bg-amber-500' :
                  impact.accentColor === 'cyan' ? 'bg-cyan-500' :
                  'bg-sky-500'
                } transition-all duration-300 group-hover:w-1.5`} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-4">
                  {/* Left column: Icon + outcome headline + metric */}
                  <div className="flex flex-col">
                    {/* Icon + outcome headline */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-lg ${c.bg} ${c.border} border flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${c.icon}`} />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-100 leading-snug">
                        {impact.outcome}
                      </h3>
                    </div>

                    {/* Scale metric — large and prominent */}
                    <div className="mt-2">
                      <div className="text-3xl md:text-4xl font-bold tracking-tight">
                        <span className={`bg-gradient-to-b ${c.number} bg-clip-text text-transparent`}>
                          <AnimatedNumber
                            value={impact.metric.value}
                            suffix={impact.metric.suffix}
                            duration={impact.metric.duration}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right column: Description + scope */}
                  <div className="flex flex-col justify-between">
                    {/* How — the approach (skills are embedded in the story) */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">
                      {impact.how}
                    </p>

                    {/* Scope tag — which companies/contexts */}
                    <span className={`text-xs font-mono tracking-widest uppercase ${c.scope} w-fit`}>
                      {impact.scope}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
