import { motion } from "framer-motion";
import { Mail, Linkedin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { portfolioData } from "@/data/portfolio-data";

export const Contact = () => {
  const { personal } = portfolioData;

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Open to roles in data, analytics, IT business & systems analysis, and product-adjacent roles
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-6 text-foreground">Contact Information</h3>
              
              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="text-foreground group-hover:text-primary transition-colors">
                      {personal.email}
                    </div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Linkedin className="text-accent" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">LinkedIn</div>
                    <div className="text-foreground group-hover:text-accent transition-colors">
                      Connect with me
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-primary/20">
                <div className="text-sm text-muted-foreground terminal-font">
                  <span className="text-neon-green">●</span> Available for opportunities
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Name</label>
                <Input
                  placeholder="Your name"
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                <Textarea
                  placeholder="Your message..."
                  rows={6}
                  className="bg-background/50 border-primary/30 focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-glow-cyan"
              >
                <Send size={16} className="mr-2" />
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-20 pt-8 border-t border-primary/20"
      >
        <p className="text-muted-foreground terminal-font text-sm">
          © 2025 {personal.name} · Designed with <span className="text-primary">♥</span> and code
        </p>
      </motion.div>
    </section>
  );
};
