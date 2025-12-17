import { motion } from "framer-motion";
import { FileText, Search, BarChart3, Users } from "lucide-react";

const methods = [
  {
    icon: FileText,
    title: "Requirements Engineering",
    subtitle: "Translating business needs into specs",
    color: "primary",
    bullets: [
      "Stakeholder interviews & needs discovery",
      "BRD/FRD documentation & sign-off",
      "User stories with acceptance criteria",
      "Requirements traceability & UAT"
    ]
  },
  {
    icon: Search,
    title: "Systems Analysis",
    subtitle: "Understanding how things actually work",
    color: "accent",
    bullets: [
      "Current state (As-Is) documentation",
      "Data flow & dependency mapping",
      "Gap analysis & pain point identification",
      "Future state (To-Be) design"
    ]
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    subtitle: "Turning data into decisions",
    color: "neon-green",
    bullets: [
      "SQL queries & stored procedures",
      "Python scripting & data analysis",
      "Dashboard design (Power BI, Tableau)",
      "Data validation & reporting automation"
    ]
  },
  {
    icon: Users,
    title: "Cross-Functional Delivery",
    subtitle: "Getting things done with people",
    color: "neon-magenta",
    bullets: [
      "Dev, QA, Ops & business alignment",
      "Sprint ceremonies & Jira management",
      "UAT coordination & issue triage",
      "Go-live support & change management"
    ]
  }
];

const tools = [
  { name: "SQL Server", description: "Data & automation" },
  { name: "Power BI", description: "Dashboards" },
  { name: "Tableau", description: "Visualization" },
  { name: "Python", description: "Analysis & ETL" },
  { name: "Excel", description: "Analysis & VBA" },
  { name: "Jira", description: "Agile delivery" },
  { name: "Azure DevOps", description: "CI/CD & repos" },
  { name: "Confluence", description: "Documentation" },
  { name: "Quickbase", description: "Low-code apps" },
  { name: "Citrix", description: "Access management" }
];

const getColorClass = (color: string) => {
  const colorMap: Record<string, { border: string; text: string; bg: string }> = {
    primary: { border: "border-primary/40", text: "text-primary", bg: "bg-primary/10" },
    accent: { border: "border-accent/40", text: "text-accent", bg: "bg-accent/10" },
    "neon-green": { border: "border-neon-green/40", text: "text-neon-green", bg: "bg-neon-green/10" },
    "neon-magenta": { border: "border-neon-magenta/40", text: "text-neon-magenta", bg: "bg-neon-magenta/10" }
  };
  return colorMap[color] || colorMap.primary;
};

export const HowIWork = () => {
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
            <span className="gradient-text">How I Work</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            My approach to bridging business needs with technical solutions
          </p>
        </motion.div>

        {/* Method Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {methods.map((method, index) => {
            const Icon = method.icon;
            const colors = getColorClass(method.color);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className={`border ${colors.border} bg-card/50 backdrop-blur-sm rounded-lg p-6 relative overflow-hidden group`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-current/5 to-transparent" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{method.title}</h3>
                      <p className={`text-sm ${colors.text}`}>{method.subtitle}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {method.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className={`${colors.text} mt-0.5`}>▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tools & Frameworks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl font-bold text-foreground mb-6">Tools & Frameworks</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-card/50 border border-primary/20 rounded-full px-4 py-2 backdrop-blur-sm group hover:border-primary/50 transition-colors"
              >
                <span className="text-sm font-medium text-foreground">{tool.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{tool.description}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
