import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { WorkLedger } from "@/components/WorkLedger";

const ProjectsPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Navigation />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-16 pt-10 sm:px-6 sm:pt-14">
        <header>
          <h1>The work</h1>
          <p className="mt-4 max-w-[68ch] font-serif text-ink-soft">
            Every project on one calm screen. Filter by status or tech, search, and open any row to
            read the story and peek the real code. Nothing is more than one click deep.
          </p>
        </header>

        <div className="mt-10">
          <WorkLedger />
        </div>

        <p className="mt-8 font-sans text-sm text-ink-soft">
          My Cornell AI 360 coursework, 20 projects across NLP, machine learning, and data science
          in R, has{" "}
          <Link to="/projects/ai360" className="link">
            its own explorer
          </Link>
          .
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
