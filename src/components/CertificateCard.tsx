import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CertificateCardProps {
  logo: string;
  title: string;
  provider: string;
  skills: string[];
  pdfUrl: string;
  onClick?: () => void;
}

export const CertificateCard = ({
  logo,
  title,
  provider,
  skills,
  pdfUrl,
  onClick,
}: CertificateCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.open(pdfUrl, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] transition-all duration-300"
    >
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/40" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/40" />

      {/* Animated scan line */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100"
        animate={{
          y: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative p-6 space-y-4">
        {/* Provider header */}
        <div className="flex items-center gap-3 pb-3 border-b border-primary/20">
          <div className="w-12 h-12 rounded-lg bg-background/80 border border-primary/20 flex items-center justify-center overflow-hidden p-2">
            <img
              src={logo}
              alt={provider}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">{provider}</p>
            <div className="flex items-center gap-1 text-primary">
              <FileText className="w-3 h-3" />
              <span className="text-[10px] font-mono">CERTIFICATE</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground leading-tight line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-[10px] px-2 py-0.5 bg-primary/5 border-primary/30 text-primary hover:bg-primary/10"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge
              variant="outline"
              className="text-[10px] px-2 py-0.5 bg-primary/5 border-primary/30 text-primary"
            >
              +{skills.length - 4}
            </Badge>
          )}
        </div>

        {/* View button */}
        <Button
          onClick={handleClick}
          variant="outline"
          className="w-full group/btn border-primary/30 hover:border-primary/60 hover:bg-primary/10 text-primary"
        >
          <span>View Certificate</span>
          <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};
