import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

const getIcon = (type: string) => {
  switch (type) {
    case "current":
      return Briefcase;
    case "education":
      return GraduationCap;
    case "milestone":
      return MapPin;
    default:
      return Clock;
  }
};

export const Timeline = () => {
  const { timeline } = portfolioData;

  return (
    <section id="timeline" className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="gradient-text">Career Timeline</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            The evolution of my skills and experience
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <motion.div 
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-primary/20"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-6 relative z-10">
            {timeline.map((item, index) => {
              const Icon = getIcon(item.type);
              const isEven = index % 2 === 0;

              return (
                <TimelineItem
                  key={index}
                  item={item}
                  Icon={Icon}
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
  isEven,
  index,
}: {
  item: any;
  Icon: any;
  isEven: boolean;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isCurrent = item.type === "current";
  const isEducation = item.type === "education";
  const isMilestone = item.type === "milestone";

  // Milestone entry - smaller, subtle
  if (isMilestone) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className={`relative flex flex-col lg:flex-row gap-4 lg:gap-8 ${isEven ? "lg:flex-row-reverse" : ""}`}
      >
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
            <MapPin className="text-accent" size={16} />
            <span className="text-sm font-medium text-accent">{item.year}</span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-foreground/80">{item.title}</span>
          </div>
        </div>

        {/* Center dot */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="w-3 h-3 rounded-full border-2 border-accent bg-accent/50"
          />
        </div>

        <div className="flex-1 hidden lg:block" />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col lg:flex-row gap-4 lg:gap-8 ${isEven ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Content Card - always left aligned */}
      <div className="flex-1">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className={`border rounded-lg p-5 relative overflow-hidden ${
            isCurrent 
              ? "border-primary/50 bg-primary/5" 
              : isEducation
                ? "border-accent/40 bg-accent/5"
                : "border-border/50 bg-card/30"
          }`}
        >
          <div className="relative z-10">
            {/* Year badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <Icon className={
                isCurrent ? "text-primary" : isEducation ? "text-accent" : "text-muted-foreground"
              } size={18} />
              <span className={`text-sm font-mono ${
                isCurrent ? "text-primary font-semibold" : isEducation ? "text-accent font-semibold" : "text-muted-foreground"
              }`}>
                {item.year}
              </span>
              {isCurrent && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                  Current
                </span>
              )}
              {isEducation && (
                <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium">
                  Education
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold mb-1 text-foreground">
              {item.title}
            </h3>
            
            {item.company && (
              <p className={`text-sm mb-3 ${isEducation ? "text-accent/80" : "text-primary/80"}`}>
                {item.company} {item.location && `· ${item.location}`}
              </p>
            )}

            {/* Skills as pills */}
            {item.skills && item.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.skills.slice(0, 6).map((skill: string, idx: number) => (
                  <span 
                    key={idx}
                    className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground border border-border/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Highlights */}
            {item.highlights && item.highlights.length > 0 && (
              <ul className="space-y-1.5">
                {item.highlights.slice(0, 5).map((highlight: string, idx: number) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <span className={isCurrent ? "text-primary" : isEducation ? "text-accent" : "text-primary"} style={{ marginTop: '2px', flexShrink: 0 }}>▸</span>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>

      {/* Center dot */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.1 }}
          className={`w-4 h-4 rounded-full border-2 ${
            isCurrent 
              ? "border-primary bg-primary" 
              : isEducation
                ? "border-accent bg-accent"
                : "border-muted-foreground/50 bg-background"
          }`}
        />
      </div>

      {/* Spacer for the other side */}
      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
};
