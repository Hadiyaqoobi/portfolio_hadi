import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResearchPublications = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Research & Publications
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Academic work exploring technology and business transformation
          </p>
        </div>

        {/* Publication Card */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 sm:p-8 hover:border-primary/30 transition-all duration-300">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Graduation Thesis
                </span>
                <span className="text-xs text-muted-foreground">2019</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
                Smart Airport: How IoT and New Technologies Shape the Future of Airport Industry
              </h3>

              <p className="text-muted-foreground mb-5 leading-relaxed">
                Research thesis analyzing digital transformation in the aviation industry. 
                Conducted case studies on 10+ international airports to evaluate IoT adoption, 
                smart infrastructure implementation, and digital maturity levels. Identified 
                key success factors and challenges including cybersecurity considerations for 
                smart airport development.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["IoT Analysis", "Aviation Industry", "Case Study Research", "Digital Transformation"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full border border-border/50 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Button */}
              <Button asChild className="gap-2">
                <a 
                  href="/publications/smart-airport-thesis.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Read Thesis
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchPublications;
