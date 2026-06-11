import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SKILLS, PROJECTS, certTotal } from "@/data/skillmap";

export const SkillMapTeaser = () => (
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
          {/* subtle node motif, decorative */}
          <div
            className="pointer-events-none absolute -right-10 -top-10 w-64 h-64 rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }}
          />
          <div className="flex flex-col md:flex-row md:items-center gap-7 justify-between relative">
            <div>
              <div className="accent-line mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2.5">
                Explore the Skill Map
              </h2>
              <p className="text-slate-400 max-w-xl text-[15px] leading-relaxed">
                An interactive graph that wires every skill to the projects and
                certifications behind it. Click PyTorch, see the models. Click SQL, see the
                migration and the bug hunt.
              </p>
              <div className="flex flex-wrap gap-5 mt-5 text-sm text-slate-400">
                <span><b className="text-blue-400">{SKILLS.length}</b> skills</span>
                <span><b className="text-blue-400">{PROJECTS.length}</b> projects</span>
                <span><b className="text-blue-400">{certTotal}</b> certifications</span>
              </div>
            </div>
            <Link
              to="/skills"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm shrink-0 self-start md:self-auto"
            >
              Open the Skill Map
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
