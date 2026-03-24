import { motion } from "framer-motion";
import { Lightbulb, BarChart3, Brain, ArrowRightLeft } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

const iconMap: Record<string, any> = {
  Lightbulb,
  BarChart3,
  Brain,
  ArrowRightLeft,
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
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Core Competencies
          </h2>
          <p className="text-muted-foreground text-base">
            Skills and capabilities across product, data, AI, and execution
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.icon] || Lightbulb;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card p-6 h-full hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="text-primary" size={20} />
                  </div>
                  <h3 className="text-base font-bold text-foreground font-sans">
                    {skill.category}
                  </h3>
                </div>

                <ul className="space-y-2">
                  {skill.modules.map((module, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary/60 mt-1 text-xs">●</span>
                      <span>{module}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
