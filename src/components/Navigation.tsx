import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Work", href: "/projects" },
  { label: "Systems", href: "/systems" },
  { label: "Skills", href: "/skills" },
  { label: "Education", href: "/education" },
  { label: "Experience", href: "/timeline" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* The nav is the document control strip: mono, uppercase, ruled.
   Backdrop blur so the drafting grid reads through it faintly. */
export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="flex h-12 items-center justify-between font-mono text-[0.72rem] tracking-[0.13em] uppercase">
          <Link to="/" className="text-ink font-medium">
            M. Hadi Yaqoobi
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <span className="text-muted normal-case tracking-[0.06em]">
              Boston, MA
            </span>
            <span className="text-muted/50" aria-hidden="true">
              /
            </span>
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
            <a href="/resume.pdf" download className="tag">
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
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile disclosure menu */}
      {isOpen && (
        <div
          id="site-menu"
          className="md:hidden border-t border-line bg-paper-raised"
        >
          <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 py-3 flex flex-col font-mono text-[0.75rem] tracking-[0.1em] uppercase">
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
