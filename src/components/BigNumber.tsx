import { motion, useInView, animate, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* Count-up that triggers on scroll, instant under prefers-reduced-motion */
const CountUp = ({
  value,
  duration = 2.2,
  className = "",
}: {
  value: number;
  duration?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value.toLocaleString());
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

const subStats = [
  { value: "6+", label: "Years enterprise systems" },
  { value: "5", label: "Production ML models" },
  { value: "2,000+", label: "Test cases authored" },
  { value: "90.3%", label: "FDR found in LLM study" },
];

export const BigNumber = () => {
  return (
    <section className="py-section-lg relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="gradient-text font-bold tracking-[-0.04em] leading-[0.9] tabular-nums text-[clamp(4.5rem,16vw,13rem)]">
              <CountUp value={135000} />
            </div>
            <p className="mt-5 mx-auto max-w-2xl text-base md:text-xl text-slate-400 leading-relaxed">
              <span className="text-slate-200 font-medium">
                accounts migrated to Azure AD B2C.
              </span>{" "}
              Six teams. Four phases.{" "}
              <span className="text-slate-200 font-medium">
                Zero critical incidents.
              </span>
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {subStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card px-4 py-6"
              >
                <div className="gradient-text text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  {s.value}
                </div>
                <div className="mt-2 text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider leading-snug">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
