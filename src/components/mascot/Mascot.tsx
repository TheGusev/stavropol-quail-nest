import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMascot, type Stage } from "./MascotProvider";
import { whatsappUrl } from "@/lib/contacts";

// ---------- Egg SVG with progressive cracks ----------
function Egg({ stage, wobble }: { stage: Stage; wobble: number }) {
  // crack progress mapping
  const showCrack1 = stage === "crack-1" || stage === "crack-2" || stage === "peek";
  const showCrack2 = stage === "crack-2" || stage === "peek";
  const showPeek = stage === "peek";

  // Tilt animation based on stage intensity
  const intensity =
    stage === "wobble" ? 1 : stage === "crack-1" ? 1.6 : stage === "crack-2" ? 2.4 : stage === "peek" ? 1.2 : 0;
  const rot = intensity > 0 ? Math.sin(wobble * 0.012) * 4 * intensity : 0;

  return (
    <motion.svg
      viewBox="0 0 60 70"
      width="40"
      height="46"
      style={{ rotate: rot, transformOrigin: "50% 90%" }}
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
      {/* Ground shadow */}
      <ellipse cx="30" cy="66" rx="16" ry="2.5" fill="rgba(0,0,0,0.18)" />
      {/* Egg body */}
      <path
        d="M30 4 C46 4 54 26 54 44 C54 58 44 66 30 66 C16 66 6 58 6 44 C6 26 14 4 30 4 Z"
        fill="url(#eggBody)"
        stroke="oklch(0.5 0.12 145)"
        strokeWidth="1"
      />
      {/* Quail speckles */}
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
      {/* Highlight */}
      <ellipse cx="22" cy="20" rx="7" ry="10" fill="url(#eggHL)" />
      {/* Cracks */}
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
      {/* Peek: top opens, beak appears */}
      {showPeek && (
        <>
          {/* shifted top half */}
          <path
            d="M14 22 Q30 -2 46 22 L46 26 Q30 14 14 26 Z"
            fill="url(#eggBody)"
            stroke="oklch(0.5 0.12 145)"
            strokeWidth="0.8"
            transform="translate(-2 -4) rotate(-8 30 18)"
          />
          {/* tiny beak */}
          <polygon points="28,20 32,20 30,24" fill="oklch(0.7 0.16 60)" />
          {/* tiny eye */}
          <circle cx="33" cy="18" r="1.2" fill="#1a1a1a" />
        </>
      )}
    </motion.svg>
  );
}

// ---------- Chick SVG ----------
function Chick({
  facing,
  walkPhase,
  blink,
  headRot,
  beakOpen,
  wingRaised,
}: {
  facing: 1 | -1;
  walkPhase: number;
  blink: boolean;
  headRot: number;
  beakOpen: boolean;
  wingRaised: boolean;
}) {
  // Walk: leg rotation alternates, body bob
  const bob = Math.abs(Math.sin(walkPhase)) * -2;
  const leftLeg = Math.sin(walkPhase) * 25;
  const rightLeg = -Math.sin(walkPhase) * 25;
  const shadowScale = 1 - Math.abs(Math.sin(walkPhase)) * 0.18;

  return (
    <svg
      viewBox="0 0 60 60"
      width="42"
      height="42"
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
      {/* Shadow */}
      <ellipse cx="30" cy="56" rx={14 * shadowScale} ry="2.2" fill="rgba(0,0,0,0.22)" />
      {/* Legs */}
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
      {/* Body */}
      <g transform={`translate(0 ${bob})`}>
        <ellipse cx="30" cy="40" rx="14" ry="12" fill="url(#chickBody)" stroke="oklch(0.6 0.12 70)" strokeWidth="0.6" />
        {/* Wing — поднимается, когда птенец «показывает подсказку» */}
        <motion.path
          d="M22 38 Q18 44 24 48 Q30 46 28 40 Z"
          fill="oklch(0.8 0.13 78)"
          stroke="oklch(0.55 0.1 70)"
          strokeWidth="0.5"
          style={{ originX: "26px", originY: "44px" }}
          animate={{ rotate: wingRaised ? -55 : 0, y: wingRaised ? -2 : 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 180 }}
        />
        {/* Tail tuft */}
        <path d="M42 36 Q47 36 46 40 Q44 39 42 40 Z" fill="oklch(0.78 0.13 75)" />

        {/* Head */}
        <g transform={`translate(30 26) rotate(${headRot})`}>
          <circle cx="0" cy="0" r="11" fill="url(#chickHead)" stroke="oklch(0.6 0.12 70)" strokeWidth="0.6" />
          {/* Eye */}
          {blink ? (
            <path d="M2 -1 Q5 0 8 -1" stroke="#1a1a1a" strokeWidth="1" fill="none" strokeLinecap="round" />
          ) : (
            <>
              <circle cx="5" cy="-1" r="2.2" fill="#1a1a1a" />
              <circle cx="5.8" cy="-1.8" r="0.8" fill="#fff" />
            </>
          )}
          {/* Beak */}
          {beakOpen ? (
            <polygon points="10,2 14,1 14,5 10,5" fill="oklch(0.7 0.16 55)" />
          ) : (
            <polygon points="10,1 14,3 10,5" fill="oklch(0.7 0.16 55)" />
          )}
          {/* Cheek */}
          <circle cx="3" cy="3" r="1.4" fill="oklch(0.78 0.12 30)" opacity="0.5" />
          {/* Top tuft */}
          <path d="M-2 -10 Q0 -14 2 -10 Q1 -11 0 -10 Z" fill="oklch(0.7 0.13 70)" />
        </g>
      </g>
    </svg>
  );
}

// ---------- Shell halves (after hatch) ----------
function ShellPieces() {
  return (
    <>
      <motion.svg
        viewBox="0 0 30 20"
        width="22"
        height="14"
        className="absolute pointer-events-none"
        style={{ left: -28, bottom: -2 }}
        initial={{ x: 0, y: -30, rotate: 0, opacity: 0 }}
        animate={{ x: -8, y: 0, rotate: -25, opacity: 1 }}
        transition={{ type: "spring", damping: 8, stiffness: 90, delay: 0.05 }}
        aria-hidden="true"
      >
        <path
          d="M2 16 Q4 2 16 2 Q26 4 28 12 Q22 14 14 12 Q8 12 2 16 Z"
          fill="oklch(0.88 0.05 78)"
          stroke="oklch(0.5 0.12 145)"
          strokeWidth="0.8"
        />
      </motion.svg>
      <motion.svg
        viewBox="0 0 30 20"
        width="22"
        height="14"
        className="absolute pointer-events-none"
        style={{ right: -28, bottom: -2 }}
        initial={{ x: 0, y: -30, rotate: 0, opacity: 0 }}
        animate={{ x: 8, y: 0, rotate: 30, opacity: 1 }}
        transition={{ type: "spring", damping: 8, stiffness: 90 }}
        aria-hidden="true"
      >
        <path
          d="M28 16 Q26 2 14 2 Q4 4 2 12 Q8 14 16 12 Q22 12 28 16 Z"
          fill="oklch(0.88 0.05 78)"
          stroke="oklch(0.5 0.12 145)"
          strokeWidth="0.8"
        />
      </motion.svg>
    </>
  );
}

// ---------- Speech bubble (portal, fixed, never clipped) ----------
function SpeechBubble({
  text,
  cta,
  onClose,
  reduced,
  anchorRef,
}: {
  text: string;
  cta?: { label: string; whatsapp: string };
  onClose: () => void;
  reduced: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
}) {
  const [shown, setShown] = useState(reduced ? text : "");
  const [pos, setPos] = useState<{ top: number; left: number; arrowLeft: number } | null>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) {
      setShown(text);
      return;
    }
    setShown("");
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [text, reduced]);

  // Позиция: фиксированная, относительно анкора, с клампом по вьюпорту
  useLayoutEffect(() => {
    if (!anchorRef) return;
    let raf = 0;
    const compute = () => {
      const a = anchorRef?.current;
      const b = bubbleRef.current;
      if (!a) return;
      const rect = a.getBoundingClientRect();
      const bw = b?.offsetWidth ?? 240;
      const margin = 8;
      const cx = rect.left + rect.width / 2;
      const left = Math.max(margin, Math.min(window.innerWidth - bw - margin, cx - bw / 2));
      const top = rect.bottom + 10;
      const arrowLeft = Math.max(12, Math.min(bw - 12, cx - left));
      setPos({ top, left, arrowLeft });
    };
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

  const motionProps = reduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, scale: 0.85, y: -4 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.85, y: -4 },
        transition: { type: "spring" as const, damping: 16, stiffness: 240 },
      };

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      ref={bubbleRef}
      role="status"
      aria-live="polite"
      className="fixed z-[60] rounded-2xl border border-border bg-card px-3 py-2 text-xs leading-snug text-foreground shadow-lg"
      style={{
        top: pos?.top ?? -9999,
        left: pos?.left ?? -9999,
        width: "min(240px, calc(100vw - 16px))",
        transformOrigin: `${pos?.arrowLeft ?? 120}px -8px`,
      }}
      {...motionProps}
    >
      {/* Хвостик-стрелка вверх к птенцу */}
      <span
        className="absolute -top-1.5 h-3 w-3 rotate-45 border-l border-t border-border bg-card"
        style={{ left: (pos?.arrowLeft ?? 120) - 6 }}
        aria-hidden="true"
      />
      <div className="relative">
        <p className="pr-4">{shown}</p>
        <button
          onClick={onClose}
          className="absolute -right-1 -top-1 text-muted-foreground hover:text-foreground"
          aria-label="Закрыть"
        >
          ×
        </button>
        {cta && shown.length === text.length && (
          <a
            href={whatsappUrl(cta.whatsapp)}
            target="_blank"
            rel="noopener"
            className="mt-2 inline-flex items-center gap-1 rounded-full bg-whatsapp px-2.5 py-1 text-[11px] font-medium text-whatsapp-foreground hover:bg-whatsapp/90"
            onClick={onClose}
          >
            {cta.label} →
          </a>
        )}
      </div>
    </motion.div>,
    document.body,
  );
}

// ---------- Main Mascot ----------
export function Mascot() {
  const { stage, tip, showTip, hideTip, reducedMotion } = useMascot();
  const slotRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLButtonElement | null>(null);

  // Wobble timer (drives egg shake)
  const [wobble, setWobble] = useState(0);

  // Track (header-wide walking area)
  const [trackEl, setTrackEl] = useState<HTMLElement | null>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  // Walking state — pos is absolute px from track-left
  const CHICK_W = 42;
  const RIGHT_PAD = 56; // не подходить вплотную к бургеру/кнопкам
  const [pos, setPos] = useState(8);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [walkPhase, setWalkPhase] = useState(0);
  const [moving, setMoving] = useState(false);
  const [target, setTarget] = useState(8);
  const [blink, setBlink] = useState(false);
  const [headRot, setHeadRot] = useState(0);
  const [beakOpen, setBeakOpen] = useState(false);
  const [wingRaised, setWingRaised] = useState(false);
  const wasMovingRef = useRef(false);
  const wingTimerRef = useRef<number | null>(null);

  // Cursor target tracking for head rotation
  const cursorRef = useRef<{ x: number; y: number } | null>(null);

  // Locate track once
  useEffect(() => {
    const find = () => document.querySelector<HTMLElement>("[data-mascot-track]");
    let el = find();
    if (!el) {
      const id = window.setTimeout(() => setTrackEl(find()), 50);
      return () => clearTimeout(id);
    }
    setTrackEl(el);
  }, []);

  // Measure track width
  useEffect(() => {
    if (!trackEl) return;
    const measure = () => setTrackWidth(trackEl.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackEl);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [trackEl]);

  // Egg wobble animation
  useEffect(() => {
    if (stage === "egg" || stage === "hatched") return;
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      setWobble(performance.now() - start);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage]);

  // При вылуплении — стартовая позиция у логотипа
  useEffect(() => {
    if (stage === "hatched") {
      // Если ещё не двигались — встаём слева, рядом со слотом
      setPos((p) => (p === 8 ? 8 : p));
    }
  }, [stage]);

  // Walk cycle
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion) return;
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
        const speed = 42; // px/sec
        const step = dir * Math.min(dist, speed * dt);
        return p + step;
      });

      if (moving) setWalkPhase((w) => w + dt * 9);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage, target, moving, reducedMotion]);

  // Detect "stop" → with chance show tip + raise wing
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion) return;
    if (wasMovingRef.current && !moving) {
      // только что остановился
      if (Math.random() < 0.65) {
        setWingRaised(true);
        showTip();
        if (wingTimerRef.current) clearTimeout(wingTimerRef.current);
        wingTimerRef.current = window.setTimeout(() => setWingRaised(false), 6500);
      }
    }
    wasMovingRef.current = moving;
  }, [moving, stage, reducedMotion, showTip]);

  // Когда подсказка скрыта — опускаем крыло
  useEffect(() => {
    if (!tip && wingRaised) {
      setWingRaised(false);
      if (wingTimerRef.current) {
        clearTimeout(wingTimerRef.current);
        wingTimerRef.current = null;
      }
    }
  }, [tip, wingRaised]);

  // Pick a new wander target periodically — по всей ширине трека
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion) return;
    const pickNext = () => {
      const minX = 8;
      const maxX = Math.max(minX + 32, trackWidth - CHICK_W - RIGHT_PAD);
      setTarget(Math.round(minX + Math.random() * (maxX - minX)));
    };
    pickNext();
    const id = window.setInterval(pickNext, 5000 + Math.random() * 4000);
    return () => clearInterval(id);
  }, [stage, reducedMotion, trackWidth]);

  // Blink loop
  useEffect(() => {
    if (stage !== "hatched") return;
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
  }, [stage]);

  // Chirp loop
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

  // Mouse / touch eye tracking
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const point = "touches" in e ? e.touches[0] : (e as MouseEvent);
      if (!point) return;
      cursorRef.current = { x: (point as Touch | MouseEvent).clientX, y: (point as Touch | MouseEvent).clientY };
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onMove);
    };
  }, [stage, reducedMotion]);

  // Head rotation toward cursor
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion) return;
    let raf = 0;
    const tick = () => {
      const head = headRef.current;
      const cur = cursorRef.current;
      if (head && cur) {
        const r = head.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cur.x - cx;
        const dy = cur.y - cy;
        const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
        const dist = Math.hypot(dx, dy);
        const max = 18;
        const tgt = dist < 400 ? Math.max(-max, Math.min(max, ang * 0.15 * facing)) : 0;
        setHeadRot((h) => h + (tgt - h) * 0.15);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage, facing, reducedMotion]);

  const onClick = () => {
    if (stage !== "hatched") return;
    setBeakOpen(true);
    window.setTimeout(() => setBeakOpen(false), 300);
    setWingRaised(true);
    if (wingTimerRef.current) clearTimeout(wingTimerRef.current);
    wingTimerRef.current = window.setTimeout(() => setWingRaised(false), 6500);
    showTip();
  };

  // Слот рядом с логотипом: только пока не вылупился
  const slot = (
    <div
      ref={slotRef}
      className="relative grid h-11 w-11 shrink-0 place-items-center"
      style={{ overflow: "visible" }}
    >
      {stage !== "hatched" && <Egg stage={stage} wobble={wobble} />}
    </div>
  );

  // Птенец в портале трека (или на месте при reducedMotion)
  const chickNode = stage === "hatched" && (
    <>
      {!reducedMotion && typeof window !== "undefined" && !sessionStorage.getItem("sp_mascot_shellseen") && (
        <ShellPiecesOnce />
      )}
      <motion.button
        ref={(el) => {
          headRef.current = el as HTMLButtonElement | null;
        }}
        onClick={onClick}
        className="absolute bottom-0 cursor-pointer bg-transparent"
        style={{
          left: reducedMotion ? 8 : pos,
          pointerEvents: "auto",
        }}
        initial={false}
        animate={{ x: 0 }}
        aria-label="Перепёлкин — нажмите, чтобы услышать совет"
      >
        <Chick
          facing={facing}
          walkPhase={reducedMotion ? 0 : walkPhase}
          blink={reducedMotion ? false : blink}
          headRot={reducedMotion ? 0 : headRot}
          beakOpen={reducedMotion ? false : beakOpen}
          wingRaised={wingRaised}
        />
      </motion.button>
    </>
  );

  return (
    <>
      {slot}
      {trackEl && chickNode && createPortal(chickNode, trackEl)}
      <AnimatePresence>
        {tip && stage === "hatched" && (
          <SpeechBubble
            text={tip.text}
            cta={tip.cta}
            onClose={hideTip}
            reduced={reducedMotion}
            anchorRef={headRef}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Helper: shell renders once, then sets session flag
function ShellPiecesOnce() {
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        sessionStorage.setItem("sp_mascot_shellseen", "1");
      } catch {
        // noop
      }
    }, 3000);
    return () => clearTimeout(id);
  }, []);
  return <ShellPieces />;
}
