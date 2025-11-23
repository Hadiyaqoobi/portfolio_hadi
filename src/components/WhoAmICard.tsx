import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio-data";

export const WhoAmICard = () => {
  const { personal } = portfolioData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="w-full max-w-5xl mx-auto mt-8"
    >
      <div className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-lg p-4 md:p-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: whoami + details */}
          <div className="space-y-4">
            <div className="terminal-font">
              <div className="text-sm text-muted-foreground mb-2">$ whoami</div>
              <div className="text-xl text-primary font-bold">{personal.name}</div>
            </div>

            <div className="space-y-3 text-sm">
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
            </div>
          </div>

          {/* Right Column: Competencies + Status */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-3">Core Competencies:</div>
              <div className="flex flex-wrap gap-2">
                {personal.focus.map((focus, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-accent/10 border border-accent/30 rounded text-xs text-accent"
                  >
                    {focus}
                  </span>
                ))}
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
      </div>
    </motion.div>
  );
};
