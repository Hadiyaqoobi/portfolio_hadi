import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Briefcase, Rocket, Terminal, Code, Database, Cpu, Server, Binary } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

const getIcon = (type: string) => {
  switch (type) {
    case "current":
      return Briefcase;
    case "future":
      return Rocket;
    default:
      return Clock;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case "current":
      return "primary";
    case "future":
      return "accent";
    default:
      return "muted-foreground";
  }
};

export const Timeline = () => {
  const { timeline } = portfolioData;

  return (
    <section id="timeline" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Career Timeline</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            The evolution of my skills and experience
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline line */}
          <motion.div 
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-neon-magenta"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />

          {/* Floating computer symbols */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[Terminal, Code, Database, Cpu, Server, Binary].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute text-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  y: [20, -20, 20],
                  x: [0, Math.random() * 20 - 10, 0]
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`
                }}
              >
                <Icon size={32} />
              </motion.div>
            ))}
          </div>

          <div className="space-y-12 relative z-10">
            {timeline.map((item, index) => {
              const Icon = getIcon(item.type);
              const color = getColor(item.type);
              const isEven = index % 2 === 0;

              return (
                <TimelineItem
                  key={index}
                  item={item}
                  Icon={Icon}
                  color={color}
                  isEven={isEven}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({
  item,
  Icon,
  color,
  isEven,
  index,
}: {
  item: any;
  Icon: any;
  color: string;
  isEven: boolean;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex flex-col lg:flex-row gap-8 ${isEven ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isEven ? "lg:text-right" : ""}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-lg p-6 relative overflow-hidden group"
        >
          {/* Animated binary background */}
          <div className="absolute inset-0 opacity-5 terminal-font text-xs overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ x: [0, -100] }}
                transition={{ duration: 15, repeat: Infinity, delay: i * 2 }}
                className="whitespace-nowrap"
              >
                01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010
              </motion.div>
            ))}
          </div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Animated corner brackets */}
          <motion.div 
            className="absolute top-2 left-2 text-primary/50 text-2xl"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            &lt;
          </motion.div>
          <motion.div 
            className="absolute bottom-2 right-2 text-primary/50 text-2xl"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            /&gt;
          </motion.div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Icon className={`text-${color}`} size={24} />
              </motion.div>
              <span className="text-sm text-muted-foreground terminal-font">
                {item.year}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-2 text-foreground">
              {item.title}
            </h3>
            
            {item.company && (
              <p className="text-lg text-primary mb-2">
                {item.company} {item.location && `· ${item.location}`}
              </p>
            )}

            <p className="text-muted-foreground mb-4">
              {item.description}
            </p>

            <ul className="space-y-2">
              {item.highlights.map((highlight: string, idx: number) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="text-primary mt-1 flex-shrink-0">▸</span>
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Center Icon */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 rounded-full border-2 border-primary bg-background flex items-center justify-center relative"
        >
          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Icon className={`text-${color}`} size={24} />
          </motion.div>
        </motion.div>
      </div>

      {/* Spacer for the other side */}
      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
};
