import { useCallback, useEffect, useRef, useState } from "react";

/* Shared hooks for the spec-document homepage (see design handoff README). */

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* Reading progress (0..1) + index of the last section whose top <= 150px. */
export function useReadingProgress(sectionIds: string[]) {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      let active = 0;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) active = i;
      });
      setActiveIndex(active);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  return { progress, activeIndex };
}

/* Scroll reveal with the CRITICAL 1500ms force-reveal fallback: without it,
   environments where the scroll container is not `window` never reveal. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    const el = ref.current;
    if (!el) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    const fallback = window.setTimeout(() => setRevealed(true), 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [revealed]);

  return { ref, revealed };
}

/* Props for a revealed block: sections/figures fade-up on reveal. */
export function revealStyle(revealed: boolean): React.CSSProperties {
  return {
    opacity: revealed ? 1 : 0,
    transform: revealed ? "none" : "translateY(18px)",
    transition:
      "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
  };
}

/* Count-up: animates 0 -> target over ~1.7s with cubic ease-out once active.
   Renders the final value immediately under reduced motion. */
export function useCountUp(
  target: number,
  opts: { active: boolean; decimals?: number; comma?: boolean; reduced?: boolean }
) {
  const { active, decimals = 0, comma = false, reduced = false } = opts;
  const [value, setValue] = useState(reduced ? target : 0);
  const started = useRef(false);

  const fmt = useCallback(
    (v: number) => {
      const fixed = v.toFixed(decimals);
      return comma ? Number(fixed).toLocaleString("en-US") : fixed;
    },
    [decimals, comma]
  );

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    if (reduced) {
      setValue(target);
      return;
    }
    const t0 = performance.now();
    const dur = 1700;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduced]);

  return fmt(value);
}

/* Decode line: scramble then resolve left-to-right, one char per ~26ms. */
export function useDecode(finalText: string, reduced: boolean) {
  const [text, setText] = useState(reduced ? finalText : "");
  useEffect(() => {
    if (reduced) {
      setText(finalText);
      return;
    }
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let resolved = 0;
    const id = window.setInterval(() => {
      resolved += 1;
      const out = finalText
        .split("")
        .map((c, i) => {
          if (i < resolved || c === " " || c === "/") return c;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setText(out);
      if (resolved >= finalText.length) window.clearInterval(id);
    }, 26);
    return () => window.clearInterval(id);
  }, [finalText, reduced]);
  return text;
}

/* Keyboard nav: J/K next/prev section, 1-6 jump. Never preventDefault. */
export function useKeyboardNav(sectionIds: string[], activeIndex: number) {
  useEffect(() => {
    const jump = (i: number) => {
      const el = document.getElementById(sectionIds[i]);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top, behavior: "smooth" });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "j" || e.key === "J") {
        jump(Math.min(sectionIds.length - 1, activeIndex + 1));
      } else if (e.key === "k" || e.key === "K") {
        jump(Math.max(0, activeIndex - 1));
      } else {
        // Digit d jumps to §0d, so the printed section number and the key match.
        const n = parseInt(e.key, 10);
        if (!isNaN(n) && n >= 0 && n < sectionIds.length) jump(n);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sectionIds, activeIndex]);
}
