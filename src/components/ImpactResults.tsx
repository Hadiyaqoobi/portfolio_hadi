import { motion } from "framer-motion";
import { 
  Clock, 
  DollarSign, 
  Users, 
  BarChart3, 
  Rocket, 
  Settings, 
  ShieldCheck, 
  FileCheck 
} from "lucide-react";

const metrics = [
  {
    icon: Clock,
    value: "1,000+",
    label: "Hours Saved",
    description: "Manual reporting & data prep",
    outcome: "Freed teams for strategic work",
    color: "primary"
  },
  {
    icon: DollarSign,
    value: "$100K+",
    label: "Value Created",
    description: "Productivity & efficiency gains",
    outcome: "Based on time × analyst cost",
    color: "neon-green"
  },
  {
    icon: Users,
    value: "70+",
    label: "Users Empowered",
    description: "Business, ops & technical teams",
    outcome: "Self-serve data & faster decisions",
    color: "accent"
  },
  {
    icon: BarChart3,
    value: "30+",
    label: "Automated Outputs",
    description: "Reports, dashboards & pipelines",
    outcome: "Real-time insights, zero manual pulls",
    color: "neon-yellow"
  },
  {
    icon: Rocket,
    value: "12+",
    label: "Projects Shipped",
    description: "Requirements → Production",
    outcome: "Full ownership, on-time delivery",
    color: "neon-orange"
  },
  {
    icon: Settings,
    value: "10+",
    label: "Processes Optimized",
    description: "End-to-end workflow redesigns",
    outcome: "Reduced friction & bottlenecks",
    color: "primary"
  },
  {
    icon: ShieldCheck,
    value: "95%",
    label: "Error Reduction",
    description: "Data validation & automation",
    outcome: "Trusted data, confident decisions",
    color: "neon-magenta"
  },
  {
    icon: FileCheck,
    value: "100%",
    label: "Spec Compliance",
    description: "Requirements & audit alignment",
    outcome: "Zero rework, audit-ready systems",
    color: "neon-green"
  }
];

const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: "text-primary border-primary/30 bg-primary/5",
    accent: "text-accent border-accent/30 bg-accent/5",
    "neon-green": "text-neon-green border-neon-green/30 bg-neon-green/5",
    "neon-magenta": "text-neon-magenta border-neon-magenta/30 bg-neon-magenta/5",
    "neon-yellow": "text-neon-yellow border-neon-yellow/30 bg-neon-yellow/5",
    "neon-orange": "text-neon-orange border-neon-orange/30 bg-neon-orange/5"
  };
  return colorMap[color] || colorMap.primary;
};

export const ImpactResults = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Impact & Results</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Quantified outcomes from my work in systems analysis and automation
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const colorClasses = getColorClass(metric.color);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`border backdrop-blur-sm rounded-lg p-4 md:p-6 relative overflow-hidden group ${colorClasses}`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-current/5 to-transparent" />
                
                <div className="relative z-10">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 mb-3" />
                  <div className="terminal-font text-2xl md:text-3xl font-bold mb-1">
                    {metric.value}
                  </div>
                  <div className="font-semibold text-sm md:text-base text-foreground mb-1">
                    {metric.label}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground mb-3">
                    {metric.description}
                  </div>
                  <div className="text-xs text-neon-green flex items-center gap-1">
                    <span>→</span>
                    <span>{metric.outcome}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm italic text-muted-foreground bg-card/30 backdrop-blur-sm rounded-lg py-3 px-6 inline-block border border-primary/10">
            Cumulative impact across 3+ years in IT BSA, product analysis, and systems roles.
          </p>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl font-bold text-foreground">
            I turn ambiguous business problems into{" "}
            <span className="gradient-text">automated, scalable systems</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
