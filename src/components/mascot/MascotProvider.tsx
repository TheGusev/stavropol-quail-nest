import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { pickTip, type Tip } from "@/lib/mascot-tips";

export type Stage = "egg" | "wobble" | "crack-1" | "crack-2" | "peek" | "hatched";

type MascotState = {
  stage: Stage;
  eggProgress: number;
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

const STAGE_KEY = "sp_mascot_stage";

function nextStageOf(s: Stage): Stage {
  const i = STAGE_ORDER.indexOf(s);
  return STAGE_ORDER[Math.min(STAGE_ORDER.length - 1, i + 1)];
}

export function MascotProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [stage, setStageRaw] = useState<Stage>("egg");
  const [tip, setTip] = useState<Tip | null>(null);
  const tipTimer = useRef<number | null>(null);
  const idleTimer = useRef<number | null>(null);
  const playoutTimer = useRef<number | null>(null);
  const stageRef = useRef<Stage>("egg");

  const setStage = (updater: Stage | ((prev: Stage) => Stage)) => {
    setStageRaw((prev) => {
      const next = typeof updater === "function" ? (updater as (p: Stage) => Stage)(prev) : updater;
      stageRef.current = next;
      try {
        sessionStorage.setItem(STAGE_KEY, next);
      } catch {
        // noop
      }
      return next;
    });
  };

  // Initial: check sessionStorage and reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);

    let initial: Stage | null = null;
    try {
      const saved = sessionStorage.getItem(STAGE_KEY) as Stage | null;
      if (saved && STAGE_ORDER.includes(saved)) initial = saved;
    } catch {
      // noop
    }
    if (mq.matches) {
      setStage("hatched");
    } else if (initial) {
      setStage(initial);
    }
    return () => mq.removeEventListener("change", onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // При reduced-motion — гарантировано hatched при любых раскладах
  useEffect(() => {
    if (reducedMotion && stageRef.current !== "hatched") setStage("hatched");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  // Scroll-driven stage progression + ResizeObserver + smooth playout
  useEffect(() => {
    if (stage === "hatched" || reducedMotion) return;

    let raf = 0;

    const cancelPlayout = () => {
      if (playoutTimer.current) {
        clearTimeout(playoutTimer.current);
        playoutTimer.current = null;
      }
    };

    const startPlayout = (from: Stage) => {
      if (playoutTimer.current) return; // уже идёт
      const step = (cur: Stage) => {
        if (cur === "hatched") {
          playoutTimer.current = null;
          return;
        }
        const nxt = nextStageOf(cur);
        playoutTimer.current = window.setTimeout(() => {
          setStage((prev) => (STAGE_ORDER.indexOf(nxt) > STAGE_ORDER.indexOf(prev) ? nxt : prev));
          step(nxt);
        }, 260);
      };
      step(from);
    };

    const compute = () => {
      raf = 0;
      const doc = document.documentElement;
      const body = document.body;
      const docHeight = Math.max(doc.scrollHeight, body.scrollHeight);
      const viewport = window.innerHeight;
      const scrollable = docHeight - viewport;
      const y = window.scrollY || doc.scrollTop;

      // Короткая страница — плавно «доигрываем» до hatched
      if (scrollable <= 4) {
        if (stageRef.current !== "hatched") startPlayout(stageRef.current);
        return;
      }

      cancelPlayout();
      const progress = Math.min(1, Math.max(0, y / scrollable));
      let target: Stage = "egg";
      for (const [t, s] of PROGRESS_THRESHOLDS) {
        if (progress >= t) target = s;
      }
      // Bottom guard
      if (y >= scrollable - 8) target = "hatched";

      setStage((prev) => {
        const prevIdx = STAGE_ORDER.indexOf(prev);
        const tgtIdx = STAGE_ORDER.indexOf(target);
        if (tgtIdx <= prevIdx) return prev;
        // Шаг максимум +1 за тик при обычной прокрутке (исключение — bottom guard)
        const stepIdx = target === "hatched" && y >= scrollable - 8 ? tgtIdx : Math.min(tgtIdx, prevIdx + 1);
        return STAGE_ORDER[stepIdx];
      });
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    // Перепроверяем после смены роута: ждём 1 RAF, чтобы новый layout успел отрендериться
    const initialId = window.setTimeout(schedule, 0);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(schedule);
      ro.observe(document.body);
    }

    return () => {
      clearTimeout(initialId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
      if (ro) ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      cancelPlayout();
    };
  }, [stage, reducedMotion, location.pathname]);

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

  // Сброс tip и пересчёт при смене страницы
  useEffect(() => {
    hideTip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // (Подсказка по смене роута больше не показывается автоматически —
  // её триггерит сам Mascot, когда птенец остановился. Для reduced-motion
  // показываем один раз после смены роута, т.к. птенец не ходит.)
  useEffect(() => {
    if (stage !== "hatched" || !reducedMotion) return;
    const id = window.setTimeout(() => showTip(), 400);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, stage, reducedMotion]);

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
