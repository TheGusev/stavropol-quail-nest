import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMascot, type Stage } from "./MascotProvider";

// ---------- Egg SVG ----------
function Egg({ stage, rolling }: { stage: Stage; rolling: number }) {
  const showCrack1 = stage === "crack-1" || stage === "crack-2" || stage === "peek";
  const showCrack2 = stage === "crack-2" || stage === "peek";
  const showPeek = stage === "peek";

  return (
    <svg
      viewBox="0 0 60 70"
      width="44"
      height="52"
      style={{ overflow: "visible", transform: `rotate(${rolling}deg)`, transformOrigin: "50% 60%" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="eggBody" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="oklch(0.97 0.04 80)" />
          <stop offset="60%" stopColor="oklch(0.88 0.05 78)" />
          <stop offset="100%" stopColor="oklch(0.72 0.06 70)" />
        </radialGradient>
        <radialGradient id="eggHL" cx="35%" cy="25%" r="20%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="66" rx="14" ry="2" fill="rgba(0,0,0,0.18)" />
      <path
        d="M30 4 C46 4 54 26 54 44 C54 58 44 66 30 66 C16 66 6 58 6 44 C6 26 14 4 30 4 Z"
        fill="url(#eggBody)"
        stroke="oklch(0.5 0.12 145)"
        strokeWidth="1"
      />
      {[
        [18, 22, 1.6],
        [38, 18, 1.2],
        [25, 30, 1.0],
        [42, 32, 1.8],
        [16, 40, 1.4],
        [33, 44, 1.1],
        [44, 50, 1.3],
        [22, 52, 1.5],
        [36, 58, 1.0],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="oklch(0.32 0.06 60)" opacity="0.7" />
      ))}
      <ellipse cx="22" cy="20" rx="7" ry="10" fill="url(#eggHL)" />
      {showCrack1 && (
        <path
          d="M14 30 L20 28 L24 32 L30 28 L34 33"
          stroke="oklch(0.25 0.04 60)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {showCrack2 && (
        <>
          <path
            d="M34 33 L40 30 L46 34 L48 28"
            stroke="oklch(0.25 0.04 60)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M22 18 L26 16 L30 20 L36 14"
            stroke="oklch(0.25 0.04 60)"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}
      {showPeek && (
        <>
          <path
            d="M14 22 Q30 -2 46 22 L46 26 Q30 14 14 26 Z"
            fill="url(#eggBody)"
            stroke="oklch(0.5 0.12 145)"
            strokeWidth="0.8"
            transform="translate(-2 -4) rotate(-8 30 18)"
          />
          <polygon points="28,20 32,20 30,24" fill="oklch(0.7 0.16 60)" />
          <circle cx="33" cy="18" r="1.2" fill="#1a1a1a" />
        </>
      )}
    </svg>
  );
}

// ---------- Chick SVG ----------
function Chick({
  facing,
  walkPhase,
  blink,
  beakOpen,
  wingAngle,
}: {
  facing: 1 | -1;
  walkPhase: number;
  blink: boolean;
  beakOpen: boolean;
  wingAngle: number; // в градусах, 0 — крыло прижато
}) {
  const bob = Math.abs(Math.sin(walkPhase)) * -2;
  const leftLeg = Math.sin(walkPhase) * 25;
  const rightLeg = -Math.sin(walkPhase) * 25;
  const shadowScale = 1 - Math.abs(Math.sin(walkPhase)) * 0.18;

  return (
    <svg
      viewBox="0 0 60 60"
      width="38"
      height="38"
      style={{ transform: `scaleX(${facing})`, overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="chickBody" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="oklch(0.95 0.10 88)" />
          <stop offset="55%" stopColor="oklch(0.86 0.13 82)" />
          <stop offset="100%" stopColor="oklch(0.72 0.14 72)" />
        </radialGradient>
        <radialGradient id="chickHead" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="oklch(0.96 0.10 88)" />
          <stop offset="100%" stopColor="oklch(0.78 0.14 78)" />
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="56" rx={14 * shadowScale} ry="2" fill="rgba(0,0,0,0.22)" />
      <g stroke="oklch(0.65 0.16 55)" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <g transform={`translate(25 ${48 + bob}) rotate(${leftLeg})`}>
          <line x1="0" y1="0" x2="0" y2="6" />
          <path d="M-2 6 L0 6 L2 6" />
        </g>
        <g transform={`translate(33 ${48 + bob}) rotate(${rightLeg})`}>
          <line x1="0" y1="0" x2="0" y2="6" />
          <path d="M-2 6 L0 6 L2 6" />
        </g>
      </g>
      <g transform={`translate(0 ${bob})`}>
        <ellipse cx="30" cy="40" rx="14" ry="12" fill="url(#chickBody)" stroke="oklch(0.6 0.12 70)" strokeWidth="0.6" />
        {/* Крыло — нативный SVG transform с поворотом вокруг точки крепления к телу (24, 40) */}
        <path
          d="M22 38 Q18 44 24 48 Q30 46 28 40 Z"
          fill="oklch(0.8 0.13 78)"
          stroke="oklch(0.55 0.1 70)"
          strokeWidth="0.5"
          transform={`rotate(${wingAngle} 24 40)`}
        />
        <path d="M42 36 Q47 36 46 40 Q44 39 42 40 Z" fill="oklch(0.78 0.13 75)" />
        <g transform={`translate(30 26)`}>
          <circle cx="0" cy="0" r="11" fill="url(#chickHead)" stroke="oklch(0.6 0.12 70)" strokeWidth="0.6" />
          {blink ? (
            <path d="M2 -1 Q5 0 8 -1" stroke="#1a1a1a" strokeWidth="1" fill="none" strokeLinecap="round" />
          ) : (
            <>
              <circle cx="5" cy="-1" r="2.2" fill="#1a1a1a" />
              <circle cx="5.8" cy="-1.8" r="0.8" fill="#fff" />
            </>
          )}
          {beakOpen ? (
            <polygon points="10,2 14,1 14,5 10,5" fill="oklch(0.7 0.16 55)" />
          ) : (
            <polygon points="10,1 14,3 10,5" fill="oklch(0.7 0.16 55)" />
          )}
          <circle cx="3" cy="3" r="1.4" fill="oklch(0.78 0.12 30)" opacity="0.5" />
          <path d="M-2 -10 Q0 -14 2 -10 Q1 -11 0 -10 Z" fill="oklch(0.7 0.13 70)" />
        </g>
      </g>
    </svg>
  );
}

// ---------- Tip — бегущая строка (marquee) ----------
type TipPos = { top: number; left: number; width: number };

function MascotTip({
  text,
  reduced,
  anchorRef,
}: {
  text: string;
  reduced: boolean;
  anchorRef: RefObject<HTMLElement | null>;
}) {
  const [pos, setPos] = useState<TipPos | null>(null);
  const [needsMarquee, setNeedsMarquee] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const a = anchorRef.current;
      const header = document.querySelector("header");
      if (!a || !header) return;
      const ar = a.getBoundingClientRect();
      const hr = header.getBoundingClientRect();
      const margin = 8;

      // Доступная ширина в верхней зоне справа от птенца
      const rightSpace = window.innerWidth - ar.right - margin;
      const leftSpace = ar.left - margin;
      let left: number;
      let width: number;
      if (rightSpace >= 80) {
        left = ar.right + margin;
        width = Math.min(rightSpace, Math.round(window.innerWidth * 0.7));
      } else {
        width = Math.min(leftSpace, Math.round(window.innerWidth * 0.7));
        left = ar.left - margin - width;
      }
      if (left < margin) left = margin;
      if (width < 60) width = 60;

      // Top — по центру головы птенца, в пределах header
      let top = ar.top + 6;
      const minTop = hr.top + 2;
      const maxTop = hr.bottom - 18;
      if (maxTop >= minTop) top = Math.max(minTop, Math.min(maxTop, top));

      setPos({ top, left, width });
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
  }, [anchorRef]);

  // Определяем нужен ли marquee
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const t = textRef.current;
    if (!wrap || !t) return;
    setNeedsMarquee(t.scrollWidth > wrap.clientWidth + 1);
  }, [text, pos?.width]);

  if (typeof document === "undefined") return null;

  const containerW = pos?.width ?? 0;
  const textW = textRef.current?.scrollWidth ?? containerW;
  const duration = Math.max(8, (containerW + textW) / 60);

  return createPortal(
    <motion.div
      ref={wrapRef}
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed z-[60] overflow-hidden text-[12px] font-medium leading-4 text-foreground"
      style={{
        top: pos?.top ?? -9999,
        left: pos?.left ?? -9999,
        width: pos?.width ?? 0,
        textShadow: "0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.7)",
      }}
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.18, ease: "easeOut" }}
    >
      {needsMarquee && !reduced ? (
        <motion.span
          ref={textRef}
          className="inline-block whitespace-nowrap"
          initial={{ x: containerW }}
          animate={{ x: -textW }}
          transition={{ duration, ease: "linear", repeat: Infinity, repeatType: "loop" }}
        >
          {text}
        </motion.span>
      ) : (
        <span ref={textRef} className="inline-block whitespace-nowrap">
          {text}
        </span>
      )}
    </motion.div>,
    document.body,
  );
}

// ---------- Layout measurements from title letters ----------
type Layout = {
  trackW: number;
  trackH: number;
  textTop: number;
  eggStartX: number;
  eggEndX: number;
  walkMin: number;
  walkMax: number;
  menuLeft: number;
  menuRight: number;
  ready: boolean;
};

const EMPTY_LAYOUT: Layout = {
  trackW: 0,
  trackH: 0,
  textTop: 0,
  eggStartX: 0,
  eggEndX: 0,
  walkMin: 0,
  walkMax: 0,
  menuLeft: 0,
  menuRight: 0,
  ready: false,
};

const CHICK_W = 38;
const EGG_W = 44;
const FALLBACK_TIMEOUT_MS = 1500;

// ---------- Main Mascot ----------
export function Mascot() {
  const { stage, eggProgress, tip, showTip, hideTip, reducedMotion } = useMascot();
  const rootRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLButtonElement | null>(null);
  const [layout, setLayout] = useState<Layout>(EMPTY_LAYOUT);
  const [unsafe, setUnsafe] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const track = root.parentElement;
    if (!track) return;

    let raf = 0;
    let warned = false;
    let cancelled = false;

    const measure = () => {
      raf = 0;
      if (cancelled) return;
      const tr = track.getBoundingClientRect();
      const eggStart = track.querySelector<HTMLElement>("[data-mascot-egg-start]");
      const hatchStart = track.querySelector<HTMLElement>("[data-mascot-hatch-zone-start]");
      const walkStart = track.querySelector<HTMLElement>("[data-mascot-walk-start]");
      const walkEnd = track.querySelector<HTMLElement>("[data-mascot-walk-end]");
      if (!eggStart || !hatchStart || !walkStart || !walkEnd) return;

      const er = eggStart.getBoundingClientRect();
      const hr = hatchStart.getBoundingClientRect();
      const wsr = walkStart.getBoundingClientRect();
      const wer = walkEnd.getBoundingClientRect();

      const eggStartX = er.left + er.width / 2 - tr.left;
      const eggEndX = hr.left + hr.width / 2 - tr.left;
      // Зона хода — вся ширина трека, с небольшими отступами
      const walkMin = Math.max(0, wsr.left - tr.left - 4);
      const walkMax = Math.min(tr.width - CHICK_W, wer.right - tr.left + 4 - CHICK_W + 8);

      // Зона бургера — для обхода
      const menuBtn = track.querySelector<HTMLElement>("[data-mascot-menu-button]");
      let menuLeft = 0;
      let menuRight = 0;
      if (menuBtn) {
        const mb = menuBtn.getBoundingClientRect();
        menuLeft = mb.left - tr.left - 4;
        menuRight = mb.right - tr.left + 4;
      }

      if (
        !(tr.width > 0) ||
        !(eggEndX > eggStartX) ||
        !(walkMax > walkMin)
      ) {
        return;
      }

      setLayout({
        trackW: tr.width,
        trackH: tr.height,
        textTop: er.top - tr.top,
        eggStartX,
        eggEndX,
        walkMin,
        walkMax,
        menuLeft,
        menuRight,
        ready: true,
      });
      setUnsafe(false);
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    };

    schedule();

    const fallbackId = window.setTimeout(() => {
      const ok =
        track.querySelector("[data-mascot-egg-start]") &&
        track.querySelector("[data-mascot-hatch-zone-start]") &&
        track.querySelector("[data-mascot-walk-start]") &&
        track.querySelector("[data-mascot-walk-end]");
      if (!ok) {
        setUnsafe(true);
        if (!warned) {
          warned = true;
          // eslint-disable-next-line no-console
          console.warn("[Mascot] data-mascot-* anchors not found — mascot disabled.");
        }
      }
    }, FALLBACK_TIMEOUT_MS);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(schedule);
      ro.observe(track);
      const header = document.querySelector("header");
      if (header) ro.observe(header);
    }
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);
    window.addEventListener("load", schedule);
    const fonts = (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts;
    if (fonts?.ready) fonts.ready.then(schedule).catch(() => {});

    // Доп. отложенный пересчёт после монтирования бургера
    const t1 = window.setTimeout(schedule, 60);
    const t2 = window.setTimeout(schedule, 300);

    return () => {
      cancelled = true;
      clearTimeout(fallbackId);
      clearTimeout(t1);
      clearTimeout(t2);
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
      window.removeEventListener("load", schedule);
    };
  }, []);

  // Walking state
  const [pos, setPos] = useState(0);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [walkPhase, setWalkPhase] = useState(0);
  const [moving, setMoving] = useState(false);
  const [target, setTarget] = useState(0);
  const [blink, setBlink] = useState(false);
  const [beakOpen, setBeakOpen] = useState(false);
  const [wingAngle, setWingAngle] = useState(0);
  const wingTargetRef = useRef(0);
  const wasMovingRef = useRef(false);
  const wingTimerRef = useRef<number | null>(null);
  const initializedRef = useRef(false);

  // Авто-пружинка крыла
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

  // После hatched — поставить птенца у конца зоны «пол»
  useEffect(() => {
    if (stage === "hatched" && layout.ready && !initializedRef.current) {
      const x = Math.max(layout.walkMin, Math.min(layout.walkMax, layout.eggEndX - CHICK_W / 2));
      setPos(x);
      setTarget(x);
      initializedRef.current = true;
    }
  }, [stage, layout.ready, layout.eggEndX, layout.walkMin, layout.walkMax]);

  // Wander target picker (с обходом зоны бургера)
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion || !layout.ready) return;
    const pick = () => {
      const minX = layout.walkMin;
      const maxX = Math.max(minX + 24, layout.walkMax);
      let t = Math.round(minX + Math.random() * (maxX - minX));
      // Обход зоны бургера
      const mL = layout.menuLeft - CHICK_W;
      const mR = layout.menuRight;
      if (mR > mL && t > mL && t < mR) {
        t = Math.random() < 0.5 ? Math.max(minX, mL - 4) : Math.min(maxX, mR + 4);
      }
      setTarget(t);
    };
    pick();
    const id = window.setInterval(pick, 4500 + Math.random() * 3500);
    return () => clearInterval(id);
  }, [stage, reducedMotion, layout.ready, layout.walkMin, layout.walkMax, layout.menuLeft, layout.menuRight]);

  // Walk loop (без прыжков, с обходом бургера)
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion || !layout.ready) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(50, now - last) / 1000;
      last = now;

      setPos((p) => {
        let t = target;
        // Если таргет внутри зоны бургера — отодвинуть
        const mL = layout.menuLeft - CHICK_W;
        const mR = layout.menuRight;
        if (mR > mL && t > mL && t < mR) {
          t = p < mL ? mL - 4 : mR + 4;
        }
        const diff = t - p;
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
        return Math.max(layout.walkMin, Math.min(layout.walkMax, next));
      });

      if (moving) setWalkPhase((w) => w + dt * 9);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage, target, moving, reducedMotion, layout.ready, layout.walkMin, layout.walkMax, layout.menuLeft, layout.menuRight]);

  // Stop → maybe show tip + raise wing
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

  // Egg position derived from progress (clamped)
  const eggXraw = layout.ready ? layout.eggStartX + eggProgress * (layout.eggEndX - layout.eggStartX) : 0;
  const eggX = Math.max(EGG_W / 2, Math.min(layout.trackW - EGG_W / 2, eggXraw));
  const rolling = layout.ready ? (eggX - layout.eggStartX) * 1.4 : 0;

  // Птенец — в верхней свободной зоне трека
  const chickTop = 0;

  if (unsafe) return null;

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-10">
      {stage !== "hatched" && !reducedMotion && layout.ready && (
        <div
          className="absolute"
          style={{
            left: eggX - EGG_W / 2,
            top: layout.textTop - 44,
            width: EGG_W,
          }}
          aria-hidden="true"
        >
          <Egg stage={stage} rolling={rolling} />
        </div>
      )}

      {stage === "hatched" && layout.ready && (
        <motion.button
          ref={(el) => {
            headRef.current = el;
          }}
          onClick={onChickClick}
          className="absolute cursor-pointer bg-transparent"
          style={{
            left: reducedMotion
              ? Math.max(layout.walkMin, Math.min(layout.walkMax, layout.eggEndX - CHICK_W / 2))
              : pos,
            top: chickTop,
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
        {tip && stage === "hatched" && layout.ready && (
          <MascotTip text={tip.text} reduced={reducedMotion} anchorRef={headRef} />
        )}
      </AnimatePresence>
    </div>
  );
}
