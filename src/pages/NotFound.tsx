import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404: route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navigation />
      <main className="flex flex-1 items-center justify-center px-5 sm:px-6">
        <div className="py-20 text-center">
          <p className="kicker mb-3">404</p>
          <h1 className="mb-5 text-3xl">This page doesn't exist.</h1>
          <Link to="/" className="link font-sans text-sm">
            Go to the home page
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
