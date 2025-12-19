import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ImpactResults } from "@/components/ImpactResults";
import { HowIWork } from "@/components/HowIWork";
import { ProjectsSection } from "@/components/ProjectsSection";
import ResearchPublications from "@/components/ResearchPublications";
import { EngineeringFootprint } from "@/components/EngineeringFootprint";
import { ContactCTA } from "@/components/ContactCTA";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navigation />
      
      <main className="relative z-10">
        <Hero />
        <ImpactResults />
        <HowIWork />
        <ProjectsSection />
        <ResearchPublications />
        <EngineeringFootprint />
        <ContactCTA />
      </main>
    </div>
  );
};

export default Index;
