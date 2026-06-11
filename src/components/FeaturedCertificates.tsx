import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { CertificateCard } from "./CertificateCard";
import { getFeaturedCertificates } from "@/data/certificates";
import { Button } from "@/components/ui/button";

export const FeaturedCertificates = () => {
  const featuredCerts = getFeaturedCertificates().slice(0, 4);

  if (featuredCerts.length === 0) return null;

  return (
    <section id="certificates" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="accent-line mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
            Featured Credentials
          </h2>
          <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
            Degree-level technical education from world-class institutions: a coherent learning path aligned with Data Science, Systems Analysis, and IT roles.
          </p>
        </motion.div>

        {/* Certificate grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {featuredCerts.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Featured badge */}
              <div className="absolute -top-2 -right-2 z-10">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-mono text-yellow-500 uppercase">Core</span>
                </div>
              </div>
              <CertificateCard
                logo={cert.providerLogo}
                title={cert.title}
                provider={cert.provider}
                skills={cert.skills}
                pdfUrl={cert.pdfUrl}
              />
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/certificates">
            <Button
              size="lg"
              className="group bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary hover:border-primary/60"
            >
              <span>View All Certificates</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
        </div>
      </div>
    </section>
  );
};
