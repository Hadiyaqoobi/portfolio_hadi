import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, MapPin, Plane, Award } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

const categoryAccents: Record<string, { border: string; borderLeft: string; bg: string; text: string; dot: string }> = {
  enterprise: {
    border: "border-emerald-500/30",
    borderLeft: "border-l-emerald-400",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  rnd: {
    border: "border-violet-500/30",
    borderLeft: "border-l-violet-400",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    dot: "bg-violet-400",
  },
  consulting: {
    border: "border-amber-500/30",
    borderLeft: "border-l-amber-400",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
  education: {
    border: "border-sky-500/30",
    borderLeft: "border-l-sky-400",
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    dot: "bg-sky-400",
  },
  default: {
    border: "border-slate-700",
    borderLeft: "border-l-slate-600",
    bg: "bg-slate-800/50",
    text: "text-slate-400",
    dot: "bg-slate-400",
  },
};

const getAccent = (item: any) => {
  if (item.type === "education") return categoryAccents.education;
  return categoryAccents[item.category] || categoryAccents.default;
};

export const Timeline = () => {
  const { timeline } = portfolioData;

  return (
    <section id="timeline" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-14"
        >
          <div className="accent-line mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
            Career Journey
          </h2>
          <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
            From Afghanistan to Turkey to the United States. Every role shaped how I
            gather requirements, build systems, and deliver outcomes.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-slate-600 via-slate-700 to-transparent" />

          <div className="space-y-2">
            {timeline.map((item: any, index: number) => (
              <TimelineEntry key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineEntry = ({ item, index }: { item: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const accent = getAccent(item);
  const isCurrent = item.type === "current";
  const isEducation = item.type === "education";
  const Icon = isEducation ? GraduationCap : Briefcase;

  return (
    <>
      {/* Transition / career break marker */}
      {item.transition && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="relative flex gap-4 py-2"
        >
          <div className="flex-shrink-0 w-[38px] flex justify-center pt-1 relative z-10">
            <div className="w-6 h-6 rounded-full bg-transparent border border-dashed border-slate-600 flex items-center justify-center">
              <Plane className="w-3 h-3 text-slate-500 rotate-[-45deg]" />
            </div>
          </div>
          <div className="flex-1 flex items-center">
            <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium border-b border-dashed border-slate-700 pb-2 flex-1">
              <span>{item.transition}</span>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="relative flex gap-4"
      >
        {/* Timeline dot */}
        <div className="flex-shrink-0 w-[38px] flex justify-center pt-5 relative z-10">
          <div className={`w-2.5 h-2.5 rounded-full ${accent.dot} ${isCurrent ? "ring-4 ring-blue-500/20" : ""}`} />
        </div>

        {/* Card */}
        <div className={`flex-1 border-l-2 ${accent.borderLeft} pl-5 py-4 mb-1 transition-all duration-300`}>
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-xs font-mono font-medium ${accent.text}`}>{item.year}</span>
            {isCurrent && (
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${accent.bg} ${accent.text} border ${accent.border}`}>
                Current
              </span>
            )}
            {isEducation && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                Education
              </span>
            )}
          </div>

          <div className="flex items-start gap-2.5 mb-1">
            <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${accent.text}`} />
            <div>
              <h3 className="text-base font-semibold text-slate-100 leading-tight">{item.title}</h3>
              {item.company && (
                <p className="text-sm text-slate-500 mt-0.5">
                  {item.company}
                  {item.location && <span className="text-slate-500"> · {item.location}</span>}
                </p>
              )}
            </div>
          </div>

          {/* Skills tags */}
          {item.skills && item.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
              {item.skills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-full border border-slate-700 text-slate-400 bg-slate-800/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Highlights */}
          {item.highlights && item.highlights.length > 0 && (
            <div className="space-y-2 mt-3">
              {item.highlights.map((highlight: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.15 + idx * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${accent.dot}`} />
                  <span className="text-xs text-slate-500 leading-relaxed">{highlight}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};
