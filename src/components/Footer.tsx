import { Link } from "react-router-dom";
import { portfolioData } from "@/data/portfolio-data";

const secondaryLinks = [
  { label: "Systems", href: "/systems" },
  { label: "Skills", href: "/skills" },
  { label: "Education", href: "/education" },
  { label: "Research", href: "/#research" },
];

/* Every page ends the way a controlled document does. */
const Footer = () => {
  const { email, linkedin } = portfolioData.personal;

  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 py-8 font-mono text-[0.72rem] tracking-[0.08em] text-muted">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <a href={`mailto:${email}`} className="link">
              {email}
            </a>
            <span aria-hidden="true">&middot;</span>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              LinkedIn <span aria-hidden="true">&#8599;</span>
            </a>
            <span aria-hidden="true">&middot;</span>
            <a
              href="https://github.com/Hadiyaqoobi"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              GitHub <span aria-hidden="true">&#8599;</span>
            </a>
            <span aria-hidden="true">&middot;</span>
            {secondaryLinks.map((item, index) => (
              <span key={item.href} className="flex items-baseline gap-x-3">
                <Link
                  to={item.href}
                  className="text-ink-soft hover:text-accent transition-colors duration-150"
                >
                  {item.label}
                </Link>
                {index < secondaryLinks.length - 1 && (
                  <span aria-hidden="true">/</span>
                )}
              </span>
            ))}
          </div>
          <p className="uppercase tracking-[0.14em]">
            End of document <span className="text-accent">&#9642;</span>{" "}
            &copy; 2026 M. Hadi Yaqoobi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
