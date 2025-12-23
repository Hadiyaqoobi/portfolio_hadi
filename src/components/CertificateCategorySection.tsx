import * as React from "react";
import { motion } from "framer-motion";
import { Star, FileText, ExternalLink } from "lucide-react";
import { CertificateCard } from "./CertificateCard";
import { Certificate, CertificateCategory, categoryIcons } from "@/data/certificates";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [selectedCertificate, setSelectedCertificate] = React.useState<Certificate | null>(null);

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
              onClick={() => setSelectedCertificate(cert)}
            />
          </motion.div>
        ))}
      </div>

      {/* Certificate Modal */}
      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              {selectedCertificate?.title}
            </DialogTitle>
            <p className="text-muted-foreground">{selectedCertificate?.provider}</p>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {/* Skills */}
            {selectedCertificate?.skills && selectedCertificate.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedCertificate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-primary/10 text-primary border border-primary/30 rounded px-2 py-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* PDF Viewer */}
            <div className="border border-border/50 rounded-lg overflow-hidden bg-card/30">
              <div className="p-4 border-b border-border/30 bg-card/50">
                <h3 className="font-semibold text-foreground">Certificate Document</h3>
              </div>
              <div className="aspect-[8.5/11] w-full">
                <iframe
                  src={selectedCertificate?.pdfUrl}
                  className="w-full h-full"
                  title={selectedCertificate?.title}
                />
              </div>
              <div className="p-3 border-t border-border/30 bg-card/50">
                <a
                  href={selectedCertificate?.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1"
                >
                  Open in New Tab
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.section>
  );
};