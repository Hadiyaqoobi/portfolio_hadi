import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { BlogCard } from "@/components/BlogCard";
import { BlogWidget } from "@/components/BlogWidget";
import { blogPosts } from "@/data/blog-posts";
import { BookOpen } from "lucide-react";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    // Sort by date (newest first)
    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [searchQuery, selectedTag]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <div className="relative min-h-screen">
      <Background />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-10 h-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Blog
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Insights on data analytics, systems thinking, and bridging business with technology
            </p>
          </motion.div>

          {/* Active tag filter indicator */}
          {selectedTag && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-center"
            >
              <span className="text-sm text-muted-foreground">
                Filtering by tag:{" "}
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-primary hover:underline font-semibold"
                >
                  {selectedTag} ×
                </button>
              </span>
            </motion.div>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
            {/* Left Column - Blog Posts */}
            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-muted-foreground text-lg">
                    No posts found matching your criteria.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Right Column - Widget */}
            <div className="lg:block hidden">
              <BlogWidget
                onSearch={setSearchQuery}
                onTagClick={handleTagClick}
              />
            </div>
          </div>

          {/* Mobile Widget (shown below posts on mobile) */}
          <div className="lg:hidden mt-8">
            <BlogWidget
              onSearch={setSearchQuery}
              onTagClick={handleTagClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
