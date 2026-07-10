import { Link } from "react-router-dom";
import { CertificateCard } from "./CertificateCard";
import { getFeaturedCertificates } from "@/data/certificates";

export const FeaturedCertificates = () => {
  const featuredCerts = getFeaturedCertificates().slice(0, 4);

  if (featuredCerts.length === 0) return null;

  return (
    <section id="certificates" className="py-14 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
        <header className="mb-8">
          <p className="kicker mb-2">Credentials</p>
          <h2>Featured credentials</h2>
          <p className="mt-4 prose-measure text-ink-soft">
            Degree-level technical education from world-class institutions: a coherent
            learning path aligned with Data Science, Systems Analysis, and IT roles.
          </p>
        </header>

        <ul className="list-none border-t border-line">
          {featuredCerts.map((cert) => (
            <li key={cert.id}>
              <CertificateCard
                logo={cert.providerLogo}
                title={cert.title}
                provider={cert.provider}
                date={cert.date}
                skills={cert.skills}
                pdfUrl={cert.pdfUrl}
              />
            </li>
          ))}
        </ul>

        <p className="mt-6 font-sans text-sm">
          <Link to="/education" className="link">
            All certificates
          </Link>
        </p>
      </div>
    </section>
  );
};
