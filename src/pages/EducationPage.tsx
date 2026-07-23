import * as React from "react";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Education } from "@/components/Education";
import {
  certificates,
  categoryOrder,
  Certificate,
  getCertificatesByCategory,
} from "@/data/certificates";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const EducationPage = () => {
  const [selectedCert, setSelectedCert] = React.useState<Certificate | null>(null);

  const providerCount = Array.from(new Set(certificates.map((c) => c.provider))).length;
  const inProgressCount = certificates.filter((c) => c.inProgress).length;

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Degrees */}
        <Education />

        {/* Certificates */}
        <section className="pb-14 sm:pb-16">
          <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
            <hr className="border-line mb-10" />

            <header className="mb-10">
              <p className="kicker mb-2">Certificates</p>
              <h2>Professional certificates</h2>
              <p className="mt-4 prose-measure text-ink-soft">
                I chose each certificate to close a specific skill gap. Harvard CS50 for
                foundations. Stanford Algorithms for algorithmic thinking. Google BI for
                dashboard delivery. Cornell's AI &amp; Machine Learning 360 for the ML
                and NLP foundations.
              </p>
              <p className="mt-3 font-sans text-sm">
                <a
                  href="https://www.credly.com/users/mohammad-hadi-yaqoobi/badges"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Verify on Credly <span aria-hidden="true">&#8599;</span>
                </a>
              </p>
            </header>

            <div className="space-y-10">
              {categoryOrder.map((category) => {
                const categoryCerts = getCertificatesByCategory(category);
                if (categoryCerts.length === 0) return null;

                return (
                  <div key={category}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-3">
                      <h3>{category}</h3>
                      <p className="font-sans text-[0.8rem] text-muted">
                        {categoryCerts.length} certificate
                        {categoryCerts.length !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <ul className="list-none border-t border-line divide-y divide-line">
                      {categoryCerts.map((cert) => (
                        <li
                          key={cert.id}
                          className="py-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                        >
                          <div className="min-w-0">
                            <p className="font-sans text-sm text-ink leading-snug">
                              {cert.title}
                            </p>
                            <p className="mt-0.5 font-sans text-[0.8rem] text-muted">
                              {cert.provider}
                              {cert.date && (
                                <>
                                  {" "}
                                  <span aria-hidden="true">&middot;</span>{" "}
                                  <span className="font-mono tabular-nums">{cert.date}</span>
                                </>
                              )}
                            </p>
                          </div>
                          {cert.pdfUrl !== "#" && (
                            <button
                              type="button"
                              onClick={() => setSelectedCert(cert)}
                              className="link font-sans text-[0.8rem] shrink-0"
                            >
                              View PDF
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Static counts, no animation */}
            <p className="mt-10 font-sans text-sm text-ink-soft">
              <span className="font-mono tabular-nums text-ink">{certificates.length}</span>{" "}
              certificates <span aria-hidden="true">&middot;</span>{" "}
              <span className="font-mono tabular-nums text-ink">{providerCount}</span>{" "}
              institutions <span aria-hidden="true">&middot;</span>{" "}
              <span className="font-mono tabular-nums text-ink">20+</span> Credly badges{" "}
              <span aria-hidden="true">&middot;</span>{" "}
              <span className="font-mono tabular-nums text-ink">{inProgressCount}</span> in
              progress
            </p>
            <p className="mt-2 font-sans text-[0.8rem] text-muted">
              Credentials verifiable on Credly.
            </p>
          </div>
        </section>
      </main>

      {/* Certificate PDF modal: plain raised surface */}
      <Dialog
        open={!!selectedCert}
        onOpenChange={(open) => {
          if (!open) setSelectedCert(null);
        }}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-paper-raised border-line rounded-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-semibold tracking-normal text-ink">
              {selectedCert?.title}
            </DialogTitle>
            <p className="font-sans text-sm text-muted">{selectedCert?.provider}</p>
          </DialogHeader>

          <div className="mt-2 space-y-4">
            {selectedCert && selectedCert.skills.length > 0 && (
              <p className="font-sans text-[0.8rem] text-muted">
                {selectedCert.skills.join(" · ")}
              </p>
            )}

            <div className="border border-line rounded-md overflow-hidden">
              <div className="aspect-[8.5/11] w-full bg-paper">
                <iframe
                  src={selectedCert?.pdfUrl}
                  className="w-full h-full"
                  title={selectedCert?.title}
                />
              </div>
              <div className="px-4 py-3 border-t border-line">
                <a
                  href={selectedCert?.pdfUrl}
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

      <Footer />
    </div>
  );
};

export default EducationPage;
