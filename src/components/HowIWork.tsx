import { motion } from "framer-motion";
import { Search, PenTool, Repeat, CheckCircle } from "lucide-react";

/*
 * Adaptive framework: 4 phases, each showing HOW the approach changes
 * based on the problem. Real project examples prove flexibility.
 * Apple wants: design thinking, end-to-end ownership, problem framing.
 * Google wants: structured thinking, adaptive methodology, quantified impact.
 */

const phases = [
  {
    icon: Search,
    step: "01",
    title: "Understand the Problem",
    subtitle: "I start by talking to the people who live with the system, not just the people who sponsor it.",
    approaches: [
      {
        context: "Enterprise (Equity Residential)",
        detail: "Stakeholder interviews across 7 teams to map dependencies before writing a single requirement. Gap analysis of current-state systems and processes.",
      },
      {
        context: "Nonprofit (ConnectionHub)",
        detail: "User personas built with real device specs (Samsung Galaxy A03, 2GB RAM, 0.8 Mbps 3G). Designed for the constraint, not the ideal.",
      },
      {
        context: "Contract (AHRC)",
        detail: "Competitive gap analysis of 4 existing platforms (Rawadari, Afghan Witness, ACLED, HURIDOCS) to define differentiated requirements.",
      },
    ],
    accentColor: "hsl(230 80% 65%)",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Define the Solution",
    subtitle: "I choose the documentation depth based on the stakes. Regulatory compliance gets a full specification with audit trails. An MVP gets user stories.",
    approaches: [
      {
        context: "When regulations drive the timeline",
        detail: "BRDs and FRDs with functional requirements, data requirements, UI specs, edge cases, and acceptance criteria. Multi-state compliance (CA, VA, CO) delivered ahead of every deadline.",
      },
      {
        context: "When requirements are unclear",
        detail: "Data models, process flows, and integration architecture mapped across 6 systems (PostgreSQL, Snowflake, Salesforce, Mailchimp, GA, Zoom) with sync frequencies defined per endpoint.",
      },
      {
        context: "When speed matters",
        detail: "Agile user stories with clear definitions of done in Azure DevOps. Technical feasibility validated directly with engineering before sprint commitment.",
      },
    ],
    accentColor: "hsl(170 60% 55%)",
  },
  {
    icon: Repeat,
    step: "03",
    title: "Build and Iterate",
    subtitle: "I adapt the execution model to the problem. Some projects need formal phases. Others need weekly feedback loops.",
    approaches: [
      {
        context: "Phased Rollout (Waterfall)",
        detail: "Azure B2C migration: 4 deployment phases across 7 teams with formal go/no-go decisions. 135,000+ accounts. Zero incidents. No room for iteration mid-rollout.",
      },
      {
        context: "Agile Sprints",
        detail: "2-week sprints, daily standups, sprint reviews, stakeholder demos. SQL validation and UAT coordination integrated into every sprint cycle.",
      },
      {
        context: "Hybrid (R&D)",
        detail: "Requirements defined up front, execution in iterative cycles. One product live and three in active development in my independent R&D work, plus five ML models trained the same way.",
      },
    ],
    accentColor: "hsl(38 80% 60%)",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Validate and Measure",
    subtitle: "Ship it, then prove it works. If I can't measure the impact, I haven't finished the job.",
    approaches: [
      {
        context: "SQL Validation",
        detail: "Production stored procedures checking 960+ data points per property across ~300 properties. Every billing discrepancy caught before resident impact.",
      },
      {
        context: "Dashboards and Analytics",
        detail: "The metrics dashboard the board used to track growth to 9,447 learning hours. Predictive models with R-squared 0.811 on 10,600+ property transactions.",
      },
      {
        context: "Post-Deployment",
        detail: "Post-deployment monitoring, issue triage, retrospectives. Continuous improvement of processes and documentation based on what the data shows.",
      },
    ],
    accentColor: "hsl(260 60% 60%)",
  },
];

export const HowIWork = () => {
  return (
    <section className="py-section-lg relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-6xl mx-auto"
        >
          <div className="accent-line mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
            How I Work
          </h2>
          <p className="text-slate-400 text-base max-w-lg">
            I adapt the approach to the problem. Agile, Waterfall, or hybrid: the methodology follows the constraints, not the other way around.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-6">
          {phases.map((phase, index) => {
            const Icon = phase.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group"
              >
                {/* Phase header row */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${phase.accentColor}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: phase.accentColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span
                        className="text-[11px] font-mono font-semibold tracking-wider"
                        style={{ color: phase.accentColor, opacity: 0.7 }}
                      >
                        {phase.step}
                      </span>
                      <h3 className="text-base font-bold text-slate-100">
                        {phase.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                {/* Approaches as compact cards row */}
                <div className="grid md:grid-cols-3 gap-3 ml-12">
                  {phase.approaches.map((approach, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 + idx * 0.05 + 0.2 }}
                      className="px-4 py-3 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <span
                        className="text-[10px] font-semibold tracking-wide uppercase block mb-1.5"
                        style={{ color: phase.accentColor, opacity: 0.7 }}
                      >
                        {approach.context}
                      </span>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {approach.detail}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Divider between phases */}
                {index !== phases.length - 1 && (
                  <div className="border-b border-slate-800 mt-6" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
