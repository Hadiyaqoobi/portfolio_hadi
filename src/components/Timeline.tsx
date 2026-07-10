import { portfolioData } from "@/data/portfolio-data";

type TimelineItem = {
  year: string;
  title: string;
  company?: string;
  location?: string;
  skills?: string[];
  highlights?: string[];
  type?: string;
  category?: string;
  transition?: string;
};

export const Timeline = () => {
  const timeline: TimelineItem[] = portfolioData.timeline;

  return (
    <section id="timeline" className="py-14 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
        <header className="mb-10">
          <h1>Career</h1>
          <p className="mt-4 prose-measure text-ink-soft">
            From Afghanistan to Turkey to the United States. Every role shaped
            how I gather requirements, build systems, and deliver outcomes.
          </p>
        </header>

        <ol className="list-none border-t border-line divide-y divide-line">
          {timeline.map((item) => (
            <li key={`${item.year}-${item.title}`} className="py-7">
              {item.transition && (
                <p className="font-sans text-[0.8rem] text-muted mb-4">
                  {item.transition}
                </p>
              )}

              <p className="font-mono text-[0.8rem] tabular-nums text-muted">
                {item.year}
              </p>

              <h2 className="mt-1 font-sans text-base font-semibold text-ink leading-snug">
                {item.title}
              </h2>

              {item.company && (
                <p className="mt-0.5 font-sans text-[0.9rem] text-ink-soft">
                  {item.company}
                  {item.location && <span> &middot; {item.location}</span>}
                </p>
              )}

              {item.skills && item.skills.length > 0 && (
                <p className="mt-2 font-sans text-[0.8rem] text-muted">
                  {item.skills.join(" · ")}
                </p>
              )}

              {item.highlights && item.highlights.length > 0 && (
                <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-muted">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="font-sans text-sm text-ink-soft leading-relaxed"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
