import { motion } from "framer-motion";
import { MapPin, Download, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { portfolioData } from "@/data/portfolio-data";

export const Hero = () => {
  const { personal } = portfolioData;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="gradient-text">{personal.name}</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            className="text-xl md:text-2xl text-primary font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {personal.title}
          </motion.p>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {personal.subtitle}
          </motion.p>

          {/* HUD Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <div className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-lg p-6 relative overflow-hidden">
              {/* Scan line effect */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
              
              <div className="grid md:grid-cols-2 gap-6 terminal-font text-sm">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="text-muted-foreground">LOCATION</div>
                    <div className="text-foreground mt-1">{personal.location}</div>
                  </div>
                </div>

                {/* Focus Areas */}
                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1 flex-shrink-0">▸</div>
                  <div>
                    <div className="text-muted-foreground">FOCUS AREAS</div>
                    <div className="text-foreground mt-1 space-y-1">
                      {personal.focus.map((area, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-primary">·</span> {area}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow-cyan min-w-[200px]"
              onClick={() => document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Timeline
              <ChevronDown className="ml-2" size={20} />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground min-w-[200px]"
            >
              <Download className="mr-2" size={20} />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-primary" size={32} />
      </motion.div>
    </section>
  );
};
