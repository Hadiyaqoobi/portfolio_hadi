/* Fixed "instrument" chrome: reading-progress bar, status chip, dot rail.
   All [data-noprint]; rail and chip label hide at <=680px (see README). */

export const ProgressBar = ({ progress }: { progress: number }) => (
  <div
    data-noprint=""
    aria-hidden="true"
    className="fixed top-0 left-0 right-0 z-[70] h-[3px]"
    style={{ background: "rgba(26,24,19,0.06)" }}
  >
    <div
      className="h-full bg-accent"
      style={{ width: `${progress * 100}%` }}
    />
  </div>
);

export const StatusChip = ({
  progress,
  sectionNum,
  sectionLabel,
}: {
  progress: number;
  sectionNum: string;
  sectionLabel: string;
}) => (
  <div
    data-noprint=""
    className="fixed top-[13px] right-[14px] z-[70] border border-line px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-soft backdrop-blur-sm"
    style={{ background: "rgba(239,237,228,0.8)" }}
  >
    <span className="hidden min-[680px]:inline">
      &sect;{sectionNum} &middot; {sectionLabel}{" "}
    </span>
    <span className="text-accent">{Math.round(progress * 100)}%</span>
  </div>
);

export const DotRail = ({
  sections,
  activeIndex,
}: {
  sections: { id: string; label: string }[];
  activeIndex: number;
}) => (
  <nav
    data-noprint=""
    aria-label="Section navigation"
    className="fixed right-4 top-1/2 z-[60] hidden -translate-y-1/2 min-[680px]:block"
  >
    <div className="flex flex-col items-center gap-3 border-l border-line pl-3">
      {sections.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-label={s.label}
          title={s.label}
          className="block h-[9px] w-[9px] rounded-full border transition-transform duration-150"
          style={{
            borderColor: i === activeIndex ? "var(--accent)" : "var(--leader)",
            background: i === activeIndex ? "var(--accent)" : "transparent",
            transform: i === activeIndex ? "scale(1.35)" : "none",
          }}
        />
      ))}
    </div>
  </nav>
);

/* Section header pattern used by every numbered section. */
export const SectionHeader = ({
  num,
  title,
  tag,
}: {
  num: string;
  title: string;
  tag: string;
}) => (
  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t-2 border-ink pt-4">
    <span className="font-mono text-[13px] font-semibold text-accent">
      &sect;{num}
    </span>
    <h2 className="flex-1">{title}</h2>
    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
      {tag}
    </span>
  </div>
);
