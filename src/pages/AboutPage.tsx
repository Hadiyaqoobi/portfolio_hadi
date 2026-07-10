import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { portfolioData } from "@/data/portfolio-data";

const pillars = [
  {
    title: "Systems Thinker Who's Been the End User",
    description:
      "I've been the Sales Consultant using the CRM at 9 PM during a renovation, the refugee navigating a broken education process, the BSA writing SQL four hours a day to validate what the vendor said was correct. I don't analyze systems from a distance. I've operated at every layer, which is why I catch what others miss.",
  },
  {
    title: "Builder, Not Advisor",
    description:
      "I don't recommend solutions and wait for someone else to build them. 5 production websites built on free-tier infrastructure. A SQL validation engine checking 960+ data points per property. An Azure migration across 7 teams with zero incidents. VBA automation because no vendor product existed. When something needs to exist, I make it exist.",
  },
  {
    title: "Constraint-Driven Design",
    description:
      "Volunteer teams, 2G connections, construction-disrupted properties, six time zones. My best work happens under real constraints. They forced me to identify what actually matters, and that discipline transfers everywhere: from refugee education platforms to S&P 500 enterprise systems to AI product architecture.",
  },
];

const facts = [
  {
    term: "3 countries, 2 continents",
    detail:
      "Afghanistan, Turkey, and the United States. Each context taught me how constraints look different depending on who's facing them.",
  },
  {
    term: "5 languages",
    detail:
      "Dari (native), Hazaragi, Turkish, Pashto, English. Enough German to order coffee. Each one reshaped how I think about requirements and communication.",
  },
  {
    term: "Based in Boston",
    detail: "Green Card holder. No sponsorship required. Open to relocation.",
  },
  {
    term: "When I'm not working",
    detail:
      "Long walks, soccer, cooking Afghan food, and reading about systems that failed and why.",
  },
];

const AboutPage = () => {
  const { email } = portfolioData.personal;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navigation />

      <main className="mx-auto w-full max-w-3xl px-5 sm:px-6 pt-10 sm:pt-14 pb-16">
        {/* Letterhead */}
        <header className="border-b border-line pb-6">
          <h1>About Me</h1>
        </header>

        <p className="mt-6 mb-8 text-right font-serif italic text-ink-soft">
          Boston, July 2026
        </p>

        {/* The letter */}
        <section aria-label="Introduction" className="prose-measure space-y-5">
          <p>
            If you're reading this, you most likely have my resume open in
            another tab. This page is the part a resume can't hold.
          </p>
          <p className="font-serif italic text-ink-soft">
            Every system I've built started with a constraint I couldn't
            ignore.
          </p>
          <p>
            I left Afghanistan at 17. Won two scholarships that fund fewer than
            1 in 5 applicants: UNHCR's DAFI and Turkey's YTB Burslari (~4%
            acceptance). Studied Aviation Management at Kocaeli University,
            wrote my thesis mapping digital maturity across 10+ airport
            systems, and graduated with High Honors. That thesis taught me
            as-is vs. to-be analysis, gap identification, and stakeholder
            alignment. It turned out to be the same work I'd do years later as
            a Business Systems Analyst at an S&amp;P 500 REIT.
          </p>
          <p>
            Before I left Turkey, the CEO of ConnectionHub recruited me to
            build education technology for refugees. I led a 14-person team
            plus 13 city coordinators and owned 5 web properties, shipping a
            greenfield platform to about 200 students inside an organization
            that reached 1,182 students and 9,447 learning hours across 5
            countries, all on a 15-tool free-tier stack. Every requirements
            document, every database schema, every deployment. I authored it,
            built it, or shipped it. That's where I learned that constraints
            don't limit design. They clarify it.
          </p>
          <p>
            In the U.S., I joined Equity Residential as a Sales Consultant. At
            a 400-unit property during a major renovation, I lived inside the
            systems I'd later be asked to fix. I felt every friction point,
            tracked every data discrepancy, and built VBA automation because
            no vendor tool existed for what I needed. I won Leasing Consultant
            of the Year. Not because I was the best salesperson, but because I
            understood the systems better than anyone selling with them.
          </p>
          <p>
            After my Master's at BU Questrom (Director's Honors List, three
            times), Equity brought me back into the corporate technology
            organization as an IT Business Systems Analyst. I managed an Azure
            B2C authentication migration across seven teams and 135,000+
            accounts, authored 5 FRDs for multi-state fee transparency
            compliance, and wrote SQL four hours a day across 9 API
            integrations. I didn't just document requirements. I validated
            them in the data, tested them in production, and owned them
            through deployment.{" "}
            <strong className="font-medium text-ink">
              Nothing broke when it went live.
            </strong>
          </p>
          <p>
            Now I'm the Business Systems Manager (contract) at the Afghan
            Human Right Center, and I build applied AI products independently:
            one product live, three in active development, five ML models I
            trained myself, and research on LLM reliability under peer review
            at Springer's Empirical Software Engineering. I completed
            Cornell's AI 360 certificate in 2026. The thread through all of
            it: I notice where systems fail, I dig into why, and I build
            what's needed to fix them.
          </p>
        </section>

        <div className="asterism" aria-hidden="true">
          &#8258;
        </div>

        {/* Three pillars, as ruled prose */}
        <section aria-labelledby="about-different">
          <h2 id="about-different" className="mb-6">
            What makes me different
          </h2>
          <div className="prose-measure">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`py-6 ${
                  index < pillars.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <h3 className="mb-2">{pillar.title}</h3>
                <p className="text-ink-soft">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="asterism" aria-hidden="true">
          &#8258;
        </div>

        {/* Fun facts, single source */}
        <section aria-labelledby="about-facts">
          <h2 id="about-facts" className="mb-6">
            A few things about me
          </h2>
          <dl className="facts prose-measure">
            {facts.map((fact) => (
              <div key={fact.term} className="contents">
                <dt>{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="asterism" aria-hidden="true">
          &#8258;
        </div>

        {/* Sign-off */}
        <section aria-label="Sign-off" className="prose-measure">
          <p>
            If the problem you're hiring for sounds anything like the work
            above, email is the fastest way to reach me:{" "}
            <a href={`mailto:${email}`} className="link">
              {email}
            </a>
            .
          </p>
          <p className="mt-6">Thanks for reading,</p>
          <p className="mt-1 font-display text-2xl italic">M. Hadi Yaqoobi</p>
          <p className="mt-1 font-serif italic text-ink-soft">
            Boston, Massachusetts
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
