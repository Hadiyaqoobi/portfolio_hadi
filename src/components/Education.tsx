import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, BookOpen, ExternalLink } from "lucide-react";
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

export const Education = () => {
  const [selectedEducation, setSelectedEducation] = useState<EducationEntry | null>(null);

  return (
    <section id="education" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-16 text-center"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <GraduationCap className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Education</span>
          </h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Academic Foundation & Continuous Learning
        </p>
      </motion.div>

      {/* Education Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(portfolioData.education as EducationEntry[]).map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative"
          >
            {/* Card Container */}
            <div className="relative h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col">
              {/* Corner Brackets */}
              <div className="absolute top-2 left-2 text-primary/40 text-2xl font-mono transition-all duration-300 group-hover:text-primary">
                &lt;
              </div>
              <div className="absolute top-2 right-2 text-primary/40 text-2xl font-mono transition-all duration-300 group-hover:text-primary">
                /&gt;
              </div>

              {/* University Logo */}
              <motion.div
                className="mb-6 flex justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-32 h-20 flex items-center justify-center bg-background/80 rounded-lg border border-border/30 p-3">
                  <img
                    src={edu.logo}
                    alt={edu.institution}
                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 rounded-lg transition-all duration-300" />
                </div>
              </motion.div>

              {/* Degree Title */}
              <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                {edu.degree}
              </h3>

              {/* Field of Study */}
              <div className="flex items-start gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-base font-medium text-muted-foreground">
                  {edu.field}
                </p>
              </div>

              {/* Institution */}
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                {edu.institution}
              </p>

              {/* Year */}
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">{edu.year}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4 flex-grow">
                {edu.description}
              </p>

              {/* Honors & Achievements */}
              {edu.honors && edu.honors.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border/30">
                  <h4 className="text-xs font-semibold text-primary mb-2 flex items-center gap-2">
                    <span className="inline-block w-1 h-1 bg-primary rounded-full"></span>
                    HONORS & ACHIEVEMENTS
                  </h4>
                  <ul className="space-y-1.5">
                    {edu.honors.map((honor, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="text-xs text-muted-foreground/90 flex items-start gap-2"
                      >
                        <span className="text-accent mt-0.5">▸</span>
                        <span>{honor}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* View Credentials Link */}
              {edu.credentials && edu.credentials.length > 0 && (
                <button
                  onClick={() => setSelectedEducation(edu)}
                  className="mt-4 text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors group/link"
                >
                  View Credentials
                  <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </button>
              )}

              {/* Scan Line Effect */}
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100"
                animate={{
                  y: [0, 300],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
            </div>
          </motion.div>
        ))}
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

      {/* Background Accent */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
};