import * as React from "react";
import { portfolioData } from "@/data/portfolio-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Credential {
  title: string;
  url: string;
}

interface EducationEntry {
  degree: string;
  field: string;
  institution: string;
  logo: string;
  year: string;
  description: string;
  honors: string[];
  credentials?: Credential[];
}

export const Education = () => {
  const [selectedEducation, setSelectedEducation] = React.useState<EducationEntry | null>(null);

  return (
    <section id="education" className="py-14 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
        <header className="mb-10">
          <h1>Education</h1>
          <p className="mt-4 prose-measure text-ink-soft">
            Aviation Management taught me how complex organizations operate. Data Analytics
            taught me how to measure what's broken. Cornell taught me how to build
            what comes next.
          </p>
        </header>

        <ol className="list-none border-t border-line divide-y divide-line">
          {(portfolioData.education as EducationEntry[]).map((edu) => (
            <li key={edu.degree} className="py-7">
              <p className="font-mono text-[0.8rem] tabular-nums text-muted">{edu.year}</p>

              <h2 className="mt-1 font-sans text-base font-semibold text-ink leading-snug">
                {edu.degree}
              </h2>

              <p className="mt-0.5 font-sans text-[0.9rem] text-ink-soft">
                {edu.field} <span aria-hidden="true">&middot;</span> {edu.institution}
              </p>

              <p className="mt-3 prose-measure text-[0.95rem] text-ink-soft leading-relaxed">
                {edu.description}
              </p>

              {edu.honors.length > 0 && (
                <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-muted">
                  {edu.honors.map((honor) => (
                    <li key={honor} className="font-sans text-sm text-ink-soft leading-relaxed">
                      {honor}
                    </li>
                  ))}
                </ul>
              )}

              {edu.credentials && edu.credentials.length > 0 && (
                <p className="mt-3 font-sans text-sm">
                  <button
                    type="button"
                    onClick={() => setSelectedEducation(edu)}
                    className="link"
                  >
                    View credentials
                  </button>
                </p>
              )}
            </li>
          ))}
        </ol>

        {/* Credentials modal: plain raised surface */}
        <Dialog
          open={!!selectedEducation}
          onOpenChange={(open) => {
            if (!open) setSelectedEducation(null);
          }}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-paper-raised border-line rounded-md">
            <DialogHeader>
              <DialogTitle className="font-display text-xl font-semibold tracking-normal text-ink">
                {selectedEducation?.degree}
              </DialogTitle>
              <p className="font-sans text-sm text-muted">{selectedEducation?.institution}</p>
            </DialogHeader>

            <div className="mt-2 space-y-6">
              {selectedEducation?.credentials?.map((credential) => (
                <div key={credential.title} className="border border-line rounded-md overflow-hidden">
                  <div className="px-4 py-3 border-b border-line">
                    <h3 className="font-sans text-sm font-semibold text-ink">
                      {credential.title}
                    </h3>
                  </div>
                  <div className="aspect-[8.5/11] w-full bg-paper">
                    <iframe
                      src={credential.url}
                      className="w-full h-full"
                      title={credential.title}
                    />
                  </div>
                  <div className="px-4 py-3 border-t border-line">
                    <a
                      href={credential.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link font-sans text-sm"
                    >
                      Open in new tab <span aria-hidden="true">&#8599;</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
