import * as React from "react";
import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { Education } from "@/components/Education";
import { motion } from "framer-motion";
import {
  Shield,
  ExternalLink,
  FileText,
  ChevronDown,
  Clock,
  Cpu,
  Code2,
  BarChart3,
  Server,
  Briefcase,
  BadgeCheck,
} from "lucide-react";
import {
  certificates,
  categoryOrder,
  Certificate,
  CertificateCategory,
  getCertificatesByCategory,
} from "@/data/certificates";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categoryConfig: Record<
  CertificateCategory,
  { icon: React.ElementType; accent: string; border: string; bg: string; dot: string }
> = {
  "AI & Intelligent Systems": {
    icon: Cpu,
    accent: "text-violet-400",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    dot: "bg-violet-500",
  },
  "Computer Science & Software Foundations": {
    icon: Code2,
    accent: "text-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    dot: "bg-sky-500",
  },
  "Data Science, Analytics & Machine Learning": {
    icon: BarChart3,
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    dot: "bg-emerald-500",
  },
  "IT Systems, DevOps & Automation": {
    icon: Server,
    accent: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    dot: "bg-amber-500",
  },
  "Product, Business & Project Management": {
    icon: Briefcase,
    accent: "text-rose-400",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    dot: "bg-rose-500",
  },
};

const EducationPage = () => {
  const [selectedCert, setSelectedCert] = React.useState<Certificate | null>(null);
  const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(new Set());

  const featuredCerts = certificates
    .filter((c) => c.featured)
    .sort((a, b) => (a.priority || 99) - (b.priority || 99));

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-screen">
      <Background />
      <Navigation />

      <main className="relative z-10 pt-20">
        {/* Degrees Section */}
        <Education />

        {/* Certificates Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <div className="accent-line mb-5" />
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
                  Professional Certificates
                </h2>
                <a
                  href="https://www.credly.com/users/mohammad-hadi-yaqoobi/badges"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 self-start flex-shrink-0"
                >
                  <BadgeCheck className="w-4 h-4" />
                  Verify on Credly
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
              <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
                Each certificate was chosen to close a specific skill gap. Harvard CS50 for
                foundations. Stanford Algorithms for system design thinking. Google BI for
                dashboard delivery. Cornell AI360 for what comes next.
              </p>
            </motion.div>

            {/* Core Certificates: Top 5 Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-4 h-4 text-slate-500" />
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Core Certifications
                </h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredCerts.map((cert, index) => {
                  const catConfig = categoryConfig[cert.category];
                  return (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      onClick={() => cert.pdfUrl !== "#" && setSelectedCert(cert)}
                      className={`glass-card p-5 border ${catConfig.border} ${catConfig.bg} transition-all duration-300 hover:border-slate-600 ${cert.pdfUrl !== "#" ? "cursor-pointer" : ""}`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Provider Logo */}
                        <div className="w-11 h-11 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5">
                          <img
                            src={cert.providerLogo}
                            alt={cert.provider}
                            className="w-full h-full object-contain opacity-100"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-mono font-medium ${catConfig.accent}`}>
                              {cert.date}
                            </span>
                            {cert.inProgress && (
                              <span
                                className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${catConfig.bg} ${catConfig.accent} border ${catConfig.border}`}
                              >
                                <Clock className="w-2.5 h-2.5" />
                                In Progress
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-semibold text-slate-100 leading-tight">
                            {cert.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">{cert.provider}</p>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {cert.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-full border border-slate-700 text-slate-300 bg-slate-800/50"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 4 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-700 text-slate-400 bg-slate-800/50">
                            +{cert.skills.length - 4}
                          </span>
                        )}
                      </div>

                      {/* View link */}
                      {cert.pdfUrl !== "#" && (
                        <div className="mt-3 pt-3 border-t border-slate-700">
                          <span
                            className={`text-xs ${catConfig.accent} inline-flex items-center gap-1.5`}
                          >
                            View Certificate
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* All Certificates by Category: Expandable */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-4 h-4 text-slate-500" />
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  All Certificates by Domain
                </h3>
              </div>

              <div className="space-y-3">
                {categoryOrder.map((category, catIndex) => {
                  const categoryCerts = getCertificatesByCategory(category);
                  if (categoryCerts.length === 0) return null;

                  const config = categoryConfig[category];
                  const Icon = config.icon;
                  const isExpanded = expandedCategories.has(category);

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: catIndex * 0.05 }}
                    >
                      {/* Category Header: clickable toggle */}
                      <button
                        onClick={() => toggleCategory(category)}
                        className={`w-full glass-card p-4 border ${config.border} ${config.bg} transition-all duration-300 hover:border-slate-600 flex items-center justify-between ${isExpanded ? "rounded-t-xl rounded-b-none" : "rounded-xl"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg ${config.bg} border ${config.border} flex items-center justify-center`}
                          >
                            <Icon className={`w-4 h-4 ${config.accent}`} />
                          </div>
                          <div className="text-left">
                            <h4 className="text-sm font-semibold text-slate-100">{category}</h4>
                            <p className="text-[11px] text-slate-400">
                              {categoryCerts.length} certificate
                              {categoryCerts.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Expanded certificate list */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className={`border ${config.border} border-t-0 rounded-b-xl overflow-hidden bg-slate-800/50`}
                        >
                          <div className="p-4 space-y-3">
                            {categoryCerts.map((cert) => (
                              <div
                                key={cert.id}
                                onClick={() => cert.pdfUrl !== "#" && setSelectedCert(cert)}
                                className={`flex items-center gap-4 p-3 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-800/80 transition-all duration-200 ${cert.pdfUrl !== "#" ? "cursor-pointer" : ""}`}
                              >
                                <div className="w-9 h-9 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
                                  <img
                                    src={cert.providerLogo}
                                    alt={cert.provider}
                                    className="w-full h-full object-contain opacity-100"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="text-xs font-semibold text-slate-100 leading-tight truncate">
                                    {cert.title}
                                  </h5>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] text-slate-400">{cert.provider}</span>
                                    {cert.date && (
                                      <>
                                        <span className="text-slate-600">·</span>
                                        <span className={`text-[10px] font-mono ${config.accent}`}>
                                          {cert.date}
                                        </span>
                                      </>
                                    )}
                                    {cert.inProgress && (
                                      <span
                                        className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${config.bg} ${config.accent} border ${config.border}`}
                                      >
                                        In Progress
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {cert.pdfUrl !== "#" && (
                                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Stats strip + Credly verification */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-14"
            >
              <div className="flex flex-wrap items-center justify-center gap-8 text-center mb-6">
                {[
                  { value: certificates.length.toString(), label: "Certificates" },
                  {
                    value: Array.from(new Set(certificates.map((c) => c.provider))).length.toString(),
                    label: "Institutions",
                  },
                  { value: "20+", label: "Credly Badges" },
                  {
                    value: certificates.filter((c) => c.inProgress).length.toString(),
                    label: "In Progress",
                  },
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-slate-300 font-mono">{stat.value}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <a
                  href="https://www.credly.com/users/mohammad-hadi-yaqoobi/badges"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                >
                  <BadgeCheck className="w-3.5 h-3.5" />
                  All credentials independently verified on Credly
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
          </div>
        </section>
      </main>

      {/* Certificate PDF Modal */}
      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              {selectedCert?.title}
            </DialogTitle>
            <p className="text-muted-foreground">{selectedCert?.provider}</p>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {selectedCert?.skills && selectedCert.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedCert.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-primary/10 text-primary border border-primary/30 rounded px-2 py-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="border border-border/50 rounded-lg overflow-hidden bg-card/30">
              <div className="aspect-[8.5/11] w-full">
                <iframe
                  src={selectedCert?.pdfUrl}
                  className="w-full h-full"
                  title={selectedCert?.title}
                />
              </div>
              <div className="p-3 border-t border-border/30 bg-card/50">
                <a
                  href={selectedCert?.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1"
                >
                  Open in New Tab
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EducationPage;
