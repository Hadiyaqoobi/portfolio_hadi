import { useRef, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { ExternalLink, FileText, Search } from "lucide-react";
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

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All domains" },
  { key: "data", label: "Data & SQL" },
  { key: "ai", label: "AI / ML" },
  { key: "cloud", label: "Cloud & Security" },
  { key: "ba", label: "Business & Delivery" },
];

export const SkillMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<string | null>(null);
  const [domain, setDomain] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"proj" | "course" | "cert">("proj");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ selected, domain, query: "", hover: null as string | null });
  const selectRef = useRef<(id: string | null) => void>(() => {});
  const drawRef = useRef<() => void>(() => {});
  const reduceRef = useRef(false);

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

  // Mirror React state into the ref the draw loop reads.
  useEffect(() => {
    stateRef.current.selected = selected;
    stateRef.current.domain = domain;
    stateRef.current.query = query.toLowerCase();
    if (reduceRef.current) drawRef.current();
  }, [selected, domain, query]);

  // Canvas: set up once.
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let t = 0;
    let raf = 0;

    const resize = () => {
      const r = parent.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceRef.current) draw();
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
      if (!reduceRef.current) t += 0.016;
      ctx.clearRect(0, 0, W, H);
      const st = stateRef.current;
      const sel = st.selected ? SKILLS.find((k) => k.id === st.selected) : null;
      const related = sel ? relatedSet(sel.id) : null;

      // faint same-domain mesh
      ctx.strokeStyle = "rgba(96,165,250,0.045)";
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

      // edges from the selected skill to the skills it shares work with
      if (sel && related) {
        for (const b of SKILLS) {
          if (!related.has(b.id) || !visible(b)) continue;
          const g = ctx.createLinearGradient(sel.x * W, sel.y * H, b.x * W, b.y * H);
          g.addColorStop(0, "rgba(96,165,250,0.6)");
          g.addColorStop(1, "rgba(96,165,250,0.14)");
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(sel.x * W, sel.y * H);
          ctx.lineTo(b.x * W, b.y * H);
          ctx.stroke();
        }
      }

      // skill nodes (3 states: selected / related / dimmed)
      for (const s of SKILLS) {
        const vis = visible(s);
        const on = st.selected === s.id;
        const rel = !!(related && related.has(s.id));
        const hv = st.hover === s.id;
        const wobble = reduceRef.current ? 0 : Math.sin(t * 2 + s.x * 9) * 1.0;
        const r = nodeR(s) + wobble;

        let alpha = 1;
        if (!vis) alpha = 0.1;
        else if (sel && !on && !rel) alpha = 0.24;
        ctx.globalAlpha = alpha;

        if (on) {
          ctx.shadowColor = "rgba(59,130,246,0.9)";
          ctx.shadowBlur = 28;
          ctx.fillStyle = "#3B82F6";
        } else if (hv || rel) {
          ctx.shadowColor = "rgba(59,130,246,0.6)";
          ctx.shadowBlur = 15;
          ctx.fillStyle = "#2f5fd0";
        } else {
          ctx.shadowColor = "rgba(59,130,246,0.3)";
          ctx.shadowBlur = 8;
          ctx.fillStyle = "#1e3a8a";
        }
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, r, 0, 7);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = on ? "#bfdbfe" : rel ? "rgba(147,197,253,0.7)" : "rgba(96,165,250,0.35)";
        ctx.lineWidth = on ? 2 : 1;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, r, 0, 7);
        ctx.stroke();

        ctx.fillStyle = on ? "#ffffff" : sel && !on && !rel ? "#56657f" : "#cbd5e1";
        ctx.font = `${on ? "700" : "600"} 12px Inter, ui-sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(s.name, s.x * W, s.y * H + r + 15);
        ctx.globalAlpha = 1;
      }
    }

    drawRef.current = draw;

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    if (reduceRef.current) draw();
    else raf = requestAnimationFrame(loop);

    const pick = (mx: number, my: number) => {
      for (const s of SKILLS) {
        if ((s.x * W - mx) ** 2 + (s.y * H - my) ** 2 < (nodeR(s) + 8) ** 2) return s.id;
      }
      return null;
    };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      stateRef.current.hover = pick(e.clientX - r.left, e.clientY - r.top);
      canvas.style.cursor = stateRef.current.hover ? "pointer" : "default";
      if (reduceRef.current) draw();
    };
    const onClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      selectRef.current(pick(e.clientX - r.left, e.clientY - r.top));
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
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

  return (
    <div id="skill-map">
      {/* Controls: domain filters + search */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setDomain(f.key)}
            aria-pressed={domain === f.key}
            aria-label={`Filter by ${f.label}`}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              domain === f.key
                ? "border-blue-500 text-blue-300 bg-blue-500/10"
                : "border-slate-700 text-slate-400 hover:text-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
        <div className="relative ml-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search a skill, e.g. PyTorch"
            aria-label="Search skills"
            className="bg-slate-900/60 border border-slate-700 rounded-full text-sm text-slate-200 pl-9 pr-4 py-2 min-w-[210px] focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4 items-stretch">
      {/* MAP */}
      <div className="relative glass-card overflow-hidden h-[420px] lg:h-auto lg:min-h-[600px]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" role="img" aria-label="Interactive skill map. An accessible list of skills follows below." />
        <div className="absolute top-3 right-4 text-[11px] text-slate-500 pointer-events-none">
          {selected ? "click another skill, or empty space to clear" : "click a skill node"}
        </div>
        <div className="absolute left-4 bottom-3 flex flex-wrap gap-x-3.5 gap-y-1 text-[11px] text-slate-500 pointer-events-none max-w-[92%]">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> selected</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#2f5fd0" }} /> shares work</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-950" /> other skills</span>
          <span className="text-slate-600">details on the right →</span>
        </div>
      </div>

      {/* PANEL */}
      <div className="glass-card p-6 lg:min-h-[600px] flex flex-col">
        {!skill ? (
          <div className="m-auto text-center text-slate-500 px-4">
            <div className="text-4xl text-blue-500 mb-3">◉</div>
            <div className="text-slate-300 font-semibold text-[15px]">Select a skill on the map</div>
            <div className="text-[13px] mt-1.5 leading-relaxed">
              Its projects and certifications appear here, and light up in the graph.
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-400 mb-1">
                  {DOMAIN_LABELS[skill.domain]}
                </div>
                <div className="text-2xl font-bold text-slate-100 tracking-[-0.02em]">{skill.name}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl font-bold text-blue-400">{skill.years}+</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">years</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">{YEARS_FOOTNOTE}</p>

            {/* tabs = counts only, no invented depth meter */}
            <div className="flex gap-2 mt-5" role="tablist" aria-label="Evidence for this skill">
              <button
                onClick={() => setTab("proj")}
                role="tab"
                aria-selected={tab === "proj"}
                className={`flex-1 rounded-lg border py-2 text-[11px] font-semibold transition-colors ${
                  tab === "proj" ? "border-blue-500 text-blue-300 bg-blue-500/10" : "border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="block text-lg text-slate-100">{projects.length}</span>
                projects
              </button>
              <button
                onClick={() => setTab("course")}
                role="tab"
                aria-selected={tab === "course"}
                className={`flex-1 rounded-lg border py-2 text-[11px] font-semibold transition-colors ${
                  tab === "course" ? "border-blue-500 text-blue-300 bg-blue-500/10" : "border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="block text-lg text-slate-100">{coursework.length}</span>
                coursework
              </button>
              <button
                onClick={() => setTab("cert")}
                role="tab"
                aria-selected={tab === "cert"}
                className={`flex-1 rounded-lg border py-2 text-[11px] font-semibold transition-colors ${
                  tab === "cert" ? "border-blue-500 text-blue-300 bg-blue-500/10" : "border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="block text-lg text-slate-100">{certN}</span>
                certs
              </button>
            </div>

            <div className="mt-3 overflow-y-auto scrollbar-thin flex-1 pr-1 min-h-[180px]">
              {tab === "proj" &&
                (projects.length ? (
                  projects.map((p) => {
                    const external = p.href?.startsWith("http");
                    const Tag = p.href ? "a" : "div";
                    return (
                      <Tag
                        key={p.id}
                        {...(p.href ? { href: p.href, ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}) } : {})}
                        className={`block border border-slate-700 rounded-xl px-4 py-3 mb-2.5 bg-slate-900/40 transition-all ${
                          p.href ? "hover:border-slate-500 hover:translate-x-0.5 cursor-pointer" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-[13px] font-semibold text-slate-200">{p.name}</span>
                          {p.href && <ExternalLink size={13} className="text-slate-500 mt-0.5 shrink-0" />}
                        </div>
                        <div className="text-[11.5px] text-blue-300 font-semibold mt-1">{p.metric}</div>
                      </Tag>
                    );
                  })
                ) : (
                  <div className="text-slate-500 text-[13px] px-1 py-3">No mapped projects.</div>
                ))}

              {tab === "course" &&
                (coursework.length ? (
                  coursework.map((c) => (
                    <a
                      key={c.id}
                      href="/projects/ai360"
                      className="block border border-slate-700 rounded-xl px-4 py-3 mb-2.5 bg-slate-900/40 transition-all hover:border-slate-500 hover:translate-x-0.5 cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[13px] font-semibold text-slate-200">{c.title}</span>
                        <span className="text-[10px] font-bold text-sky-300 shrink-0 whitespace-nowrap">▲ AI 360</span>
                      </div>
                      <div className="text-[11.5px] text-slate-500 mt-1">
                        {c.track}
                        {c.artifact || c.notebookLinks ? " · artifact available" : ""}
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-slate-500 text-[13px] px-1 py-3">No mapped coursework.</div>
                ))}

              {tab === "cert" &&
                (certs.length ? (
                  certs.map((c) => (
                    <a
                      key={c.id}
                      {...(c.pdf ? { href: c.pdf, target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`block border rounded-xl px-4 py-3 mb-2.5 bg-slate-900/40 transition-all ${
                        c.planned ? "border-dashed border-slate-600 opacity-80" : "border-slate-700"
                      } ${c.pdf ? "hover:border-slate-500 hover:translate-x-0.5 cursor-pointer" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[13px] font-semibold text-slate-200">
                          {c.name}
                          {c.count > 1 && (
                            <span className="ml-2 align-middle text-[9.5px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-1.5 py-0.5">
                              ×{c.count}
                            </span>
                          )}
                        </span>
                        <span className={`text-[11px] font-bold shrink-0 ${c.planned ? "text-slate-500" : "text-emerald-300"}`}>
                          {c.planned ? "PLANNED" : c.year}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11.5px] text-slate-500 mt-1">
                        {c.pdf && <FileText size={11} />}
                        {c.issuer}
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-slate-500 text-[13px] px-1 py-3">No mapped certifications.</div>
                ))}
            </div>
          </div>
        )}
      </div>

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
