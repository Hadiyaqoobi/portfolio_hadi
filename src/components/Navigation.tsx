import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "#home", type: "hash" },
  { label: "Timeline", href: "#timeline", type: "hash" },
  { label: "About", href: "#about", type: "hash" },
  { label: "Skills", href: "#skills", type: "hash" },
  { label: "Projects", href: "#projects", type: "hash" },
  { label: "Blog", href: "/blog", type: "route" },
  { label: "Certificates", href: "/certificates", type: "route" },
  { label: "Contact", href: "#contact", type: "hash" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-primary/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="text-xl font-bold terminal-font gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            MHY.sys
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.type === "route" ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            {navItems.map((item) =>
              item.type === "route" ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
