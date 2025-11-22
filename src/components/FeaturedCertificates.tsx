import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CertificateCard } from "./CertificateCard";
import { certificates } from "@/data/certificates";
import { Button } from "@/components/ui/button";

export const FeaturedCertificates = () => {
  const featuredCerts = certificates.filter((cert) => cert.featured).slice(0, 4);

  if (featuredCerts.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
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
              Certifications
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-gradient">Certificates</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous learning through industry-recognized certifications from leading institutions
          </p>
        </motion.div>

        {/* Certificate grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {featuredCerts.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
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
