import { motion } from "framer-motion";
import { GraduationCap, Calendar, Building2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

export const Education = () => {
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
            <GraduationCap className="w-8 h-8 text-neon-cyan" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Education</span>
          </h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Academic Foundation & Continuous Learning
        </p>
      </motion.div>

      {/* Education Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="group relative"
          >
            {/* Card Container */}
            <div className="relative h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 overflow-hidden transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
              {/* Corner Brackets */}
              <div className="absolute top-2 left-2 text-neon-cyan/40 text-2xl font-mono transition-all duration-300 group-hover:text-neon-cyan">
                &lt;
              </div>
              <div className="absolute top-2 right-2 text-neon-cyan/40 text-2xl font-mono transition-all duration-300 group-hover:text-neon-cyan">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/0 to-neon-magenta/0 group-hover:from-neon-cyan/10 group-hover:to-neon-magenta/10 rounded-lg transition-all duration-300" />
                </div>
              </motion.div>

              {/* Degree Title */}
              <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-neon-cyan transition-colors">
                {edu.degree}
              </h3>

              {/* Field of Study */}
              <div className="flex items-start gap-2 mb-3">
                <Building2 className="w-4 h-4 text-neon-cyan mt-1 flex-shrink-0" />
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
                <Calendar className="w-4 h-4 text-neon-magenta" />
                <span className="text-sm text-muted-foreground">{edu.year}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                {edu.description}
              </p>

              {/* Scan Line Effect */}
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100"
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
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-magenta group-hover:w-full transition-all duration-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background Accent */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none"
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
