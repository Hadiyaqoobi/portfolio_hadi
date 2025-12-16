import { motion } from "framer-motion";
import { Award, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { CertificateCard } from "./CertificateCard";
import { getFeaturedCertificates } from "@/data/certificates";
import { Button } from "@/components/ui/button";

export const FeaturedCertificates = () => {
  const featuredCerts = getFeaturedCertificates().slice(0, 4);

  if (featuredCerts.length === 0) return null;

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-wider">
              Core Certifications
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-gradient">Credentials</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Degree-level technical education from world-class institutions — not random online courses, 
            but a coherent learning path aligned with Data Science, Systems Analysis, and IT roles.
          </p>
        </motion.div>

        {/* Featured badge explanation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-yellow-500/10 border border-yellow-500/30">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs text-yellow-500/90">
              These certifications define my core technical foundation
            </span>
          </div>
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
    </section>
  );
};
