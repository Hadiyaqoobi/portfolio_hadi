import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { portfolioData } from "@/data/portfolio-data";
import { Link } from "react-router-dom";

export const Projects = () => {
  const featuredProjects = portfolioData.projects.filter(p => p.featured).slice(0, 6);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Key implementations and technical achievements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-lg p-6 h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:border-primary/60">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-neon-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Animated border glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-glow" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Project Title */}
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-accent/10 border border-accent/30 rounded text-xs text-accent terminal-font"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 border border-primary/30 rounded text-xs text-primary/80 terminal-font"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-primary/20">
                    {project.github && project.github !== "#" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github size={16} className="mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      className={`${project.github && project.github !== "#" ? 'flex-1' : 'w-full'} bg-primary text-primary-foreground hover:bg-primary/90`}
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        View Details
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground group"
            asChild
          >
            <Link to="/projects">
              View All Projects
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
