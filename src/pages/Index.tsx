import { lazy, Suspense } from "react";
import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { BigNumber } from "@/components/BigNumber";
import { ImpactResults } from "@/components/ImpactResults";
import { HowIWork } from "@/components/HowIWork";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillMapTeaser } from "@/components/SkillMapTeaser";
import { SystemsTeaser } from "@/components/SystemsTeaser";
import ResearchPublications from "@/components/ResearchPublications";
import { EngineeringFootprint } from "@/components/EngineeringFootprint";
import { ContactCTA } from "@/components/ContactCTA";

// Interactive sections load on demand to keep the first paint light.
const BugHunt = lazy(() =>
  import("@/components/BugHunt").then((m) => ({ default: m.BugHunt }))
);

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <BigNumber />
        <ImpactResults />
        <HowIWork />
        <ProjectsSection />
        <Suspense fallback={<div className="min-h-[520px]" />}>
          <BugHunt />
        </Suspense>
        <SkillMapTeaser />
        <ResearchPublications />
        <EngineeringFootprint />
        <SystemsTeaser />
        <ContactCTA />
      </main>
    </div>
  );
};

export default Index;
