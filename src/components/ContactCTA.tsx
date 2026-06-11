import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

export const ContactCTA = () => {
  const { personal } = portfolioData;

  return (
    <section className="py-section-xl relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-5 tracking-tight">
            Let's Talk
          </h2>
          <p className="text-slate-400 text-base mb-10 leading-relaxed">
            I've led cloud migrations for 135K+ accounts, built AI products from scratch,
            and shipped SQL validation engines across multi-state regulatory deadlines.
            I'm looking for a team that needs someone who can own the full lifecycle,
            from requirements gathering to production deployment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`mailto:${personal.email}`}
              className="btn-primary inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-medium"
            >
              <Mail size={18} />
              Send Email
              <ArrowRight size={16} />
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-slate-100 transition-colors"
            >
              or connect on LinkedIn →
            </a>
          </div>

          {/* Work authorization - subtle, at the bottom */}
          <p className="text-xs text-slate-600 mt-16">
            🇺🇸 Green Card Holder · No Sponsorship Required
          </p>
        </motion.div>
      </div>
    </section>
  );
};
