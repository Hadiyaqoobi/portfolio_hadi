import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Award, Search, Filter, X, Star, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { CertificateCategorySection } from "@/components/CertificateCategorySection";
import {
  certificates,
  certificateProviders,
  categoryOrder,
  getCertificatesGroupedByCategory,
  getFeaturedCertificates,
  CertificateCategory,
  categoryIcons,
} from "@/data/certificates";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CertificateCard } from "@/components/CertificateCard";

export default function Certificates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Filtered certificates
  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      const matchesSearch =
        searchQuery === "" ||
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesProvider =
        selectedProvider === "all" || cert.provider === selectedProvider;

      const matchesCategory =
        selectedCategory === "all" || cert.category === selectedCategory;

      const matchesFeatured = !showFeaturedOnly || cert.featured;

      return matchesSearch && matchesProvider && matchesCategory && matchesFeatured;
    });
  }, [searchQuery, selectedProvider, selectedCategory, showFeaturedOnly]);

  // Group filtered certificates by category
  const groupedFilteredCertificates = useMemo(() => {
    const grouped: Partial<Record<CertificateCategory, typeof filteredCertificates>> = {};
    
    categoryOrder.forEach((category) => {
      const certs = filteredCertificates
        .filter((cert) => cert.category === category)
        .sort((a, b) => (a.priority || 99) - (b.priority || 99));
      if (certs.length > 0) {
        grouped[category] = certs;
      }
    });
    
    return grouped;
  }, [filteredCertificates]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedProvider("all");
    setSelectedCategory("all");
    setShowFeaturedOnly(false);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedProvider !== "all" ||
    selectedCategory !== "all" ||
    showFeaturedOnly;

  const featuredCerts = getFeaturedCertificates();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5" />
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-primary/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary mb-2 inline-block transition-colors"
                >
                  ← Back to Home
                </Link>
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-primary" />
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                      Certificates & <span className="text-gradient">Education</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      {filteredCertificates.length} of {certificates.length} certificates
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by title, provider, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-primary/20 focus:border-primary/50"
                />
              </div>

              {/* Filters row */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filters:</span>
                </div>

                {/* Featured toggle */}
                <Button
                  variant={showFeaturedOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className={showFeaturedOnly 
                    ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-500 hover:bg-yellow-500/30" 
                    : "border-primary/20"}
                >
                  <Star className={`w-3 h-3 mr-1 ${showFeaturedOnly ? "fill-yellow-500" : ""}`} />
                  Core Only
                </Button>

                {/* Provider filter */}
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger className="w-[180px] bg-background/50 border-primary/20">
                    <SelectValue placeholder="Provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    {certificateProviders.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Category filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[280px] bg-background/50 border-primary/20">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categoryOrder.map((category) => (
                      <SelectItem key={category} value={category}>
                        {categoryIcons[category]} {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Clear filters */}
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Philosophy banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 rounded-lg bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20"
          >
            <p className="text-center text-muted-foreground italic">
              "I picked each certificate to close a specific gap: CS50 for programming
              foundations, Google BI for dashboard delivery, Cornell's AI & Machine
              Learning 360 for ML and NLP."
            </p>
          </motion.div>

          {/* Featured section (only when no filters) */}
          {!hasActiveFilters && featuredCerts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Core Certificates
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    The ones I'd show a hiring manager first.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCerts.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-[10px] font-mono text-yellow-500 uppercase">Core</span>
                      </div>
                    </div>
                    <CertificateCard
                      logo={cert.providerLogo}
                      title={cert.title}
                      provider={cert.provider}
                      skills={cert.skills}
                      pdfUrl={cert.pdfUrl}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Category sections */}
          {filteredCertificates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No certificates found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedFilteredCertificates).map(
                ([category, certs], index) => (
                  <CertificateCategorySection
                    key={category}
                    category={category as CertificateCategory}
                    certificates={certs!}
                    index={index}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
