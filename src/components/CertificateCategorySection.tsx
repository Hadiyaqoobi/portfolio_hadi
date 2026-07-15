import * as React from "react";
import { CertificateCard } from "./CertificateCard";
import { Certificate, CertificateCategory } from "@/data/certificates";
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
}: CertificateCategorySectionProps) => {
  const [selectedCertificate, setSelectedCertificate] = React.useState<Certificate | null>(null);

  return (
    <section className="mb-12">
      {/* Category header */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-3">
        <h3>{category}</h3>
        <p className="font-sans text-[0.8rem] text-muted">
          {certificates.length} certificate{certificates.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Ruled list of certificates */}
      <ul className="list-none border-t border-line">
        {certificates.map((cert) => (
          <li key={cert.id}>
            <CertificateCard
              logo={cert.providerLogo}
              title={cert.title}
              provider={cert.provider}
              date={cert.date}
              skills={cert.skills}
              pdfUrl={cert.pdfUrl}
              onClick={() => setSelectedCertificate(cert)}
            />
          </li>
        ))}
      </ul>

      {/* Certificate modal: plain raised surface */}
      <Dialog
        open={!!selectedCertificate}
        onOpenChange={(open) => {
          if (!open) setSelectedCertificate(null);
        }}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-paper-raised border-line rounded-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-semibold tracking-normal text-ink">
              {selectedCertificate?.title}
            </DialogTitle>
            <p className="font-sans text-sm text-muted">{selectedCertificate?.provider}</p>
          </DialogHeader>

          <div className="mt-2 space-y-4">
            {selectedCertificate && selectedCertificate.skills.length > 0 && (
              <p className="font-sans text-[0.8rem] text-muted">
                {selectedCertificate.skills.join(" · ")}
              </p>
            )}

            <div className="border border-line rounded-md overflow-hidden">
              <div className="aspect-[8.5/11] w-full bg-paper">
                <iframe
                  src={selectedCertificate?.pdfUrl}
                  className="w-full h-full"
                  title={selectedCertificate?.title}
                />
              </div>
              <div className="px-4 py-3 border-t border-line">
                <a
                  href={selectedCertificate?.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link font-sans text-sm"
                >
                  Open in new tab <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
