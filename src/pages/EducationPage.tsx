import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { Education } from "@/components/Education";
import { motion } from "framer-motion";
import { certificates, categoryOrder, Certificate, CertificateCategory, getCertificatesByCategory as getCertsByCat } from "@/data/certificates";
import { CertificateCategorySection } from "@/components/CertificateCategorySection";

const EducationPage = () => {
  const featuredCertificates = certificates.filter(cert => cert.featured);

  return (
    <div className="relative min-h-screen">
      <Background />
      <Navigation />
      
      <main className="relative z-10 pt-20">
        {/* Education Section */}
        <Education />
        
        {/* Certificates Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Professional Certificates</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                A coherent, degree-level technical education path aligned with IT Business & Systems Analysis, Data, and Product roles.
              </p>
            </motion.div>

            {/* Philosophy Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <div className="inline-block bg-card/50 border border-primary/20 rounded-lg px-6 py-4 backdrop-blur-sm">
                <p className="text-sm text-muted-foreground italic">
                  "This is not random online learning — this is a <span className="text-primary font-medium">strategic education path</span> aligned with IT Business & Systems Analysis, Data, and Product roles."
                </p>
              </div>
            </motion.div>

            {/* Featured Certificates */}
            {featuredCertificates.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="text-primary">★</span> Core Certifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {featuredCertificates.sort((a, b) => a.priority - b.priority).map((cert) => (
                    <motion.div
                      key={cert.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="border border-primary/40 bg-card/50 backdrop-blur-sm rounded-lg p-4 relative overflow-hidden group"
                    >
                      <div className="absolute top-2 right-2">
                        <span className="text-xs bg-primary/20 text-primary border border-primary/30 rounded-full px-2 py-0.5">
                          Core
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={cert.providerLogo}
                          alt={cert.provider}
                          className="w-10 h-10 object-contain rounded"
                        />
                        <div>
                          <h4 className="font-semibold text-sm text-foreground leading-tight">{cert.title}</h4>
                          <p className="text-xs text-muted-foreground">{cert.provider}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {cert.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="text-xs bg-primary/10 text-primary rounded px-2 py-0.5">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:text-primary/80 inline-flex items-center gap-1"
                      >
                        View Certificate →
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Category Sections */}
            {categoryOrder.map((category, index) => {
              const categoryCerts = getCertsByCat(category);
              if (categoryCerts.length === 0) return null;
              
              return (
                <CertificateCategorySection
                  key={category}
                  category={category}
                  certificates={categoryCerts}
                  index={index}
                />
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default EducationPage;
