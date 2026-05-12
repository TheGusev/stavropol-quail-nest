import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { pickTip, type Tip } from "@/lib/mascot-tips";

export type Stage = "egg" | "wobble" | "crack-1" | "crack-2" | "peek" | "hatched";

type MascotState = {
  stage: Stage;
  tip: Tip | null;
  showTip: (tip?: Tip) => void;
  hideTip: () => void;
  reducedMotion: boolean;
};

const Ctx = createContext<MascotState | null>(null);

// Прогресс скролла (0..1) → стадия. Универсально для десктопа/мобилки.
const PROGRESS_THRESHOLDS: Array<[number, Stage]> = [
  [0, "egg"],
  [0.05, "wobble"],
  [0.20, "crack-1"],
  [0.40, "crack-2"],
  [0.65, "peek"],
  [0.90, "hatched"],
];
const STAGE_ORDER: Stage[] = PROGRESS_THRESHOLDS.map(([, s]) => s);

const STORAGE_KEY = "sp_mascot_hatched";

export function MascotProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [stage, setStage] = useState<Stage>("egg");
  const [tip, setTip] = useState<Tip | null>(null);
  const tipTimer = useRef<number | null>(null);
  const idleTimer = useRef<number | null>(null);

  // Initial: check sessionStorage and reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);

    const hatched = sessionStorage.getItem(STORAGE_KEY) === "1";
    if (hatched || mq.matches) {
      setStage("hatched");
    }
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Scroll-driven stage progression (по прогрессу 0..1, не по px)
  useEffect(() => {
    if (stage === "hatched") return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const doc = document.documentElement;
      const body = document.body;
      const docHeight = Math.max(doc.scrollHeight, body.scrollHeight);
      const viewport = window.innerHeight;
      const scrollable = docHeight - viewport;
      const y = window.scrollY || doc.scrollTop;
      // Если страница не скроллится — сразу вылупляем
      const progress = scrollable <= 4 ? 1 : Math.min(1, Math.max(0, y / scrollable));
      let next: Stage = "egg";
      for (const [t, s] of PROGRESS_THRESHOLDS) {
        if (progress >= t) next = s;
      }
      // Bottom guard: если фактически у футера — гарантируем hatched
      if (scrollable > 4 && y >= scrollable - 8) next = "hatched";
      setStage((prev) => {
        if (STAGE_ORDER.indexOf(next) > STAGE_ORDER.indexOf(prev)) return next;
        return prev;
      });
    };
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stage, location.pathname]);

  // Persist hatched
  useEffect(() => {
    if (stage === "hatched") {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // noop
      }
    }
  }, [stage]);

  const hideTip = () => {
    setTip(null);
    if (tipTimer.current) {
      clearTimeout(tipTimer.current);
      tipTimer.current = null;
    }
  };

  const showTip = (forced?: Tip) => {
    const t = forced ?? pickTip(location.pathname);
    setTip(t);
    if (tipTimer.current) clearTimeout(tipTimer.current);
    tipTimer.current = window.setTimeout(() => setTip(null), 7000);
  };

  // Show tip on route change once hatched
  useEffect(() => {
    if (stage !== "hatched") return;
    const id = window.setTimeout(() => {
      showTip();
    }, 1200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, stage]);

  // Idle tip rotation
  useEffect(() => {
    if (stage !== "hatched") return;
    const tick = () => {
      idleTimer.current = window.setTimeout(() => {
        if (!document.hidden) showTip();
        tick();
      }, 18000 + Math.random() * 10000);
    };
    tick();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  return (
    <Ctx.Provider value={{ stage, tip, showTip, hideTip, reducedMotion }}>
      {children}
    </Ctx.Provider>
  );
}

export function useMascot() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMascot must be inside MascotProvider");
  return v;
}
