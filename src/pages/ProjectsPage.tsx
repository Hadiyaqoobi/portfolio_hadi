import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio-data";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Background } from "@/components/Background";

const ProjectsPage = () => {
  const { projects } = portfolioData;

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Background />
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary mb-6"
              asChild
            >
              <Link to="/">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Link>
            </Button>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All Projects
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A comprehensive collection of my technical projects, from enterprise systems to personal applications.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="group"
              >
                <div className="glass-card p-6 h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-0 right-0 px-2 py-1 bg-primary/10 border border-primary/20 rounded-bl text-xs text-primary font-medium">
                        Featured
                      </div>
                    )}

                    {/* Project Title */}
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors pr-16 font-sans">
                      {project.title}
                    </h3>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-muted/50 border border-border/50 rounded text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-xs text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-4 border-t border-border/50">
                      {project.github && project.github !== "#" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-border text-foreground hover:bg-muted"
                          asChild
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github size={16} className="mr-2" />
                            Code
                          </a>
                        </Button>
                      )}

                      {project.demo && project.demo.startsWith("/") && !project.demo.endsWith(".pdf") ? (
                        <Button
                          size="sm"
                          className={`${project.github && project.github !== "#" ? 'flex-1' : 'w-full'} bg-primary text-primary-foreground hover:bg-primary/90`}
                          asChild
                        >
                          <Link to={project.demo}>
                            <ExternalLink size={16} className="mr-2" />
                            View Details
                          </Link>
                        </Button>
                      ) : project.demo ? (
                        <Button
                          size="sm"
                          className={`${project.github && project.github !== "#" ? 'flex-1' : 'w-full'} bg-primary text-primary-foreground hover:bg-primary/90`}
                          asChild
                        >
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} className="mr-2" />
                            {project.demo.endsWith(".pdf") ? "View Report" : "View Details"}
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
