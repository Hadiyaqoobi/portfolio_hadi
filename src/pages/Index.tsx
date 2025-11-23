import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { FeaturedCertificates } from "@/components/FeaturedCertificates";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navigation />
      
      <main className="relative z-10">
        <Hero />
        <Timeline />
        <Education />
        <Skills />
        <Projects />
        <FeaturedCertificates />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
