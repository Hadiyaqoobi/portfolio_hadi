import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BlogPost } from "@/data/blog-posts";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link to={`/blog/${post.slug}`}>
        <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 h-full">
          {/* Animated border glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl" />
          </div>

          {/* Scan line effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scan" />
          </div>

          <div className="relative p-6 space-y-4">
            {/* Date */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-secondary/50 hover:bg-secondary/80 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Read More Button */}
            <div className="pt-4">
              <Button
                variant="ghost"
                className="group-hover:text-primary transition-colors p-0 h-auto"
              >
                Read more
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
