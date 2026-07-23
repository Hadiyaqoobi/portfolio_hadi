import { useRef, useEffect, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SKILLS,
  PROJECTS,
  CERTS,
  DOMAIN_LABELS,
  YEARS_FOOTNOTE,
  projectsForSkill,
  certsForSkill,
  certCountForSkill,
  type Domain,
} from "@/data/skillmap";
import { ai360ForSkill, AI360_PROJECTS } from "@/data/ai360-projects";

type Filter = "all" | Domain;
type Tab = "proj" | "course" | "cert";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All domains" },
  { key: "data", label: "Data & SQL" },
  { key: "ai", label: "AI / ML" },
  { key: "cloud", label: "Cloud & Security" },
  { key: "ba", label: "Business & Delivery" },
];

const CANVAS_FONT = 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, system-ui, sans-serif';

export const SkillMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<string | null>(null);
  const [domain, setDomain] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("proj");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ selected, domain, query: "", hover: null as string | null });
  const selectRef = useRef<(id: string | null) => void>(() => {});
  const drawRef = useRef<() => void>(() => {});

  const select = useCallback(
    (id: string | null) => {
      setSelected(id);
      setTab("proj");
      const next = new URLSearchParams(searchParams);
      if (id) next.set("s", id);
      else next.delete("s");
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );
  selectRef.current = select;

  // Deep link: select the skill named in ?s= on first mount.
  useEffect(() => {
    const s = searchParams.get("s");
    if (s && SKILLS.some((k) => k.id === s)) setSelected(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mirror React state into the ref the draw routine reads, then redraw.
  useEffect(() => {
    stateRef.current.selected = selected;
    stateRef.current.domain = domain;
    stateRef.current.query = query.toLowerCase();
    drawRef.current();
  }, [selected, domain, query]);

  // Canvas: set up once. The map is a static drawing that re-renders only on
  // state change, hover change, or resize. No animation loop.
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Read the design tokens once; components never hardcode token values.
    const css = getComputedStyle(document.documentElement);
    const C = {
      line: css.getPropertyValue("--line").trim(),
      ink: css.getPropertyValue("--ink").trim(),
      inkSoft: css.getPropertyValue("--ink-soft").trim(),
      accent: css.getPropertyValue("--accent").trim(),
      paperRaised: css.getPropertyValue("--paper-raised").trim(),
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    const resize = () => {
      const r = parent.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const nodeR = (s: (typeof SKILLS)[number]) => {
      const ev = projectsForSkill(s.id).length + certsForSkill(s.id).length + ai360ForSkill(s.id).length;
      return 11 + Math.min(ev, 12) * 0.95; // capped so high-connectivity nodes stay tidy
    };
    const visible = (s: (typeof SKILLS)[number]) => {
      const st = stateRef.current;
      const okD = st.domain === "all" || s.domain === st.domain;
      const okQ = !st.query || s.name.toLowerCase().includes(st.query);
      return okD && okQ;
    };
    // skills that share at least one project, certificate, or coursework item
    const relatedSet = (id: string) => {
      const set = new Set<string>();
      const add = (arr: { skills: string[] }[]) => {
        for (const it of arr) {
          if (it.skills.includes(id)) it.skills.forEach((s) => s !== id && set.add(s));
        }
      };
      add(PROJECTS);
      add(CERTS);
      add(AI360_PROJECTS);
      return set;
    };

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const st = stateRef.current;
      const sel = st.selected ? SKILLS.find((k) => k.id === st.selected) : null;
      const related = sel ? relatedSet(sel.id) : null;

      // faint same-domain mesh, hairline color
      ctx.strokeStyle = C.line;
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 1;
      for (let i = 0; i < SKILLS.length; i++) {
        for (let j = i + 1; j < SKILLS.length; j++) {
          const a = SKILLS[i];
          const b = SKILLS[j];
          if (a.domain === b.domain) {
            ctx.beginPath();
            ctx.moveTo(a.x * W, a.y * H);
            ctx.lineTo(b.x * W, b.y * H);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // edges from the selected skill to the skills it shares work with
      if (sel && related) {
        ctx.strokeStyle = C.inkSoft;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1.2;
        for (const b of SKILLS) {
          if (!related.has(b.id) || !visible(b)) continue;
          ctx.beginPath();
          ctx.moveTo(sel.x * W, sel.y * H);
          ctx.lineTo(b.x * W, b.y * H);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // skill nodes (3 states: selected / related / dimmed)
      for (const s of SKILLS) {
        const vis = visible(s);
        const on = st.selected === s.id;
        const rel = !!(related && related.has(s.id));
        const hv = st.hover === s.id;
        const r = nodeR(s);

        let alpha = 1;
        if (!vis) alpha = 0.15;
        else if (sel && !on && !rel) alpha = 0.35;
        ctx.globalAlpha = alpha;

        ctx.fillStyle = on ? C.accent : C.paperRaised;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = on ? C.accent : hv || rel ? C.inkSoft : C.line;
        ctx.lineWidth = on ? 1.5 : 1;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = on ? C.ink : rel || hv ? C.ink : C.inkSoft;
        ctx.font = `${on ? "600" : "400"} 12px ${CANVAS_FONT}`;
        ctx.textAlign = "center";
        ctx.fillText(s.name, s.x * W, s.y * H + r + 15);
        ctx.globalAlpha = 1;
      }
    }

    drawRef.current = draw;

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const pick = (mx: number, my: number) => {
      for (const s of SKILLS) {
        if ((s.x * W - mx) ** 2 + (s.y * H - my) ** 2 < (nodeR(s) + 8) ** 2) return s.id;
      }
      return null;
    };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const hover = pick(e.clientX - r.left, e.clientY - r.top);
      if (hover !== stateRef.current.hover) {
        stateRef.current.hover = hover;
        canvas.style.cursor = hover ? "pointer" : "default";
        draw();
      }
    };
    const onClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      selectRef.current(pick(e.clientX - r.left, e.clientY - r.top));
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);

    return () => {
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  const skill = selected ? SKILLS.find((k) => k.id === selected) : null;
  const projects = skill ? projectsForSkill(skill.id) : [];
  const certs = skill ? certsForSkill(skill.id) : [];
  const certN = skill ? certCountForSkill(skill.id) : 0;
  const coursework = skill ? ai360ForSkill(skill.id) : [];

  const tabs: { key: Tab; n: number; label: string }[] = [
    { key: "proj", n: projects.length, label: "projects" },
    { key: "course", n: coursework.length, label: "coursework" },
    { key: "cert", n: certN, label: "certifications" },
  ];

  return (
    <div id="skill-map">
      {/* Controls: domain filters + search */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setDomain(f.key)}
            aria-pressed={domain === f.key}
            aria-label={`Filter by ${f.label}`}
            className={`font-sans text-sm pb-0.5 border-b-2 transition-colors duration-150 ${
              domain === f.key
                ? "border-accent text-accent"
                : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search a skill, e.g. PyTorch"
          aria-label="Search skills"
          className="ml-auto font-sans text-sm text-ink placeholder:text-muted bg-paper-raised border border-line rounded-md px-3 py-1.5 min-w-[200px] focus:outline-none focus:border-ink transition-colors duration-150"
        />
      </div>

      {/* MAP */}
      <div className="relative border border-line bg-paper-raised rounded-md overflow-hidden h-[420px] sm:h-[500px]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-label="Interactive skill map. An accessible list of skills follows below."
        />
        <div className="absolute top-3 right-4 font-sans text-xs text-muted pointer-events-none">
          {selected ? "click another skill, or empty space to clear" : "click a skill node"}
        </div>
        <div className="absolute left-4 bottom-3 flex flex-wrap gap-x-3.5 gap-y-1 font-sans text-xs text-muted pointer-events-none max-w-[92%]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" /> selected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-ink-soft" /> shares work
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-line" /> other skills
          </span>
          <span>details appear below</span>
        </div>
      </div>

      {/* PANEL */}
      <div className="border border-line bg-paper-raised rounded-md p-5 sm:p-6 mt-4">
        {!skill ? (
          <div className="text-center px-4 py-10">
            <p className="font-sans text-sm text-ink">Select a skill on the map</p>
            <p className="font-sans text-sm text-muted mt-1">
              Its projects, coursework, and certifications appear here, and light up in the graph.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <p className="kicker">{DOMAIN_LABELS[skill.domain]}</p>
                <h3 className="mt-1">{skill.name}</h3>
              </div>
              <p className="font-sans text-sm text-ink-soft shrink-0">
                <span className="font-mono tabular-nums text-ink">{skill.years}+</span> years
              </p>
            </div>
            <p className="font-sans text-xs text-muted mt-2">{YEARS_FOOTNOTE}</p>

            {/* tabs = counts only, no invented depth meter */}
            <div className="flex gap-5 mt-5 border-b border-line" role="tablist" aria-label="Evidence for this skill">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  role="tab"
                  aria-selected={tab === t.key}
                  className={`pb-2 -mb-px border-b-2 font-sans text-sm transition-colors duration-150 ${
                    tab === t.key
                      ? "border-accent text-accent"
                      : "border-transparent text-ink-soft hover:text-ink"
                  }`}
                >
                  <span className="font-mono tabular-nums">{t.n}</span> {t.label}
                </button>
              ))}
            </div>

            <div className="max-h-[380px] overflow-y-auto">
              {tab === "proj" &&
                (projects.length ? (
                  projects.map((p) => {
                    const external = p.href?.startsWith("http");
                    const Tag = p.href ? "a" : "div";
                    return (
                      <Tag
                        key={p.id}
                        {...(p.href
                          ? { href: p.href, ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
                          : {})}
                        className={`block border-b border-line last:border-b-0 py-3 ${p.href ? "group" : ""}`}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span
                            className={`font-sans text-sm text-ink ${
                              p.href ? "group-hover:text-accent transition-colors duration-150" : ""
                            }`}
                          >
                            {p.name}
                            {external && (
                              <span className="text-xs text-muted ml-1.5" aria-hidden="true">
                                &#8599;
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="font-sans text-xs text-ink-soft mt-0.5">{p.metric}</div>
                      </Tag>
                    );
                  })
                ) : (
                  <p className="font-sans text-sm text-muted py-3">No mapped projects.</p>
                ))}

              {tab === "course" &&
                (coursework.length ? (
                  coursework.map((c) => (
                    <Link
                      key={c.id}
                      to="/projects/ai360"
                      className="group block border-b border-line last:border-b-0 py-3"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-sans text-sm text-ink group-hover:text-accent transition-colors duration-150">
                          {c.title}
                        </span>
                        <span className="font-sans text-xs text-muted shrink-0 whitespace-nowrap">Cornell AI &amp; ML 360</span>
                      </div>
                      <div className="font-sans text-xs text-ink-soft mt-0.5">
                        {c.track}
                        {c.artifact || c.notebookLinks ? " · artifact available" : ""}
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="font-sans text-sm text-muted py-3">No mapped coursework.</p>
                ))}

              {tab === "cert" &&
                (certs.length ? (
                  certs.map((c) => (
                    <a
                      key={c.id}
                      {...(c.pdf ? { href: c.pdf, target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`block border-b border-line last:border-b-0 py-3 ${c.pdf ? "group" : ""}`}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-sans text-sm text-ink">
                          <span className={c.pdf ? "group-hover:text-accent transition-colors duration-150" : ""}>
                            {c.name}
                          </span>
                          {c.count > 1 && (
                            <span className="font-mono tabular-nums text-xs text-muted ml-2">&times;{c.count}</span>
                          )}
                          {c.pdf && (
                            <span className="text-xs text-muted ml-1.5" aria-hidden="true">
                              &#8599;
                            </span>
                          )}
                        </span>
                        <span
                          className={`shrink-0 text-xs ${
                            c.planned ? "font-sans text-muted" : "font-mono tabular-nums text-ink-soft"
                          }`}
                        >
                          {c.year}
                        </span>
                      </div>
                      <div className="font-sans text-xs text-muted mt-0.5">{c.issuer}</div>
                    </a>
                  ))
                ) : (
                  <p className="font-sans text-sm text-muted py-3">No mapped certifications.</p>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Accessible, keyboard-navigable mirror of the map data (screen readers + tab) */}
      <ul className="sr-only">
        {SKILLS.map((s) => (
          <li key={s.id}>
            <button onClick={() => select(s.id)}>
              {s.name}, {DOMAIN_LABELS[s.domain]}, {s.years}+ years, {projectsForSkill(s.id).length} projects,{" "}
              {certCountForSkill(s.id)} certifications
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
