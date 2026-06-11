import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SYSTEMS } from "@/data/systems";

export const SystemsTeaser = () => (
  <section className="py-section relative">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="glass-card-featured p-8 md:p-10 relative overflow-hidden"
        >
          <div
            className="pointer-events-none absolute -right-12 -top-12 w-64 h-64 rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }}
          />
          <div className="flex flex-col md:flex-row md:items-center gap-7 justify-between relative">
            <div>
              <div className="accent-line mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2.5">
                See how the systems actually work
              </h2>
              <p className="text-slate-400 max-w-xl text-[15px] leading-relaxed">
                MakerMind's three-model pipeline, AlphaSeekers' Dari-aware RAG, the five-model
                ROE engine, and the AHRC design, as clickable flows. Click any stage to open the
                real code behind it.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {SYSTEMS.map((s) => (
                  <span
                    key={s.id}
                    className="text-[11px] text-slate-400 border border-slate-700 rounded-full px-3 py-1"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/systems"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm shrink-0 self-start md:self-auto"
            >
              Explore the systems
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
