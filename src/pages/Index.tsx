import { Navigation } from "@/components/Navigation";
import {
  ProgressBar,
  StatusChip,
  DotRail,
} from "@/components/spec/Chrome";
import { RunningHead, TitleBlock } from "@/components/spec/TitleBlock";
import { OperatingModel } from "@/components/spec/OperatingModel";
import { Summary, KeyResults } from "@/components/spec/KeyResults";
import { SelectedWork } from "@/components/spec/SelectedWork";
import { Provenance } from "@/components/spec/Provenance";
import { SignOff, SpecFooter } from "@/components/spec/SignOff";
import {
  usePrefersReducedMotion,
  useReadingProgress,
  useKeyboardNav,
} from "@/components/spec/hooks";

/* The homepage as a technical specification document (design handoff:
   "Specification Document" concept). Order = keyboard/dot-rail indices. */
const SECTIONS = [
  { id: "sec-top", num: "00", label: "Title" },
  { id: "sec-summary", num: "01", label: "Summary" },
  { id: "sec-results", num: "02", label: "Key results" },
  { id: "sec-work", num: "03", label: "Selected work" },
  { id: "sec-provenance", num: "04", label: "Provenance" },
  { id: "sec-signoff", num: "05", label: "Sign-off" },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

const Index = () => {
  const reduced = usePrefersReducedMotion();
  const { progress, activeIndex } = useReadingProgress(SECTION_IDS);
  useKeyboardNav(SECTION_IDS, activeIndex);

  return (
    <div className="relative z-10 min-h-screen">
      <ProgressBar progress={progress} />
      <StatusChip
        progress={progress}
        sectionNum={SECTIONS[activeIndex].num}
        sectionLabel={SECTIONS[activeIndex].label}
      />
      <DotRail sections={SECTIONS} activeIndex={activeIndex} />

      <div data-noprint="">
        <Navigation />
      </div>

      <main
        className="mx-auto w-full"
        style={{
          maxWidth: 1000,
          paddingLeft: "clamp(20px, 4vw, 40px)",
          paddingRight: "clamp(20px, 4vw, 40px)",
          paddingTop: "clamp(24px, 4vw, 44px)",
        }}
      >
        <RunningHead />
        <TitleBlock reduced={reduced} />
        <OperatingModel reduced={reduced} />
        <Summary reduced={reduced} />
        <KeyResults reduced={reduced} />
        <SelectedWork reduced={reduced} />
        <Provenance reduced={reduced} />
        <SignOff reduced={reduced} />
        <SpecFooter />
      </main>
    </div>
  );
};

export default Index;
