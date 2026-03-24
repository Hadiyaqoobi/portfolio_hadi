import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";
import { getPostBySlug } from "@/data/blog-posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Convert markdown-style content to HTML-like structure
  const renderContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      // Headers
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold text-foreground mb-6 mt-8">
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold text-foreground mb-4 mt-6">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-semibold text-foreground mb-3 mt-4">
            {line.substring(4)}
          </h3>
        );
      }

      // Code blocks
      if (line.startsWith("```")) {
        return null; // Skip code block markers for now
      }

      // Lists
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="text-muted-foreground mb-2 ml-6">
            {line.substring(2)}
          </li>
        );
      }

      // Bold text
      const boldPattern = /\*\*(.*?)\*\*/g;
      if (boldPattern.test(line)) {
        const parts = line.split(boldPattern);
        return (
          <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="text-foreground font-semibold">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }

      // Regular paragraphs
      if (line.trim()) {
        return (
          <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
            {line}
          </p>
        );
      }

      return null;
    });
  };

  return (
    <div className="relative min-h-screen">
      <Background />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link to="/blog">
              <Button
                variant="ghost"
                className="hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          {/* Post Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

              {/* Scan line effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan" />

              <div className="relative p-8 md:p-12">
                {/* Header */}
                <div className="mb-8 pb-8 border-b border-border/50">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {post.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-secondary/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  {renderContent(post.content)}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Back to Blog (Bottom) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link to="/blog">
              <Button
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                View All Posts
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
