import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Career", href: "/timeline" },
  { label: "Contact", href: "/contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-40 bg-paper border-b border-line">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="font-display text-lg text-ink">
            M. Hadi Yaqoobi
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 font-sans text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                aria-current={location.pathname === item.href ? "page" : undefined}
                className={`transition-colors duration-150 ${
                  location.pathname === item.href
                    ? "text-accent"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a href="/resume.pdf" download className="btn-quiet">
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden -mr-2 p-2 text-ink"
            aria-expanded={isOpen}
            aria-controls="site-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile disclosure menu */}
      {isOpen && (
        <div
          id="site-menu"
          className="md:hidden border-t border-line bg-paper-raised"
        >
          <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 py-3 flex flex-col font-sans text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                aria-current={location.pathname === item.href ? "page" : undefined}
                className={`py-2.5 border-b border-line transition-colors duration-150 ${
                  location.pathname === item.href
                    ? "text-accent"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a href="/resume.pdf" download className="btn-quiet mt-3 mb-1 self-start">
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
