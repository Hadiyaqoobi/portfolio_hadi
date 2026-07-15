import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";

/** React Router doesn't reset scroll on navigation, and hash targets inside
 *  lazy-loaded sections don't exist yet on arrival — handle both. */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Retry briefly so lazy-loaded sections (e.g. #bug-hunt) can mount first.
    const id = hash.slice(1);
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      tries += 1;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.clearInterval(timer);
      } else if (tries > 40) {
        window.clearInterval(timer);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [pathname, hash]);

  return null;
};

// Code-split every non-landing route so the homepage ships a lean first bundle.
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TimelinePage = lazy(() => import("./pages/TimelinePage"));
const EducationPage = lazy(() => import("./pages/EducationPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const AI360Explorer = lazy(() => import("./pages/AI360Explorer"));
const SystemsPage = lazy(() => import("./pages/SystemsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const MakerMindCaseStudy = lazy(() => import("./pages/MakerMindCaseStudy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollManager />
        {/* Graph-paper ground: faint 34px grid under the content. */}
        <div className="sheet-grid" aria-hidden="true" data-noprint="" />
        <Suspense
          fallback={
            <div
              className="min-h-screen bg-paper flex items-center justify-center"
              aria-busy="true"
            >
              <span className="text-muted text-sm">Loading…</span>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/makermind" element={<MakerMindCaseStudy />} />
            <Route path="/projects/ai360" element={<AI360Explorer />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/systems" element={<SystemsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Redirects from removed pages */}
            <Route path="/beyond-work" element={<Navigate to="/about" replace />} />
            <Route path="/blog" element={<Navigate to="/" replace />} />
            <Route path="/blog/:slug" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
