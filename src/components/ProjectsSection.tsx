import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

const placeholderProjects = [
  {
    title: "Automated Reporting Pipeline",
    subtitle: "SQL + Python + Power BI",
    description: "Replaced 40+ hours/month of manual Excel work with an automated data pipeline that pulls from multiple sources, validates data integrity, and publishes interactive dashboards.",
    results: ["80% Time Saved", "Zero Manual Errors", "Real-time Updates"],
    github: "#",
    demo: "#"
  },
  {
    title: "Self-Service Analytics Portal",
    subtitle: "Quickbase + SQL Server",
    description: "Built a low-code application that enabled 70+ business users to query and export data without IT intervention, reducing ticket volume by 60%.",
    results: ["60% Ticket Reduction", "70+ Users", "Self-Serve Data"],
    github: "#",
    demo: "#"
  },
  {
    title: "Compliance Tracking System",
    subtitle: "Azure DevOps + Jira + Confluence",
    description: "Designed and implemented a full requirements traceability system that achieved 100% audit compliance for a regulated industry client.",
    results: ["100% Compliance", "Audit-Ready", "Full Traceability"],
    github: "#",
    demo: "#"
  }
];

export const ProjectsSection = () => {
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
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            End-to-end initiatives I've delivered — from requirements to production
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-lg p-6 relative overflow-hidden group"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Animated corner brackets */}
              <motion.div 
                className="absolute top-2 left-2 text-primary/30 text-lg"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                &lt;
              </motion.div>
              <motion.div 
                className="absolute bottom-2 right-2 text-primary/30 text-lg"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                /&gt;
              </motion.div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-foreground mb-1">{project.title}</h3>
                <p className="text-sm text-primary mb-3 terminal-font">{project.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Result Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.results.map((result, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-full px-3 py-1"
                    >
                      {result}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex gap-3">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-primary/30 text-foreground hover:bg-primary/10 gap-1"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={14} />
                      Code
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary/20 text-primary hover:bg-primary/30 gap-1"
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} />
                      View Details
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
