import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { portfolioData } from "@/data/portfolio-data";

/* The About page as a letter — the part a resume can't hold. Content is
   honesty-checked against the master files: no "zero critical incidents,"
   no "co-authored the BRD/5 FRDs," documented 285 learners (not 1,182),
   fine-tuned (not trained from scratch), paper "under review" (not published).
   The refugee background is framed as a differentiator, competence-forward,
   never a bid for sympathy. */

const pillars = [
  {
    title: "Systems Thinker Who's Been the End User",
    description:
      "I've been the leasing consultant using the CRM at 9 PM during a renovation, the refugee working through a broken education process, the analyst writing SQL for hours to check whether the vendor's numbers were actually right. I've stood at every layer of them.",
  },
  {
    title: "Builder, Not Advisor",
    description:
      "I don't hand over a recommendation and wait for someone else to build it. Web platforms shipped on free-tier tools. A SQL reconciliation harness checking 960 data points to catch mis-billing. An Azure migration across six teams where I owned the validation and the stabilization. Automation I wrote myself because no product existed for it. When something needs to exist, I make it exist.",
  },
  {
    title: "Constraint-Driven Design",
    description:
      "Volunteer teams, 2G connections, construction-disrupted properties, six time zones, near-zero budgets. My best work happens under real constraints — they force me to find what actually matters and cut the rest.",
  },
];

const facts = [
  {
    term: "3 countries, 2 continents",
    detail:
      "Afghanistan, Turkey, and the United States. Each one taught me that constraints look different depending on who's facing them.",
  },
  {
    term: "5 languages",
    detail:
      "Dari (native), Hazaragi, Turkish, Pashto, English. Enough German to order coffee. Every new one changed how I hear a requirement.",
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

      <main className="mx-auto w-full max-w-3xl px-5 sm:px-6 pt-10 sm:pt-14 pb-16 prose-letter">
        {/* Letterhead */}
        <header className="border-b border-line pb-6">
          <h1>Background</h1>
        </header>

        <p className="mt-6 mb-8 text-right font-serif italic text-ink-soft">
          Boston, 2026
        </p>

        {/* The letter */}
        <section aria-label="Introduction" className="prose-measure space-y-5">
          <p>
            If you're reading this, my resume is probably open in another tab.
            This is the part it can't hold.
          </p>
          <p>
            I find where a system is failing, dig into why, and build the fix.
            That's shown up as business systems analysis at an S&amp;P 500
            company, and now as AI systems I architect from
            the requirements up — data and AI are just the two tools I reach for
            most. But the instinct behind it started long before either.
          </p>
          <p>
            I left Afghanistan at seventeen and rebuilt from zero, in a country
            that wasn't mine and a language I didn't have yet. I won two
            scholarships — the UN's
            DAFI and Turkey's YTB — and studied Aviation Management at Kocaeli
            University, where my thesis mapped digital maturity across a dozen
            airport systems. That thesis was as-is versus to-be analysis, gap
            finding, stakeholder alignment. The same work I'd do years later as a
            business systems analyst at an S&amp;P 500 company. I just didn't
            know it yet.
          </p>
          <p>
            Before I left Turkey, I built the technology behind an education
            platform for refugees — a Salesforce data model, a localized site,
            the whole curriculum operation, all on free-tier tools. It reached
            285 learners across 753 enrollments. That's where I learned the thing
            I still believe: constraints don't limit design. They clarify it.
          </p>
          <p>
            In the U.S. I started at Equity Residential on the front line, as a
            leasing consultant, inside a 400-unit property in the middle of a
            renovation. I lived inside the systems I'd later be asked to fix. I
            felt every broken workflow, tracked every data discrepancy, and built
            my own automation when no tool existed for what I needed. I won
            Leasing Consultant of the Year — not for selling, but for
            understanding the systems better than anyone selling with them.
          </p>
          <p>
            After my master's at Boston University, Equity brought me back, a
            boomerang rehire, this time into corporate IT as an IT Business
            Systems Analyst on the Marketing Technology team. I was the analyst
            for the customer-facing platforms: the resident portal and its iOS and
            Android apps, the online application and leasing system, the resident
            payment integrations, and the Azure AD B2C identity layer behind them.
            On each project I ran the full lifecycle — gathering requirements,
            writing the BRDs and FRDs, coordinating the build with the
            developers, and supporting each system in production after launch.
            SQL filled hours of every day: reconciling utility billing to catch
            mis-billing (a harness I built checks 80 charge-code and bedroom
            combinations across 12 months against the ledger, 960 points in
            all), pulling the data business partners needed, validating
            requirements in the data itself. When 135,000 resident accounts moved
            onto Azure AD B2C across six teams, I owned the validation, the
            readiness reporting, and the stabilization after go-live.
          </p>
          <p>
            Now I'm the Business Systems Manager, on contract, at the Afghan
            Human Right Center, where I architected an AI system that classifies
            human-rights reports — built and close to launch. I own the design;
            my team writes the code. Alongside it I fine-tuned five models, one of
            which cut Dari speech-recognition word error rate from 57.8% to
            27.3% (measured on held-out synthetic data), and wrote
            a paper — under review at Springer's Empirical Software Engineering —
            about a failure I ran into head-on: a small model handed me a result
            that looked statistically airtight and was completely fabricated.
            These were my own models, and I learned to distrust their numbers.
            I finished Cornell's AI and Machine Learning 360 certificate the
            same year.
          </p>

          <p className="font-serif italic text-ink-soft pt-2">
            Here's the thread that runs through all of it.
          </p>
          <p>
            You'll see strong candidates for any role I apply to, and I'm one of
            them — a STEM master's from Boston University, applied AI from
            Cornell, an NYU computer-science MicroBachelors certificate through edX, real systems shipped.
            What I bring on top of that is something no transcript shows. I spent
            my most formative years making high-stakes, irreversible decisions
            with no safety net, and building anyway. It taught me to own the
            whole problem, and to make things work with far less than everyone
            said I needed.
          </p>
          <p>
            I used to point that mind at one question: how do I get through the
            next uncertain week? I point it at a different one now — how does this
            system hold, how does this ship, how does this company come out ahead
            when the ground is moving. Same instinct, bigger arena. I won't
            oversell it: hardship isn't a superpower, and I'm not going to tell
            you it made me smarter. It's what surviving it built in me — and the
            work above is the proof it transferred.
          </p>
        </section>

        <div className="asterism" aria-hidden="true">
          &#8258;
        </div>

        {/* How I work — three operating principles */}
        <section aria-labelledby="about-how">
          <h2 id="about-how" className="mb-6">
            How I work
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
            If the problem you're hiring for sounds anything like the work above,
            email is the fastest way to reach me:{" "}
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
