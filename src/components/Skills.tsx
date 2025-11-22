import { motion } from "framer-motion";
import { Database, BarChart3, GitBranch, Wrench } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

const iconMap = {
  Database,
  BarChart3,
  GitBranch,
  Wrench,
};

export const Skills = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">System Modules</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Technical capabilities and core competencies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-lg p-6 h-full relative overflow-hidden transition-all duration-300 hover:border-primary/60">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Animated corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    {/* Icon and Category */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="text-primary" size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">
                        {skill.category}
                      </h3>
                    </div>

                    {/* Module List */}
                    <ul className="space-y-2">
                      {skill.modules.map((module, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                        >
                          <span className="text-primary mt-1 flex-shrink-0 text-xs">▸</span>
                          <span>{module}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Status indicator */}
                    <div className="mt-6 pt-4 border-t border-primary/20">
                      <div className="flex items-center gap-2 text-xs terminal-font">
                        <span className="text-neon-green">●</span>
                        <span className="text-muted-foreground">MODULE ACTIVE</span>
                      </div>
                    </div>
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
