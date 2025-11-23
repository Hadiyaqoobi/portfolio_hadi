import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";
import { getRecentPosts, getAllTags } from "@/data/blog-posts";
import { useState } from "react";

interface BlogWidgetProps {
  onSearch?: (query: string) => void;
  onTagClick?: (tag: string) => void;
}

export const BlogWidget = ({ onSearch, onTagClick }: BlogWidgetProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const recentPosts = getRecentPosts(5);
  const allTags = getAllTags();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className="space-y-6 sticky top-24">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          
          <div className="relative p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Recent Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-all duration-300">
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          </div>

          <div className="relative p-4 space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <div className="w-1 h-4 bg-primary" />
              Recent Posts
            </h3>

            <div className="space-y-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="block group/item"
                >
                  <div className="space-y-1 p-2 rounded-md hover:bg-accent/10 transition-colors duration-300">
                    <h4 className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm group hover:border-accent/50 transition-all duration-300">
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
          </div>

          <div className="relative p-4 space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <div className="w-1 h-4 bg-accent" />
              Tags
            </h3>

            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer bg-secondary/50 hover:bg-secondary hover:scale-105 transition-all duration-300"
                  onClick={() => onTagClick?.(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
