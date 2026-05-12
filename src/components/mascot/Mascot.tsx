import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMascot, type Stage } from "./MascotProvider";
import { whatsappUrl } from "@/lib/contacts";

// ---------- Egg SVG ----------
function Egg({ stage, rolling }: { stage: Stage; rolling: number }) {
  const showCrack1 = stage === "crack-1" || stage === "crack-2" || stage === "peek";
  const showCrack2 = stage === "crack-2" || stage === "peek";
  const showPeek = stage === "peek";

  return (
    <svg
      viewBox="0 0 60 70"
      width="34"
      height="40"
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
  wingRaised,
}: {
  facing: 1 | -1;
  walkPhase: number;
  blink: boolean;
  beakOpen: boolean;
  wingRaised: boolean;
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
        <motion.path
          d="M22 38 Q18 44 24 48 Q30 46 28 40 Z"
          fill="oklch(0.8 0.13 78)"
          stroke="oklch(0.55 0.1 70)"
          strokeWidth="0.5"
          style={{ originX: "26px", originY: "44px" }}
          animate={{ rotate: wingRaised ? -55 : 0, y: wingRaised ? -2 : 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 180 }}
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

// ---------- Speech bubble — anchored inside header ----------
type BubblePos = { top: number; left: number; arrowSide: "left" | "right"; arrowTop: number };

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
  anchorRef: RefObject<HTMLElement | null>;
}) {
  const [shown, setShown] = useState(reduced ? text : "");
  const [pos, setPos] = useState<BubblePos | null>(null);
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

  useLayoutEffect(() => {
    let raf = 0;
    const compute = () => {
      const a = anchorRef.current;
      const b = bubbleRef.current;
      const header = document.querySelector("header");
      if (!a || !header) return;
      const ar = a.getBoundingClientRect();
      const hr = header.getBoundingClientRect();
      const bw = b?.offsetWidth ?? 200;
      const bh = b?.offsetHeight ?? 48;
      const margin = 8;

      // Try right side of chick
      let arrowSide: "left" | "right" = "left";
      let left = ar.right + margin;
      if (left + bw > window.innerWidth - margin) {
        // flip to left
        left = ar.left - bw - margin;
        arrowSide = "right";
      }
      left = Math.max(margin, Math.min(window.innerWidth - bw - margin, left));

      // Vertical: center on chick, then clamp inside header
      let top = ar.top + ar.height / 2 - bh / 2;
      const minTop = hr.top + 4;
      const maxTop = hr.bottom - bh - 4;
      if (maxTop < minTop) {
        // header слишком низкое — позволим выйти чуть ниже шапки
        top = hr.bottom + 4;
      } else {
        top = Math.max(minTop, Math.min(maxTop, top));
      }
      const arrowTop = Math.max(8, Math.min(bh - 12, ar.top + ar.height / 2 - top - 4));
      setPos({ top, left, arrowSide, arrowTop });
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
        initial: { opacity: 0, scale: 0.85 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.85 },
        transition: { type: "spring" as const, damping: 16, stiffness: 240 },
      };

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      ref={bubbleRef}
      role="status"
      aria-live="polite"
      className="fixed z-[60] rounded-2xl border border-border bg-card px-2.5 py-1.5 text-[11px] leading-snug text-foreground shadow-md"
      style={{
        top: pos?.top ?? -9999,
        left: pos?.left ?? -9999,
        width: "min(200px, calc(100vw - 24px))",
      }}
      {...motionProps}
    >
      {/* Стрелка к птенцу */}
      <span
        className="absolute h-2.5 w-2.5 rotate-45 border-border bg-card"
        style={{
          top: pos?.arrowTop ?? 12,
          left: pos?.arrowSide === "left" ? -5 : undefined,
          right: pos?.arrowSide === "right" ? -5 : undefined,
          borderLeftWidth: pos?.arrowSide === "left" ? 1 : 0,
          borderBottomWidth: pos?.arrowSide === "left" ? 1 : 0,
          borderTopWidth: pos?.arrowSide === "right" ? 1 : 0,
          borderRightWidth: pos?.arrowSide === "right" ? 1 : 0,
        }}
        aria-hidden="true"
      />
      <div className="relative">
        <p
          className="pr-3"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {shown}
        </p>
        <button
          onClick={onClose}
          className="absolute -right-1 -top-1 leading-none text-muted-foreground hover:text-foreground"
          aria-label="Закрыть"
        >
          ×
        </button>
        {cta && shown.length === text.length && (
          <a
            href={whatsappUrl(cta.whatsapp)}
            target="_blank"
            rel="noopener"
            className="mt-1 inline-flex items-center gap-1 rounded-full bg-whatsapp px-2 py-0.5 text-[10px] font-medium text-whatsapp-foreground hover:bg-whatsapp/90"
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

// ---------- Layout measurements from title letters ----------
type Layout = {
  trackW: number;
  textTop: number; // y где «лежат» буквы (относительно трека)
  eggStartX: number;
  eggEndX: number; // центр буквы «п» в «пол»
  walkMin: number;
  walkMax: number;
  jumpLeft: number;
  jumpRight: number;
  ready: boolean;
};

const EMPTY_LAYOUT: Layout = {
  trackW: 0,
  textTop: 0,
  eggStartX: 0,
  eggEndX: 0,
  walkMin: 0,
  walkMax: 0,
  jumpLeft: 0,
  jumpRight: 0,
  ready: false,
};

const CHICK_W = 38;
const EGG_W = 34;

// ---------- Main Mascot ----------
export function Mascot() {
  const { stage, eggProgress, tip, showTip, hideTip, reducedMotion } = useMascot();
  const rootRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLButtonElement | null>(null);
  const [layout, setLayout] = useState<Layout>(EMPTY_LAYOUT);

  // Measure letter anchors every frame (cheap on small DOM, keeps in sync with title load + resize)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const track = root.parentElement; // [data-mascot-track]
    if (!track) return;
    let raf = 0;
    const measure = () => {
      const tr = track.getBoundingClientRect();
      const eggStart = track.querySelector<HTMLElement>("[data-mascot-egg-start]");
      const hatchStart = track.querySelector<HTMLElement>("[data-mascot-hatch-zone-start]");
      const walkStart = track.querySelector<HTMLElement>("[data-mascot-walk-start]");
      const walkEnd = track.querySelector<HTMLElement>("[data-mascot-walk-end]");
      const jump = track.querySelector<HTMLElement>("[data-mascot-jump]");
      if (eggStart && hatchStart && walkStart && walkEnd && jump) {
        const er = eggStart.getBoundingClientRect();
        const hr = hatchStart.getBoundingClientRect();
        const wsr = walkStart.getBoundingClientRect();
        const wer = walkEnd.getBoundingClientRect();
        const jr = jump.getBoundingClientRect();
        setLayout({
          trackW: tr.width,
          textTop: er.top - tr.top,
          eggStartX: er.left + er.width / 2 - tr.left,
          eggEndX: hr.left + hr.width / 2 - tr.left,
          walkMin: wsr.left - tr.left,
          walkMax: wer.right - tr.left - CHICK_W,
          jumpLeft: jr.left - tr.left - 2,
          jumpRight: jr.right - tr.left + 2,
          ready: true,
        });
      }
      raf = requestAnimationFrame(measure);
    };
    raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Walking state
  const [pos, setPos] = useState(0);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [walkPhase, setWalkPhase] = useState(0);
  const [moving, setMoving] = useState(false);
  const [target, setTarget] = useState(0);
  const [blink, setBlink] = useState(false);
  const [beakOpen, setBeakOpen] = useState(false);
  const [wingRaised, setWingRaised] = useState(false);
  const [jumpY, setJumpY] = useState(0);
  const jumpStateRef = useRef<{ active: boolean; t0: number; fromX: number; toX: number } | null>(null);
  const wasMovingRef = useRef(false);
  const wingTimerRef = useRef<number | null>(null);
  const initializedRef = useRef(false);

  // После hatched — поставить птенца у конца зоны «пол»
  useEffect(() => {
    if (stage === "hatched" && layout.ready && !initializedRef.current) {
      setPos(layout.eggEndX - CHICK_W / 2);
      setTarget(layout.eggEndX - CHICK_W / 2);
      initializedRef.current = true;
    }
  }, [stage, layout.ready, layout.eggEndX]);

  // Wander target picker
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion || !layout.ready) return;
    const pick = () => {
      const minX = layout.walkMin;
      const maxX = Math.max(minX + 24, layout.walkMax);
      setTarget(Math.round(minX + Math.random() * (maxX - minX)));
    };
    pick();
    const id = window.setInterval(pick, 4500 + Math.random() * 3500);
    return () => clearInterval(id);
  }, [stage, reducedMotion, layout.ready, layout.walkMin, layout.walkMax]);

  // Walk loop with jump-over-«П»
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion || !layout.ready) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(50, now - last) / 1000;
      last = now;

      setPos((p) => {
        // Jumping mode
        const j = jumpStateRef.current;
        if (j && j.active) {
          const dur = 480;
          const t = Math.min(1, (now - j.t0) / dur);
          const x = j.fromX + (j.toX - j.fromX) * t;
          setJumpY(-Math.sin(t * Math.PI) * 22);
          if (t >= 1) {
            jumpStateRef.current = null;
            setJumpY(0);
          }
          setFacing(j.toX >= j.fromX ? 1 : -1);
          return x;
        }

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

        // Detect crossing the jump zone of capital «П»
        const jl = layout.jumpLeft - CHICK_W / 2;
        const jr = layout.jumpRight - CHICK_W / 2;
        if (dir > 0 && p < jl && next >= jl) {
          jumpStateRef.current = { active: true, t0: now, fromX: p, toX: jr + 4 };
          return p;
        }
        if (dir < 0 && p > jr && next <= jr) {
          jumpStateRef.current = { active: true, t0: now, fromX: p, toX: jl - 4 };
          return p;
        }
        return next;
      });

      if (moving && !jumpStateRef.current?.active) setWalkPhase((w) => w + dt * 9);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage, target, moving, reducedMotion, layout.ready, layout.jumpLeft, layout.jumpRight]);

  // Stop → maybe show tip + raise wing
  useEffect(() => {
    if (stage !== "hatched" || reducedMotion) return;
    if (wasMovingRef.current && !moving) {
      if (Math.random() < 0.65) {
        setWingRaised(true);
        showTip();
        if (wingTimerRef.current) clearTimeout(wingTimerRef.current);
        wingTimerRef.current = window.setTimeout(() => setWingRaised(false), 6500);
      }
    }
    wasMovingRef.current = moving;
  }, [moving, stage, reducedMotion, showTip]);

  useEffect(() => {
    if (!tip && wingRaised) {
      setWingRaised(false);
      if (wingTimerRef.current) {
        clearTimeout(wingTimerRef.current);
        wingTimerRef.current = null;
      }
    }
  }, [tip, wingRaised]);

  // Blink
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
    setBeakOpen(true);
    window.setTimeout(() => setBeakOpen(false), 300);
    setWingRaised(true);
    if (wingTimerRef.current) clearTimeout(wingTimerRef.current);
    wingTimerRef.current = window.setTimeout(() => setWingRaised(false), 6500);
    showTip();
  };

  // Egg position derived from progress
  const eggX = layout.ready ? layout.eggStartX + eggProgress * (layout.eggEndX - layout.eggStartX) : 0;
  const rolling = layout.ready ? (eggX - layout.eggStartX) * 1.4 : 0;

  // Y where the figure "stands" — на верхней линии букв
  const baseTop = layout.textTop;

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-10">
      {stage !== "hatched" && layout.ready && (
        <div
          className="absolute"
          style={{
            left: eggX - EGG_W / 2,
            top: baseTop - 36,
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
            left: reducedMotion ? layout.eggEndX - CHICK_W / 2 : pos,
            top: baseTop - 34 + jumpY,
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
            wingRaised={wingRaised}
          />
        </motion.button>
      )}

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
    </div>
  );
}
