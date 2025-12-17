import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { Timeline as TimelineComponent } from "@/components/Timeline";

const TimelinePage = () => {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navigation />
      
      <main className="relative z-10 pt-20">
        <TimelineComponent />
      </main>
    </div>
  );
};

export default TimelinePage;
