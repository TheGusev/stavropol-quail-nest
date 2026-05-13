import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Egg, Chick } from "./Mascot";
import { useMascot } from "./MascotProvider";

// Локальный измеритель ширины текста
function measureTextWidth(text: string): number {
  if (typeof document === "undefined") return 0;
  const el = document.createElement("span");
  el.style.cssText =
    "position:absolute;visibility:hidden;white-space:nowrap;font:500 12px/16px system-ui,-apple-system,Segoe UI,sans-serif;left:-9999px;top:-9999px;";
  el.textContent = text;
  document.body.appendChild(el);
  const w = el.offsetWidth;
  document.body.removeChild(el);
  return w;
}

// Подсказка над цыплёнком (для мобильной нижней панели)
function MobileTip({
  text,
  reduced,
  anchorRef,
}: {
  text: string;
  reduced: boolean;
  anchorRef: RefObject<HTMLElement | null>;
}) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const textW = useRef(measureTextWidth(text));

  useLayoutEffect(() => {
    textW.current = measureTextWidth(text);
  }, [text]);

  useLayoutEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const a = anchorRef.current;
      if (!a) return;
      const ar = a.getBoundingClientRect();
      const margin = 8;
      const tw = textW.current;
      // Не помещается во вьюпорт по ширине — не показываем
      if (tw + margin * 2 > window.innerWidth) {
        setPos(null);
        return;
      }
      // Центрируем по цыплёнку, потом прижимаем к границам экрана
      let left = ar.left + ar.width / 2 - tw / 2;
      left = Math.max(margin, Math.min(window.innerWidth - tw - margin, left));
      const top = ar.top - 20;
      setPos({ top, left });
    };
    compute();
    const tick = () => {
      compute();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [anchorRef, text]);

  if (typeof document === "undefined") return null;
  if (!pos) return null;

  return createPortal(
    <motion.div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed z-[60] whitespace-nowrap rounded-md bg-background/95 px-2 py-1 text-[12px] font-medium leading-4 text-foreground shadow-md"
      style={{ top: pos.top, left: pos.left }}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.18, ease: "easeOut" }}
    >
      {text}
    </motion.div>,
    document.body,
  );
}

const CHICK_W = 38;
const EGG_W = 44;

/**
 * Маскот для мобильной версии — живёт в нижней панели (MobileBottomBar).
 * Цыплёнок ходит по ширине панели в зоне над иконками,
 * подсказки появляются над ним.
 */
export function MobileMascot() {
  const { stage, eggProgress, tip, showTip, reducedMotion } = useMascot();
  const trackRef = useRef<HTMLDivElement>(null);
  const chickBtnRef = useRef<HTMLButtonElement | null>(null);

  const [trackW, setTrackW] = useState(0);

  // Walking
  const [pos, setPos] = useState(0);
  const [target, setTarget] = useState(0);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [walkPhase, setWalkPhase] = useState(0);
  const [moving, setMoving] = useState(false);
  const [blink, setBlink] = useState(false);
  const [beakOpen, setBeakOpen] = useState(false);
  const [wingAngle, setWingAngle] = useState(0);
  const wingTargetRef = useRef(0);
  const wasMovingRef = useRef(false);
  const wingTimerRef = useRef<number | null>(null);
  const initRef = useRef(false);

  // Measure track width
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setTrackW(el.getBoundingClientRect().width);
    measure();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  const walkMin = 4;
  const walkMax = Math.max(walkMin + 24, trackW - CHICK_W - 4);

  // Initial position after hatch
  useEffect(() => {
    if (stage === "hatched" && trackW > 0 && !initRef.current) {
      const x = Math.round(walkMin + (walkMax - walkMin) * 0.6);
      setPos(x);
      setTarget(x);
      initRef.current = true;
    }
  }, [stage, trackW, walkMin, walkMax]);

  // Wing spring
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setWingAngle((cur) => {
        const t = wingTargetRef.current;
        const diff = t - cur;
        if (Math.abs(diff) < 0.1) return t;
        return cur + diff * 0.18;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const raiseWing = (raised: boolean) => {
    wingTargetRef.current = raised ? -38 : 0;
  };

  // Wander target
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion || trackW <= 0) return;
    const pick = () => {
      const t = Math.round(walkMin + Math.random() * (walkMax - walkMin));
      setTarget(t);
    };
    pick();
    const id = window.setInterval(pick, 4500 + Math.random() * 3500);
    return () => clearInterval(id);
  }, [stage, reducedMotion, trackW, walkMin, walkMax]);

  // Walk loop
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion || trackW <= 0) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(50, now - last) / 1000;
      last = now;

      setPos((p) => {
        const diff = target - p;
        const dist = Math.abs(diff);
        if (dist < 1) {
          if (moving) setMoving(false);
          return p;
        }
        if (!moving) setMoving(true);
        const dir = Math.sign(diff);
        setFacing(dir >= 0 ? 1 : -1);
        const speed = 46;
        const step = dir * Math.min(dist, speed * dt);
        const next = p + step;
        return Math.max(walkMin, Math.min(walkMax, next));
      });

      if (moving) setWalkPhase((w) => w + dt * 9);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage, target, moving, reducedMotion, trackW, walkMin, walkMax]);

  // Stop → maybe show tip
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion) return;
    if (wasMovingRef.current && !moving) {
      if (Math.random() < 0.65) {
        raiseWing(true);
        showTip();
        if (wingTimerRef.current) clearTimeout(wingTimerRef.current);
        wingTimerRef.current = window.setTimeout(() => raiseWing(false), 6500);
      }
    }
    wasMovingRef.current = moving;
  }, [moving, stage, reducedMotion, showTip]);

  useEffect(() => {
    if (!tip) {
      raiseWing(false);
      if (wingTimerRef.current) {
        clearTimeout(wingTimerRef.current);
        wingTimerRef.current = null;
      }
    }
  }, [tip]);

  // Blink
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion) return;
    let timeout: number;
    const loop = () => {
      timeout = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 130);
        loop();
      }, 1800 + Math.random() * 3200);
    };
    loop();
    return () => clearTimeout(timeout);
  }, [stage, reducedMotion]);

  // Chirp
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion) return;
    let timeout: number;
    const loop = () => {
      timeout = window.setTimeout(() => {
        setBeakOpen(true);
        window.setTimeout(() => setBeakOpen(false), 250);
        loop();
      }, 25000 + Math.random() * 15000);
    };
    loop();
    return () => clearTimeout(timeout);
  }, [stage, reducedMotion]);

  const onChickClick = () => {
    if (stage !== "hatched") return;
    if (!reducedMotion) {
      setBeakOpen(true);
      window.setTimeout(() => setBeakOpen(false), 300);
      raiseWing(true);
      if (wingTimerRef.current) clearTimeout(wingTimerRef.current);
      wingTimerRef.current = window.setTimeout(() => raiseWing(false), 6500);
    }
    showTip();
  };

  // Egg position from progress, rolling across the bar
  const eggMin = 8;
  const eggMax = Math.max(eggMin + 24, trackW - EGG_W - 8);
  const eggX = eggMin + eggProgress * (eggMax - eggMin);
  const rolling = (eggX - eggMin) * 1.4;

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-12 h-12"
      style={{ overflow: "visible" }}
    >
      {stage !== "hatched" && !reducedMotion && trackW > 0 && (
        <div
          className="absolute"
          style={{ left: eggX, top: -4, width: EGG_W }}
        >
          <Egg stage={stage} rolling={rolling} />
        </div>
      )}

      {stage === "hatched" && trackW > 0 && (
        <motion.button
          ref={(el) => {
            chickBtnRef.current = el;
          }}
          onClick={onChickClick}
          className="absolute cursor-pointer bg-transparent"
          style={{
            left: reducedMotion ? Math.round(walkMin + (walkMax - walkMin) * 0.6) : pos,
            top: 6,
            pointerEvents: "auto",
          }}
          initial={false}
          aria-label="Перепёлкин — нажмите, чтобы услышать совет"
        >
          <Chick
            facing={facing}
            walkPhase={reducedMotion ? 0 : walkPhase}
            blink={reducedMotion ? false : blink}
            beakOpen={reducedMotion ? false : beakOpen}
            wingAngle={wingAngle}
          />
        </motion.button>
      )}

      <AnimatePresence>
        {tip && stage === "hatched" && trackW > 0 && (
          <MascotTip text={tip.text} reduced={reducedMotion} anchorRef={chickBtnRef} />
        )}
      </AnimatePresence>
    </div>
  );
}
