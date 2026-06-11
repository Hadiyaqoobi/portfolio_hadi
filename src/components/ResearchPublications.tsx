import { FileText, ExternalLink, Github, Clock, ArrowRight, Lightbulb, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const ResearchPublications = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="accent-line mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
            Research & Systems Thinking
          </h2>
          <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
            My thesis mapped how complex enterprises adopt new technology. My Springer paper
            validated when AI systems can and can't be trusted. Both inform how I
            gather requirements, assess risk, and design solutions.
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Featured Publication - EMSE Paper */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card glow-consulting p-6 sm:p-8 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-amber-400" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    Journal Article
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800/50 text-slate-400 border border-slate-700">
                    <Clock className="w-3 h-3" />
                    Under Peer Review
                  </span>
                  <span className="text-xs text-slate-400">2026</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-1 leading-tight">
                  AI System Validation & Governance
                </h3>
                <p className="text-sm text-slate-400 mb-3 italic">
                  The Mirage of Statistical Significance: How LLM-as-Annotator Fabricates Empirical Findings in Software Engineering Research
                </p>

                <p className="text-sm text-slate-400 mb-4">
                  <span className="text-slate-300 font-medium">M. Hadi Yaqoobi</span>
                  {" · "}
                  <span className="italic">Empirical Software Engineering (EMSE), Springer</span>
                </p>

                <p className="text-slate-400 mb-5 leading-relaxed text-sm">
                  Systematic analysis of 584 AI conference transcripts (2.49M words) to quantify
                  when small language models produce fabricated statistical findings. Discovered
                  90.3% of model-generated findings were unverifiable. The models weren't
                  analyzing data, they were pattern-matching training data and generating
                  plausible-sounding numbers. Developed a four-step replication protocol that
                  catches these failures before they reach production decisions.
                </p>

                {/* Business Relevance Callout */}
                <div className="mb-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-amber-400 mb-1">Why this matters for enterprise systems</p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        As organizations integrate AI into vendor evaluation, compliance documentation,
                        and product decisions, they need quality assurance frameworks that
                        non-technical stakeholders can trust. This research builds exactly that:
                        a validation methodology for AI outputs in business-critical environments.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "AI Governance",
                    "Quality Assurance Framework",
                    "Statistical Validation",
                    "Risk Assessment",
                    "Data Analysis (584 Samples)",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-slate-700 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/Hadiyaqoobi/mirage-replication"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
                  >
                    <Github className="w-4 h-4" />
                    Replication Package
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Earlier Publication - IoT Thesis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 sm:p-8 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-slate-400" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800/50 text-slate-400 border border-slate-700">
                    Graduation Thesis
                  </span>
                  <span className="text-xs text-slate-400">2019</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-1 leading-tight">
                  Enterprise Digital Transformation & Maturity Assessment
                </h3>
                <p className="text-sm text-slate-400 mb-3 italic">
                  Smart Airport: How IoT and New Technologies Shape the Future of Airport Industry
                </p>

                <p className="text-slate-400 mb-5 leading-relaxed text-sm">
                  Comprehensive digital maturity analysis across 10+ international airport
                  systems. Mapped current-state operations against target-state architectures,
                  conducted stakeholder analysis across competing organizational priorities,
                  and identified where technology adoption outpaced organizational readiness.
                  Prioritized capability gaps and designed a transformation roadmap balancing
                  legacy system constraints with modernization goals.
                </p>

                {/* Business Relevance Callout */}
                <div className="mb-5 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-slate-300 mb-1">Why this matters for enterprise systems</p>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        As-is / to-be mapping, gap analysis, stakeholder alignment across
                        competing priorities, and capability roadmapping. These are the same
                        deliverables I produce as a Business Systems Analyst for enterprise
                        digital transformation initiatives.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "As-Is / To-Be Analysis",
                    "Gap Analysis",
                    "Digital Maturity Model",
                    "Stakeholder Analysis",
                    "Capability Roadmap",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-slate-700 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="/publications/smart-airport-thesis.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
                >
                  Read Thesis
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Research Arc Connector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 px-6 py-4 rounded-xl border border-slate-700 bg-slate-800/50"
          >
            <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="text-slate-300 font-medium">The thread:</span>{" "}
              My thesis analyzed how complex organizations adopt new technology.
              My Springer paper analyzed when AI can be trusted to support those decisions.
              My day-to-day work applies both: mapping systems, validating data, and
              designing solutions that account for what the technology actually delivers.
            </p>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ResearchPublications;
