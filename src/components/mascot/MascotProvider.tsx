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

const STAGE_THRESHOLDS: Array<[number, Stage]> = [
  [0, "egg"],
  [80, "wobble"],
  [250, "crack-1"],
  [500, "crack-2"],
  [800, "peek"],
  [1100, "hatched"],
];

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

  // Scroll-driven stage progression
  useEffect(() => {
    if (stage === "hatched") return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        let next: Stage = "egg";
        for (const [t, s] of STAGE_THRESHOLDS) {
          if (y >= t) next = s;
        }
        setStage((prev) => {
          // never regress
          const order = STAGE_THRESHOLDS.map((t) => t[1]);
          if (order.indexOf(next) > order.indexOf(prev)) return next;
          return prev;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stage]);

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
