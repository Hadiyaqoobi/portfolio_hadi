import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { ContactCTA } from "@/components/ContactCTA";
import { motion } from "framer-motion";
import { MapPin, BookOpen, Coffee, Globe, Eye, Wrench, Target } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navigation />

      <main className="relative z-10 pt-20">
        {/* ─── ORIGIN STORY ─── */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="accent-line mb-5" />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight">
                About Me
              </h1>
              <p className="text-xl text-slate-400 italic mb-10">
                Every system I've built started with a constraint I couldn't ignore.
              </p>

              <div className="columns-1 md:columns-2 gap-10 space-y-6 text-slate-400 text-base leading-relaxed">
                <p>
                  I left Afghanistan at 17. Won two scholarships that fund fewer than
                  1 in 5 applicants: UNHCR's DAFI and Turkey's YTB Burslari (~4%
                  acceptance). Studied Aviation Management at Kocaeli University,
                  wrote my thesis mapping digital maturity across 10+ airport systems,
                  and graduated with High Honors. That thesis taught me as-is vs. to-be
                  analysis, gap identification, and stakeholder alignment. It turned out
                  to be the same work I'd do years later as a Business Systems Analyst
                  at an S&P 500 REIT.
                </p>
                <p>
                  Before I left Turkey, the CEO of ConnectionHub recruited me to build
                  education technology for refugees. I led a 15-person team across 11 cities
                  and 5 countries. We reached 1,182 displaced students with 5 production
                  platforms and a 15-tool technology ecosystem built entirely on free-tier
                  infrastructure. Every requirements document, every database schema, every
                  deployment. I authored it, built it, or shipped it. That's where I learned
                  that constraints don't limit design. They clarify it.
                </p>
                <p>
                  In the U.S., I joined Equity Residential as a Sales Consultant. For
                  20 months at a 400-unit property during a major renovation, I lived
                  inside the systems I'd later be asked to fix. I felt every friction point,
                  tracked every data discrepancy, and built VBA automation because no vendor
                  tool existed for what I needed. I won Leasing Consultant of the Year.
                  Not because I was the best salesperson, but because I understood the
                  systems better than anyone selling with them.
                </p>
                <p>
                  After my Master's at BU Questrom (Director's Honors List, three
                  times), Equity brought me back into the corporate technology
                  organization as an IT Business Systems Analyst. I managed an Azure B2C
                  authentication migration across six teams and 135,000+ accounts,
                  authored 5 FRDs for multi-state fee transparency compliance, and wrote
                  SQL four hours a day across 9 API integrations. I didn't just document
                  requirements. I validated them in the data, tested them in production,
                  and owned them through deployment.
                  <span className="text-slate-100 font-medium"> Nothing broke when it went live.</span>
                </p>
                <p>
                  Now I build AI products at Nexuss Science. 6 shipped products, 325,000+
                  lines of code, multi-agent LLM platforms, and custom ML architectures.
                  My research on LLM statistical reliability is under peer review at
                  Springer's Empirical Software Engineering. I'm 16 courses into Cornell's
                  AI360 certificate. The thread through all of it: I notice where systems
                  fail, I dig into why, and I build what's needed to fix them.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── THREE BRAND PILLARS ─── */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="accent-line mb-5" />
                <h2 className="text-3xl font-bold text-slate-100 mb-3">
                  What Makes Me Different
                </h2>
              </motion.div>

              <div className="space-y-0">
                {[
                  {
                    icon: Eye,
                    title: "Systems Thinker Who's Been the End User",
                    description: "I've been the Sales Consultant using the CRM at 9 PM during a renovation, the refugee navigating a broken education process, the BSA writing SQL four hours a day to validate what the vendor said was correct. I don't analyze systems from a distance. I've operated at every layer, which is why I catch what others miss.",
                    color: "indigo",
                  },
                  {
                    icon: Wrench,
                    title: "Builder, Not Advisor",
                    description: "I don't recommend solutions and wait for someone else to build them. 5 production websites built entirely on free-tier infrastructure. A SQL validation engine checking 960+ data points per property. An Azure migration across 6 teams with zero incidents. VBA automation because no vendor product existed. When something needs to exist, I make it exist.",
                    color: "emerald",
                  },
                  {
                    icon: Target,
                    title: "Constraint-Driven Design",
                    description: "Volunteer teams, 2G connections, construction-disrupted properties, six time zones. My best work happens under real constraints. They forced me to identify what actually matters, and that discipline transfers everywhere: from refugee education platforms to S&P 500 enterprise systems to AI product architecture.",
                    color: "amber",
                  },
                ].map((pillar, index) => {
                  const Icon = pillar.icon;
                  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
                    indigo: { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400" },
                    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400" },
                    amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400" },
                  };
                  const colors = colorMap[pillar.color];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex gap-6 py-8 ${index !== 2 ? "border-b border-slate-800" : ""}`}
                    >
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-100 mb-2">{pillar.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{pillar.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Fun Facts Strip ─── */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-sm font-semibold text-slate-500 mb-8">A few things about me</h3>

                {/* Desktop: inline strip with vertical dividers */}
                <div className="hidden lg:flex items-start divide-x divide-slate-800">
                  {[
                    {
                      icon: Globe,
                      title: "5 countries, 3 continents",
                      description: "Afghanistan, Turkey, Germany (scholarship), California, Massachusetts. Each context taught me how constraints look different depending on who's facing them.",
                    },
                    {
                      icon: BookOpen,
                      title: "5 languages",
                      description: "Dari (native), Hazaragi, Turkish, Pashto, English. Enough German to order coffee. Each one reshaped how I think about requirements and communication.",
                    },
                    {
                      icon: MapPin,
                      title: "Based in Boston",
                      description: "Green Card holder. No sponsorship required. Open to relocation.",
                    },
                    {
                      icon: Coffee,
                      title: "When I'm not working",
                      description: "Long walks, soccer, cooking Afghan food, and reading about systems that failed and why.",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.08 }}
                        className="flex-1 px-6 py-4"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <Icon className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-medium text-slate-300">{item.title}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile: 2-col grid with bottom borders */}
                <div className="lg:hidden grid sm:grid-cols-2 gap-0">
                  {[
                    {
                      icon: Globe,
                      title: "5 countries, 3 continents",
                      description: "Afghanistan, Turkey, Germany (scholarship), California, Massachusetts. Each context taught me how constraints look different depending on who's facing them.",
                    },
                    {
                      icon: BookOpen,
                      title: "5 languages",
                      description: "Dari (native), Hazaragi, Turkish, Pashto, English. Enough German to order coffee. Each one reshaped how I think about requirements and communication.",
                    },
                    {
                      icon: MapPin,
                      title: "Based in Boston",
                      description: "Green Card holder. No sponsorship required. Open to relocation.",
                    },
                    {
                      icon: Coffee,
                      title: "When I'm not working",
                      description: "Long walks, soccer, cooking Afghan food, and reading about systems that failed and why.",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.08 }}
                        className={`px-4 py-5 ${index < 2 ? "border-b border-slate-800" : ""}`}
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <Icon className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-medium text-slate-300">{item.title}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <ContactCTA />
      </main>
    </div>
  );
};

export default AboutPage;
