import { Navigation } from "@/components/Navigation";
import { Background } from "@/components/Background";
import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  Heart, 
  Globe, 
  Plane, 
  Mountain, 
  Code, 
  Trophy,
  Github,
  Mic,
  Calendar,
  MapPin,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VolunteerCard {
  title: string;
  organization: string;
  location?: string;
  duration: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  isUpcoming?: boolean;
}

const volunteerData: VolunteerCard[] = [
  {
    title: "Chapter Leader",
    organization: "Browserstuck",
    location: "Boston, MA",
    duration: "Present",
    description: "Leading the Boston chapter, building community around technology and innovation.",
    tags: ["Leadership", "Community Building"],
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Admission Ambassador",
    organization: "Boston University, Questrom School of Business",
    duration: "Oct 2023 – Present",
    description: "Supporting prospective students by providing information, answering questions, and sharing my experience in the MSMS program.",
    tags: ["Mentorship", "Education"],
    icon: <GraduationCap className="w-6 h-6" />
  },
  {
    title: "Community Consultant",
    organization: "Afghan Refugees Solidarity Association (ARSA)",
    location: "Turkey",
    duration: "Jan 2013 – Aug 2020 (7+ years)",
    description: "Provided counseling and educational support to refugee communities for over 7 years, helping individuals navigate challenges and access resources.",
    tags: ["Refugee Support", "Counseling", "Education"],
    icon: <Heart className="w-6 h-6" />
  },
  {
    title: "Delegate — Afghanistan",
    organization: "Space Generation Advisory Council",
    duration: "2019 – Present",
    description: "Represented Afghanistan at the Asia Pacific Space Generation Workshop Council in 2020, addressing delegates from 72 countries on the importance of STEM and aerospace education for Afghan youth.",
    tags: ["International", "Aerospace", "Public Speaking"],
    icon: <Mic className="w-6 h-6" />
  },
  {
    title: "Event Staff",
    organization: "San Francisco Fleet Week Association",
    duration: "Oct 2022",
    description: "Volunteered at one of the largest airshows in the United States, engaging with attendees and supporting event operations. Combined my love for aviation with community service.",
    tags: ["Aviation", "Events"],
    icon: <Plane className="w-6 h-6" />
  },
  {
    title: "Airport Editor",
    organization: "Infinite Flight (Flight Simulator)",
    duration: "Aug 2020 – Apr 2021",
    description: "Maintained and updated the Infinite Flight airport repository on GitHub, contributing to the global flight simulation community.",
    tags: ["Aviation", "Open Source", "GitHub"],
    icon: <Github className="w-6 h-6" />
  },
  {
    title: "FIFA World Cup 2026 🏆",
    organization: "Upcoming Volunteer",
    location: "Boston, MA",
    duration: "2026",
    description: "Excited to volunteer at the FIFA World Cup when it comes to Boston in 2026!",
    tags: ["Coming Soon", "Global Event"],
    icon: <Trophy className="w-6 h-6" />,
    isUpcoming: true
  }
];

interface HobbyCard {
  title: string;
  emoji: string;
  description: string;
  icon: React.ReactNode;
}

const hobbiesData: HobbyCard[] = [
  {
    title: "Aviation & Aerospace Enthusiast",
    emoji: "✈️",
    description: "I was about five years old, standing in a small village in Jaghori, Afghanistan, when I saw my first airplane — a tanker escorted by fighter jets. Most people in the village had never seen aircraft before. I remember the adults staring at the sky, certain that the big plane had just \"given birth\" to the smaller ones.\n\nI didn't know what I was looking at. But in that moment, something clicked — and it never let go.\n\nThat childhood curiosity led me to an Aviation Management degree, a thesis on Smart Airports and IoT, volunteering at San Francisco Fleet Week, and representing Afghanistan at the Space Generation Advisory Council.\n\nToday, I'm an aerospace and aviation enthusiast with a strong interest in suborbital and hypersonic flight — the next frontier. From village skies to the edge of space, the curiosity that started at five is still taking me higher.",
    icon: <Plane className="w-8 h-8" />
  },
  {
    title: "Hiking & Outdoors",
    emoji: "🥾",
    description: "I do my best thinking on trails. Whether it's the Blue Hills near Boston, conquering Mt. Washington, or exploring new terrain — hiking keeps me grounded. I go to Mt. Washington often with friends; there's something about the challenge, the views, and the conversations that keeps pulling me back.",
    icon: <Mountain className="w-8 h-8" />
  },
  {
    title: "Building Things",
    emoji: "💻",
    description: "I've been building since childhood — taking things apart, figuring out how they work, and creating something new. That curiosity never stopped. Today, I turn ideas into working products: TrailX (hiking app), MakerMind (hardware project generator), AeroValue (aircraft valuation). If I can imagine it, I'll find a way to build it.",
    icon: <Code className="w-8 h-8" />
  }
];

const funFacts = [
  { emoji: "🌍", text: "I've lived in 3 countries — Afghanistan, Turkey, and the United States" },
  { emoji: "🗣️", text: "I speak 3 languages — English, Farsi/Dari, and Turkish" },
  { emoji: "✈️", text: "I represented Afghanistan at an international aerospace conference with delegates from 72 countries" },
  { emoji: "🎮", text: "I contributed to Infinite Flight, a popular flight simulator with millions of users" },
  { emoji: "⚽", text: "I'll be volunteering at the FIFA World Cup 2026 in Boston" }
];

const BeyondWork = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Background />
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Beyond Work</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The experiences and passions that shape who I am outside the office.
          </p>
        </motion.div>

        {/* Section 1: Volunteering & Community */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Giving Back</h2>
            </div>
            <p className="text-muted-foreground">Making an impact beyond the workplace.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                className={`relative bg-card/50 backdrop-blur-sm border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group ${
                  item.isUpcoming 
                    ? 'border-primary/40 shadow-[0_0_20px_rgba(0,255,255,0.15)]' 
                    : 'border-primary/20'
                }`}
              >
                {item.isUpcoming && (
                  <div className="absolute -top-3 right-4">
                    <Badge className="bg-primary/20 text-primary border-primary/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Coming Soon
                    </Badge>
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-primary/80 text-sm mb-1">{item.organization}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      {item.location && (
                        <>
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                          <span>·</span>
                        </>
                      )}
                      <Calendar className="w-3 h-3" />
                      <span>{item.duration}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="secondary" 
                          className="text-xs bg-primary/10 text-primary/80 border-primary/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 2: Hobbies & Interests */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">When I'm Not Working</h2>
            </div>
            <p className="text-muted-foreground">What keeps me curious and energized.</p>
          </motion.div>

          <div className="space-y-6">
            {hobbiesData.map((hobby, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary shrink-0">
                    {hobby.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {hobby.title} {hobby.emoji}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {hobby.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Fun Facts */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">A Few Things About Me</h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-8"
          >
            <div className="grid gap-4">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <span className="text-2xl">{fact.emoji}</span>
                  <span className="text-muted-foreground">{fact.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default BeyondWork;
