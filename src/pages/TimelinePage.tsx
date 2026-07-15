import { Navigation } from "@/components/Navigation";
import { Timeline } from "@/components/Timeline";
import Footer from "@/components/Footer";

const TimelinePage = () => {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Timeline />
      </main>
      <Footer />
    </div>
  );
};

export default TimelinePage;
