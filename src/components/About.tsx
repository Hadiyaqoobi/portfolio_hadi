import { motion } from "framer-motion";
import { GraduationCap, Target } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

export const About = () => {
  const { about, personal } = portfolioData;

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-foreground leading-relaxed">
              {about.description}
            </p>

            <div className="border-l-2 border-primary pl-6 space-y-4">
              <div className="flex items-start gap-3">
                <GraduationCap className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Education</h4>
                  <p className="text-muted-foreground">{about.education}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Target className="text-accent mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {about.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-lg p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 space-y-6">
                <div className="terminal-font">
                  <div className="text-sm text-muted-foreground mb-2">$ whoami</div>
                  <div className="text-xl text-primary font-bold">{personal.name}</div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-primary/20 pb-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-foreground font-mono">Active</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-primary/20 pb-2">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-foreground font-mono">{personal.location.split(" (")[0]}</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-primary/20 pb-2">
                    <span className="text-muted-foreground">Clearance:</span>
                    <span className="text-neon-green font-mono">Green Card Holder</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-primary/20 pb-2">
                    <span className="text-muted-foreground">Specialization:</span>
                    <span className="text-foreground font-mono">Data + Systems</span>
                  </div>

                  <div className="pt-4">
                    <div className="text-muted-foreground mb-2">Core Competencies:</div>
                    <div className="flex flex-wrap gap-2">
                      {personal.focus.map((focus, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-accent/10 border border-accent/30 rounded text-xs text-accent"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-primary/20">
                  <div className="text-xs text-muted-foreground terminal-font">
                    <span className="text-neon-green">●</span> System Ready | 
                    <span className="text-primary"> Online</span> | 
                    <span className="text-accent"> Available for Collaboration</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
