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
          <p className="kicker mb-2">Education</p>
          <h1>I learned my way here — on purpose.</h1>
          <div className="mt-5 prose-measure space-y-4 text-ink-soft">
            <p>
              Over the years I've earned 57 certificates on edX and nine
              specializations on Coursera. They aren't a collection —
              they're a curriculum I built for myself, one
              problem at a time, because I couldn't afford to wait for permission
              to learn the next thing.
            </p>
            <p>
              It started with a bachelor's I earned as a refugee, on scholarships
              that take fewer than one in five applicants. My thesis mapped the
              digital maturity of airport systems — as-is versus to-be, gap
              analysis — the exact work I'd do years later as a systems analyst.
              From there I taught myself the foundation I hadn't been handed:
              computer science from Harvard and Stanford, data science from
              Columbia and HarvardX, Python and automation from Google. Not for
              the certificates. For the specific gap in front of me each time.
            </p>
            <p>
              The data thread came together in a STEM master's from Boston
              University. Then I chose AI, and I chose it deliberately: Cornell's
              AI and Machine Learning 360, the algorithms built from scratch in
              NumPy, while I was already
              fine-tuning models and architecting AI systems. Learning and
              shipping at the same time.
            </p>
            <p>
              Put together, it isn't a pile of credentials. It's one line: I
              learned my way from the end user of systems, to the analyst who
              delivers them, to the architect who builds the AI ones. And I'm not
              done — the next one is already in progress.
            </p>
          </div>
        </header>

        <p className="kicker mb-3">Degrees</p>
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
