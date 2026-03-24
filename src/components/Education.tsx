import * as React from "react";
import { motion } from "framer-motion";
import { GraduationCap, ExternalLink, Award, Clock } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Credential {
  title: string;
  url: string;
}

interface EducationEntry {
  degree: string;
  field: string;
  institution: string;
  logo: string;
  year: string;
  description: string;
  honors: string[];
  credentials?: Credential[];
}

const accentByIndex: Record<number, { border: string; bg: string; text: string; dot: string }> = {
  0: { border: "border-sky-500/30", bg: "bg-sky-500/10", text: "text-sky-400", dot: "bg-sky-400" },
  1: { border: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-400", dot: "bg-violet-400" },
  2: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  3: { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
};

export const Education = () => {
  const [selectedEducation, setSelectedEducation] = React.useState<EducationEntry | null>(null);

  return (
    <section id="education" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-14"
      >
        <div className="accent-line mb-5" />
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
          Education
        </h2>
        <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
          Aviation Management taught me how complex organizations operate. Data Analytics
          taught me how to measure what's broken. Cornell is teaching me how to build
          what comes next.
        </p>
      </motion.div>

      {/* Education Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
        {(portfolioData.education as EducationEntry[]).map((edu, index) => {
          const accent = accentByIndex[index] || accentByIndex[0];
          const isInProgress = edu.year.includes("Present");

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`glass-card p-6 border ${accent.border} ${accent.bg} transition-all duration-300 hover:border-slate-600`}
            >
              {/* Header: Logo + Degree */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5">
                  <img
                    src={edu.logo}
                    alt={edu.institution}
                    className="w-full h-full object-contain opacity-100"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-mono font-medium ${accent.text}`}>{edu.year}</span>
                    {isInProgress && (
                      <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${accent.bg} ${accent.text} border ${accent.border}`}>
                        <Clock className="w-2.5 h-2.5" />
                        In Progress
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-slate-100 leading-tight">{edu.degree}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{edu.field}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{edu.institution}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {edu.description}
              </p>

              {/* Honors */}
              {edu.honors && edu.honors.length > 0 && (
                <div className="space-y-1.5 mb-4">
                  {edu.honors.map((honor, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Award className={`w-3 h-3 mt-0.5 flex-shrink-0 ${accent.text}`} />
                      <span className="text-[11px] text-slate-500">{honor}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* View Credentials */}
              {edu.credentials && edu.credentials.length > 0 && (
                <button
                  onClick={() => setSelectedEducation(edu)}
                  className={`text-xs ${accent.text} opacity-70 hover:opacity-100 inline-flex items-center gap-1.5 transition-all`}
                >
                  View Credentials
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Credentials Modal */}
      <Dialog open={!!selectedEducation} onOpenChange={() => setSelectedEducation(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-primary" />
              {selectedEducation?.degree}
            </DialogTitle>
            <p className="text-muted-foreground">{selectedEducation?.institution}</p>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {selectedEducation?.credentials?.map((credential, idx) => (
              <div key={idx} className="border border-border/50 rounded-lg overflow-hidden bg-card/30">
                <div className="p-4 border-b border-border/30 bg-card/50">
                  <h3 className="font-semibold text-foreground">{credential.title}</h3>
                </div>
                <div className="aspect-[8.5/11] w-full">
                  <iframe
                    src={credential.url}
                    className="w-full h-full"
                    title={credential.title}
                  />
                </div>
                <div className="p-3 border-t border-border/30 bg-card/50">
                  <a
                    href={credential.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1"
                  >
                    Open in New Tab
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </section>
  );
};
