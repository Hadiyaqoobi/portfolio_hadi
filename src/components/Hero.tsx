import { motion } from "framer-motion";
import { Download, ChevronDown, Terminal, Code, Cpu, Database, Binary, Braces } from "lucide-react";
import { Button } from "./ui/button";
import { portfolioData } from "@/data/portfolio-data";
import { WhoAmICard } from "./WhoAmICard";
import { useState, useEffect } from "react";

export const Hero = () => {
  const { personal } = portfolioData;
  const [typedTitle, setTypedTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullTitle = personal.title;

  // Typing animation effect
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullTitle.length) {
        setTypedTitle(fullTitle.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [fullTitle]);

  const floatingIcons = [Terminal, Code, Cpu, Database, Binary, Braces];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Floating computer symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`
            }}
          >
            <Icon size={40 + Math.random() * 20} />
          </motion.div>
        ))}

        {/* Matrix-style falling characters */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`matrix-${i}`}
            className="absolute terminal-font text-primary/10 text-xs"
            initial={{ y: -100 }}
            animate={{ y: "100vh" }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
            style={{
              left: `${i * 6.5}%`,
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Text and CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Name with glitch effect */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* Terminal brackets around name */}
              <motion.span
                className="text-primary/50 text-4xl md:text-6xl mr-4"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                &lt;
              </motion.span>
              
              <motion.span 
                className="gradient-text inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(0, 240, 255, 0.3)",
                    "0 0 40px rgba(0, 240, 255, 0.5)",
                    "0 0 20px rgba(0, 240, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {personal.name}
              </motion.span>

              <motion.span
                className="text-primary/50 text-4xl md:text-6xl ml-4"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                /&gt;
              </motion.span>

              {/* Glitch effect overlay */}
              <motion.span
                className="absolute inset-0 gradient-text opacity-30"
                animate={{
                  x: [0, -2, 2, 0],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                {personal.name}
              </motion.span>
            </motion.h1>

            {/* Title with typing effect */}
            <motion.div
              className="text-xl md:text-2xl text-primary font-mono flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Terminal size={24} className="text-accent" />
              <span className="text-muted-foreground">&gt;</span>
              <span>{typedTitle}</span>
              <motion.span
                className="inline-block w-2 h-6 bg-primary ml-1"
                animate={{ opacity: showCursor ? 1 : 0 }}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {personal.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow-cyan min-w-[200px] relative overflow-hidden group"
                  onClick={() => document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <span className="relative z-10 flex items-center">
                    View My Timeline
                    <ChevronDown className="ml-2" size={20} />
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground min-w-[200px] relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-md"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <Download className="mr-2" size={20} />
                    Download Resume
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: WhoAmI Card */}
          <WhoAmICard />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-primary" size={32} />
      </motion.div>
    </section>
  );
};
