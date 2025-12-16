import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { CertificateCard } from "./CertificateCard";
import { Certificate, CertificateCategory, categoryIcons } from "@/data/certificates";

interface CertificateCategorySectionProps {
  category: CertificateCategory;
  certificates: Certificate[];
  index: number;
}

export const CertificateCategorySection = ({
  category,
  certificates,
  index,
}: CertificateCategorySectionProps) => {
  const icon = categoryIcons[category];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-12"
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 text-xl">
          {icon}
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            {category}
          </h3>
          <p className="text-sm text-muted-foreground">
            {certificates.length} certificate{certificates.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Certificates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {certificates.map((cert, certIndex) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: certIndex * 0.05 }}
            className="relative"
          >
            {/* Featured badge */}
            {cert.featured && (
              <div className="absolute -top-2 -right-2 z-10">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-mono text-yellow-500 uppercase">Core</span>
                </div>
              </div>
            )}
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
    </motion.section>
  );
};
