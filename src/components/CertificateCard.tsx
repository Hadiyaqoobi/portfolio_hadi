interface CertificateCardProps {
  logo: string;
  title: string;
  provider: string;
  skills: string[];
  pdfUrl: string;
  date?: string;
  onClick?: () => void;
}

/**
 * One certificate as a quiet ruled-list row: name, issuer, year, PDF link.
 * The logo and skills props are kept for caller compatibility but no longer
 * rendered; the list stays plain by design (see DESIGN_SPEC.md).
 */
export const CertificateCard = ({
  title,
  provider,
  date,
  pdfUrl,
  onClick,
}: CertificateCardProps) => {
  const hasPdf = pdfUrl !== "#";

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.open(pdfUrl, "_blank", "noopener");
    }
  };

  return (
    <div className="py-3 border-b border-line flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <div className="min-w-0">
        <p className="font-sans text-sm text-ink leading-snug">{title}</p>
        <p className="mt-0.5 font-sans text-[0.8rem] text-muted">
          {provider}
          {date && (
            <>
              {" "}
              <span aria-hidden="true">&middot;</span>{" "}
              <span className="font-mono tabular-nums">{date}</span>
            </>
          )}
        </p>
      </div>
      {hasPdf && (
        <button
          type="button"
          onClick={handleClick}
          className="link font-sans text-[0.8rem] shrink-0"
        >
          View PDF
        </button>
      )}
    </div>
  );
};
