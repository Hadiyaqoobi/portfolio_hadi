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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
                  <h4 className="font-semibold text-foreground mb-2">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {about.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Card — clean, no terminal aesthetic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Profile</div>
                  <div className="text-xl text-foreground font-bold">{personal.name}</div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-foreground">Actively Seeking Opportunities</span>
                  </div>

                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-foreground">{personal.location.split(" (")[0]}</span>
                  </div>

                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Work Authorization:</span>
                    <span className="text-primary text-xs">Green Card Holder (No Sponsorship)</span>
                  </div>

                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Specialization:</span>
                    <span className="text-foreground text-xs">Product & Strategy + Data Analytics</span>
                  </div>

                  <div className="pt-4">
                    <div className="text-muted-foreground mb-2">Focus Areas:</div>
                    <div className="flex flex-wrap gap-2">
                      {personal.focus.map((focus, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-xs text-primary"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="text-xs text-muted-foreground">
                    <span className="text-primary">●</span> Open to Opportunities |
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
