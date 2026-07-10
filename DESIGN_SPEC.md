# Redesign v4 — Design Specification (B+A+C synthesis)

The single source of truth for the redesign. Every converted file must comply.
Direction (Hadi-ruled): the Analyst's Desk architecture + the Dossier's editorial
typography + the Letter's first-person voice. A person's site, not a product's.

## The idea

The site reads like a beautifully typeset professional dossier: warm paper,
serif headings, quiet rules, evidence in honest tables. Nothing floats, glows,
pulses, or counts up. A recruiter finds who/where/authorization/proof/contact
in the first screen. The design itself demonstrates the candidate: meticulous,
calm, verifiable.

## Tokens (defined in src/index.css — never hardcode these values in components)

Color (light theme only, committed choice):
- `--paper` #F7F4ED       page ground (warm paper)
- `--paper-raised` #FCFAF5 cards/surfaces (barely lighter, no shadows)
- `--line` #E2DCCE        hairline rules and borders
- `--ink` #2A2620         primary text (warm near-black)
- `--ink-soft` #5B5348    secondary text
- `--muted` #8A8072       captions, kickers
- `--accent` #7A2E22      oxblood — links, active states, small marks. THE only accent.
- `--accent-soft` #F2E6E2 accent wash for subtle backgrounds
- `--ok` #2F6B4F          only for genuine status (live product dot on Work page)

Tailwind classes are wired to these: `bg-paper`, `bg-paper-raised`, `border-line`,
`text-ink`, `text-ink-soft`, `text-muted`, `text-accent`, `bg-accent-soft`, `text-ok`.

Type:
- Display/headings: `font-display` → Fraunces (weights 550–650). h1 3rem/1.1,
  h2 1.75rem, h3 1.2rem. Letter-spacing normal (never negative tracking).
- Prose: `font-serif` → Newsreader 400/500 (+ real italics). Body 1.0625rem/1.65.
  Measure: max-w-[68ch] on running text.
- UI (nav, buttons, labels, tables, captions): `font-sans` (system humanist stack).
- Identifiers only (dates in tables, file names, ticket-ish numbers): `font-mono`,
  0.85em, `tabular-nums`. Never decorative mono.
- Kicker style: `.kicker` = font-sans 0.72rem uppercase tracking-[0.14em] text-muted.
  Use sparingly (one per section max).

## Hard bans (delete on sight while converting)

glass-card, gradient-text, btn-primary glow, hover translateY lifts, blur glow
blobs, pulsing dots (`animate-pulse`), count-up numbers (AnimatedNumber/BigNumber
animations → render the final number statically), the 7-color accent system
(indigo/violet/emerald/amber/rose/sky/cyan tints), ALL-CAPS eyebrow spam,
sub-11px text (minimum text size 0.75rem), `tracking-tight/-0.0Xem` on headings,
framer-motion whileInView translate/opacity choreography. framer-motion imports
should be removed entirely from converted files; if an element genuinely needs
a transition, use a CSS transition ≤200ms and respect prefers-reduced-motion.

Slate → new token mapping when converting classes:
bg-[#0F172A]/bg-slate-900 → bg-paper · bg-slate-800/.glass-card → bg-paper-raised
border + border-line · text-slate-100/white → text-ink · text-slate-300/400 →
text-ink-soft · text-slate-500 → text-muted · text-blue-400/indigo-400 →
text-accent · rounded-xl/2xl → rounded-md (6px) or none for tables.

## Components vocabulary (reuse these patterns, defined once)

- `.rule` — a 1px border-t border-line section divider with 4rem margins.
- `.facts` — definition list: dt = font-sans text-muted 0.8rem; dd = text-ink.
  Used for the identity block and any spec-like data.
- `.evidence-table` — plain table, th = kicker style, td = font-sans 0.9rem,
  hairline row rules, no zebra, no hover states, numbers font-mono tabular-nums.
- Links: text-accent underline underline-offset-4 decoration-[1.5px]
  decoration-accent/40, hover:decoration-accent. External links get a small ↗.
- Buttons (rare — Resume, Email): font-sans border border-ink text-ink px-4 py-2
  rounded-md hover:bg-ink hover:text-paper transition-colors. No filled accent CTAs.

## Page architecture

Navigation (all pages): left = "M. Hadi Yaqoobi" (font-display, plain text link).
Right = Work · About · Career · Contact + Resume (button style above). Mobile:
same five in a plain dropdown, no full-screen overlay theatrics. Footer (new,
all pages): one hairline rule, then font-sans 0.8rem muted: email · LinkedIn ·
GitHub · "Systems / Skills / Education / Research" secondary links · © 2026.

Homepage (Index) — replaces ALL eleven current sections with five:
1. Identity: h1 name (Fraunces), one line "IT Business Systems Analyst" +
   `.facts` list — Location: Boston, MA · Work authorization: U.S. permanent
   resident (Green Card), no sponsorship needed, now or later · Email (mailto) ·
   Resume (link to /resume.pdf) · LinkedIn. First screen, no scrolling needed.
2. Statement: the existing hero.description first paragraph rewritten stays in
   portfolio-data (do NOT change content claims) rendered as Newsreader prose.
3. The migration (the one big proof): prose narrative from existing verified
   copy + an `.evidence-table`: Accounts 135,000+ · Teams 6 · Phases 4 ·
   Critical incidents 0 · dates 2025-01-24 → 2025-02-17. Link to /projects.
4. Career line: compact list (years font-mono, role, org) — EQR IT BSA ·
   BU Admissions Analyst · EQR Leasing (award noted) · ConnectionHub · AHRC
   current. Link to /career.
5. Where AI fits: 3 short prose lines (AlphaSeekers live · 5 trained models ·
   Springer paper under review) with links. Subordinate placement, no cards.
Then contact line (email prominently) + footer. Delete from homepage:
HeroCodeLab, BigNumber, ImpactResults, HowIWork (moves to /career page bottom
if trivial, else just deleted from home), ProjectsSection, SkillMapTeaser,
SystemsTeaser, ResearchPublications (fold one line into section 5),
EngineeringFootprint, BugHunt (keep the component file; it moves to /projects
detail usage only if referenced there — otherwise unmounted), ContactCTA.

About — the Letter voice: dateline "Boston, July 2026", opens with the ruled
line: "If you're reading this, you most likely have my resume open in another
tab. This page is the part a resume can't hold." Then the existing About facts
in first person Newsreader prose (keep all current verified claims; Jaghori →
Istanbul → Boston arc as already written; award, boomerang, languages).
Asterism (⁂) dividers, centered, text-muted.

Career/Timeline — the existing timeline data rendered as a quiet vertical list:
year (font-mono muted) / title (font-sans 600) / org / 2-3 highlights as plain
list items. No cards, no icons, no color coding.

Projects (/projects, WorkLedger) — keep the ledger concept (it fits the Desk):
strip its dark styling to the token system; status becomes a small text label
(live = text-ok dot + "Live", others plain text); filters stay but styled as
quiet underline tabs, not pills.

Skills / Systems / Education / AI360 / MakerMind case study — same conversion:
tokens, typography, bans. Keep their information architecture; remove decorative
color systems; every stat rendered static.

Contact — `.facts` block + the working form (keep logic identical, restyle
inputs: font-sans, border-line, bg-paper-raised, focus:border-ink).

NotFound — plain: "This page doesn't exist." + link home. 

## Content rules

Content strings in src/data/* are ALREADY truth-passed: do not reword claims,
numbers, or titles while converting. Layout copy (section headings, labels,
microcopy) follows the style rules: no em-dashes, no exclamation marks, no
"leverage/seamless/robust/journey", first person, plain.

## Definition of done per file

- No banned pattern remains (grep: glass-card|gradient-text|animate-pulse|
  slate-|indigo|violet|#0F172A|motion\.|framer-motion|tracking-tight).
- Uses only token classes for color.
- `npm run build` passes.
- The page reads correctly at 375px and 1440px widths.
